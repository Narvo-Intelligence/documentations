# Narvo Backend Engineering Rubric

This document turns the current backend architecture and security guidance into concrete engineering rules for this repository.

It is intentionally narrow. It does not try to restate the full product vision. It defines the rules that should govern backend route design, ownership boundaries, and provider failure handling in Narvo.

---

## 1. Core Operating Model

Narvo should be treated as an editorial pipeline, not a loose collection of convenience endpoints.

That means:

- The system exists to produce canonical story artifacts, trust metadata, and a reliable briefing.
- User-facing routes should usually return persisted or cheaply-derived artifacts, not trigger unbounded synthesis work.
- Personalization is an overlay on top of the core editorial output, not a separate product plane.
- Backend security is enforced primarily in application code because privileged backend clients can bypass row-level protections if handlers trust the wrong inputs.
- Cost control is part of security. Repeated LLM and TTS retries are both an abuse problem and an availability problem.

---

## 2. Route Acceptance Rules

Use these rules before adding or expanding a backend route.

### 2.1 A route must serve the editorial loop

A new route should only exist if it clearly supports one of these jobs:

- ingest or normalize source material
- produce or fetch canonical narrative artifacts
- expose trust, translation, or audio artifacts for a story
- serve the morning briefing flow
- support user actions in the open, listen, trust, save, or share loop

If a route only exists for debugging, ad hoc regeneration, or data convenience, it should usually be an internal script, admin tool, or cron task instead.

### 2.2 Read routes should prefer persisted value

Default rule:

- `GET` routes should fetch the latest persisted artifact
- `POST` routes may trigger synthesis or mutation

Heavy generation should not hide behind read semantics unless there is a strong compatibility reason. Even then, the read route should be treated as legacy and the canonical mutation path should be explicit.

Current example:

- [backend/routes/briefing.py](../../backend/routes/briefing.py) keeps `POST /api/briefing/generate` as the canonical generation path.

### 2.3 Expensive routes must be bounded

If a route can trigger LLM, translation, TTS, search fan-out, or notification work, it must have all of the following:

- rate limiting
- bounded input size
- bounded retry behavior
- structured logging
- a clean degraded response when providers fail

Current examples:

- [backend/lib/ratelimit.py](../../backend/lib/ratelimit.py) covers the full `/api/briefing/` surface and other expensive paths.
- [backend/server.py](../../backend/server.py) applies request IDs, structured error envelopes, and rate limiting at middleware level.

### 2.4 Internal automation must have server-to-server verification

Cron or scheduler routes must not rely on obscurity. They should require explicit machine verification.

Current example:

- [backend/routes/briefing.py](../../backend/routes/briefing.py) uses `verify_gcp_scheduler` for `POST /api/briefing/cron`.

---

## 3. Data Ownership Rules

These rules are the most important ones in this repository because the backend uses privileged data access.

### 3.1 Identity must be derived, never caller-supplied

The backend must derive user identity from the verified bearer token and middleware state, not from JSON bodies or query parameters.

Allowed:

- `request.state.user_id`
- `Depends(get_current_user)`

Not allowed:

- `user_id` in public request bodies for user-scoped writes
- `user_id` query parameters that change which user’s data is read or written

Current examples:

- [backend/lib/auth.py](../../backend/lib/auth.py) derives identity from the Supabase JWT.
- [backend/routes/briefing.py](../../backend/routes/briefing.py) resolves briefing personalization from `request.state.user_id`.

### 3.2 Global scope and user scope must be explicit

Narvo has two legitimate data scopes:

- global or default artifacts
- authenticated user-scoped artifacts

Handlers should treat this as a first-class distinction. Anonymous requests may receive the global/default briefing. Authenticated requests may receive a user-scoped variant. The caller must not be allowed to impersonate a different scope.

Implementation rule:

- choose the scope in backend code
- do not let the client select another user’s scope

### 3.3 Service-role writes require an ownership gate

When a handler writes to a user-owned row through a privileged backend client, it must verify ownership before the write happens.

Safe patterns:

- filter by both `id` and derived `user_id`
- fetch the row, verify ownership, then mutate

Unsafe pattern:

- update a row by primary key alone when the row is user-owned

Current example:

- [backend/routes/briefing.py](../../backend/routes/briefing.py) only persists briefing audio when the authenticated caller owns the `briefings` row.

### 3.4 Authenticated writes should fail closed

For user-owned mutations:

- unauthenticated callers should get `401`
- mismatched owners should get `403` or skip persistence if the route is intentionally generation-capable without persistence

Narvo may still allow anonymous generation in some cases, but anonymous generation must not silently turn into persistent writes on user-owned data.

### 3.5 Normalize global-row representation

The codebase should converge on one representation for global artifacts in storage.

At the moment, some paths behave as if global scope is represented by `None`, while other health logic suggests empty-string handling may still exist. That should be normalized in service code so read and write behavior stays predictable.

Current reference:

- [backend/routes/health.py](../../backend/routes/health.py)

---

## 4. Provider Failure Rules

Narvo depends on external AI, translation, and voice providers. Failures are normal. Thrash is not.

### 4.1 Distinguish config failure from transient failure

Provider errors should be grouped into two classes:

- auth, permission, quota, and invalid-config failures
- transient transport, timeout, and capacity failures

Config failures should suppress repeated retries quickly. Transient failures may retry within a small bounded budget.

Current example:

- [backend/services/llm_gemini.py](../../backend/services/llm_gemini.py) uses a cooldown after repeated Gemini auth and permission errors.

### 4.2 Fallback chains must be short and intentional

For any single artifact generation request:

- use one primary provider
- allow a bounded fallback chain
- stop after the bounded chain fails

Do not let a single request fan out into repeated retries across every provider without a hard ceiling.

### 4.3 Normalize invalid legacy config before execution

If older stored values or legacy defaults are known to be invalid, normalize them before making provider calls.

Current example:

- [backend/services/tts_service.py](../../backend/services/tts_service.py) maps legacy `en-NG-Standard-B` style values to a supported Google voice.

### 4.4 Partial failure should preserve the editorial artifact

Narvo should prefer returning the best available editorial artifact rather than failing the entire flow when a non-core derivative fails.

Examples:

- story translation may fail while the base story remains usable
- briefing audio may fail while the briefing text still exists
- push delivery may fail without invalidating a generated briefing

### 4.5 Log enough to separate product failure from provider failure

Provider calls should emit logs that let reviewers answer:

- was this a config issue or a transient issue
- did fallback run
- did the request degrade cleanly
- did the handler keep retrying beyond the intended budget

---

## 5. Testable Invariants For This Repo

These are the rules that should be protected by tests and review comments.

- No public briefing route accepts caller-controlled `user_id` for personalization.
- User identity comes from [backend/lib/auth.py](../../backend/lib/auth.py) and middleware state.
- The whole `/api/briefing/` surface is rate limited.
- Anonymous briefing audio generation does not persist to arbitrary briefing rows.
- User-owned briefing persistence requires ownership verification.
- Known-invalid Google voice IDs are normalized before provider calls.
- Repeated Gemini auth and permission failures enter cooldown instead of retry storms.
- Scheduler routes require machine verification.

Current regression coverage lives in:

- [backend/tests/test_critical_services.py](../../backend/tests/test_critical_services.py)
- [backend/tests/test_services_p21.py](../../backend/tests/test_services_p21.py)

---

## 6. Review Checklist

Use this checklist during backend review.

- Does this route belong on the public API, or should it be cron, admin, or script-only?
- Is the route returning persisted value, or is it hiding heavy generation behind a read?
- Can the caller influence ownership or identity through request parameters?
- If the handler writes through a privileged client, where is the ownership check?
- Is the route rate limited if it can burn provider spend or trigger fan-out work?
- Are provider retries bounded and classified correctly?
- If a provider fails, does the user still get the safest usable artifact?
- Is there a regression test for the ownership, rate-limit, or fallback rule being introduced?

---

## 7. Current Repo Implications

Based on the current codebase, this rubric implies the following immediate stance:

- Briefing routes should remain auth-derived and scope-aware.
- Audio persistence should stay owner-gated.
- Provider auth and quota failures should keep moving toward cooldowns and circuit-breaker style behavior.
- Remaining routes should be audited for any caller-supplied `user_id` or equivalent scope override.
- Global briefing storage should be normalized to one representation.
- Expensive translation and TTS batch paths should keep a strict retry budget and clearer failure metrics.

This rubric should be used as the default lens for backend changes touching routes, Supabase writes, LLM calls, translation, TTS, push, and briefing generation.
