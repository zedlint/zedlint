# Testing

## Workflow

Wait until the implementation is approved before writing tests — testing a design that's still likely to change is wasted effort. Once approved:

1. **Write `it.todo` stubs first** for the planned cases and confirm the list before filling any in.
2. **Implement the first test, confirm the approach**, then write the rest — one-by-one or in bulk, as directed. Whenever a test introduces a new mock, stop right after writing it and confirm it's valid and correct before continuing — a wrong mock quietly invalidates every test built on top of it, so this is the cheapest point to catch it.
3. **Iterate with single-file/single-case runs** while writing.
4. **Finish with the full suite and coverage** to confirm the threshold is met.

Coverage is enforced at 100% (branches/functions/lines/statements) via `jest.config.ts`'s `coverageThreshold` — every branch needs a test, not just the happy path. Reach for `/* istanbul ignore next */` only when something is genuinely untestable — not as a shortcut to skip a test that's merely inconvenient to write.

```bash
yarn test path/to/file.spec.ts  # single file
yarn test -t 'name'            # single case
yarn test --coverage           # full suite with coverage
```

## Naming

Name `describe` blocks after the function/module under test:

```ts
describe('createLogger', () => { /* ... */ })

describe('utils', () => {

  describe('functionName', () => { /* ... */ })

})
```

Name test cases by what the code does, not what it "should" do — e.g. `it('returns null when the input is empty')`, not `it('should return null when...')`, since "should" implies uncertainty about whether it actually does.

Prefer `describe.each`/`test.each` over near-duplicate test blocks when cases differ only in input/output.

## Order

- Lay a spec file out as: imports → module mocks (`jest.mock()`) → one top-level `describe` named after the unit under test.
- Put each definition — constant, fixture, helper, `beforeEach`/`afterEach` — at the top of the innermost `describe` that contains every use of it.
- Within a `describe`: definitions → setup/teardown hooks → tests and nested `describe` blocks.
- Order tests and nested `describe` blocks by where the code they cover appears in the source, top to bottom, so the spec reads alongside it.
  - For a test, that's the condition that decides its outcome — e.g. an early `if (!user) return null` is tested before anything after it.
  - For a nested `describe`, that's the start of the function or section it covers.

## Async Assertions

- **In async tests, always call `expect.assertions(x)`**, set to the exact number of `expect()` calls. It guards against the test passing vacuously if an awaited assertion never runs — a rejected promise swallowed somewhere, an early return, a mock that never resolves.
- **Keep `expect()` out of `waitFor`'s retried callback.** The callback retries until it passes, running any `expect()` calls on each attempt — this inflates the count and can cause tests to pass vacuously.

## Test Support Files

Keep shared test-support code (fixtures, mocks, helpers) in the repo's existing test-support location, organised by concern.

## Mock Data

- Import shared mock data into a spec rather than writing it inline, unless the shape is trivial.
- Type mock data at its source — an explicit annotation, or a generic argument that enforces the shape.
- Keep one minimal, valid mock per shape as the source of truth. Leave optional or complex fields `undefined`.
  - Extend it via spread for a test-specific variant: `{ ...mockData, isEnabled: true }`.
  - Spread multiple partial mocks: `{ ...mockData, ...mockDataWithSomething }`.
- Don't manually clear `jest.fn()` mocks (`afterEach(() => jest.clearAllMocks())` or similar) — `clearMocks: true` in `jest.config.ts` already does this before every test.
