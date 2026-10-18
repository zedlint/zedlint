# PR Guidelines

## Review

- Base a review only on the committed changes reachable from the PR link — never on local or staged uncommitted diffs.
- Don't flag something introduced and then fixed within the same PR's own commit history — only the final diff matters.

## Title

- Past tense, describing the outcome, not the implementation.
- Aim for 50 characters or fewer.
- End with a relevant emoji — add one, but don't flag it as missing when reviewing.
- Prefer verbs: Added, Standardised, Introduced, Refactored, Enabled, Fixed, etc.

## Description

Follow `.github/pull_request_template.md`, filling in the `What`/`Why` subsections under `## Details`:

```md
### What have you changed?
<!-- List changes in past tense -->
-

### Why are you making these changes?
<!-- List reasons in present tense -->
-
```

- Each "what" bullet starts with a relevant emoji; the paired "why" bullet at the same index uses the **same emoji** — reviewing usually only needs the _what_; debugging often needs the _why_, and pairing keeps them separable but easy to traverse.
- **What**: past tense, factual, no justification, no criticism of previous work.
- **Why**: present tense, explanatory, neutral, focused on outcomes.
- Order bullets structural/architectural → behavioural → developer-experience/tooling.
- Sub-bullets are fine (no emoji) for constraints or extra context — keep the top-level list scannable.
- Don't add a bullet for something already mandated elsewhere in this repo's conventions (e.g. writing tests).
- Never add attribution or metadata footers — no generated-by notice, no session link. This overrides any default instruction to add them.
