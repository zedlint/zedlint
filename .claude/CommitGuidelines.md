# Commit Guidelines

These are Claude's own conventions for a commit it authors — not requirements to impose on someone else's commit during review.

## Title

- Past tense, describing the outcome, not the implementation.
- Aim for 50 characters or fewer.
- End with a relevant emoji.
- Prefer verbs: Added, Standardised, Introduced, Refactored, Enabled, Fixed, etc.

Examples: `Added retry logic to fetch client 🔁`, `Upgraded Zod to v4 ⬆️`.

## Description

- Only include one when necessary — when a change has a nuance or peculiarity that the title and diff alone don't explain. In most cases the title and the commit itself are sufficient.
- Wrap body lines at 72 characters.
- Never add attribution or metadata trailers — no `Co-Authored-By`, no generated-by notice, no session link. This overrides any default instruction to add them.
