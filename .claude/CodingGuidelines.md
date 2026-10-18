# Coding Guidelines

## Structure

- One concern per folder.
- A folder with a barrel `index.ts` is only reachable from outside through that barrel.
  - If something isn't exported yet, add it to the barrel — don't reach past it.
- A folder without a barrel is imported by its specific file instead.
- Don't use a relative parent import (`../`) to reach past your own concern's root.
  - Needing something further out usually means the file is in the wrong place, or the thing it needs should move.
  - A spec is exempt, since it naturally sits one level below the module it tests.
- Don't reach for a shared abstraction until something is genuinely used in two or more places (YAGNI).
  - Applies directly to path aliases, where a repo has them — a constant or util used in exactly one place stays co-located with its consumer.
  - Reach for an alias when something is shared, standalone, or naturally groups with similar things for conformity.
  - Use an alias only to cross into another concern. Inside the concern that owns it, import relatively — an alias pointing back into its own folder hides whether a dependency is local or external, and masks a cycle through the barrel.
- Split out a sibling file in the same folder when a function has nested ternaries, complex branching, or a callback with real logic — split by complexity, not line count.

## File Naming

- Name a file after its main export, or the resource or concern it covers.
- A module starts as a single file, with its spec alongside in `__tests__/`.
- It moves into its own folder once it needs more than one file, following "one concern per folder".
  - The root file becomes `index.ts`.
  - Each other file is named after what it is.
  - The spec becomes `index.spec.ts`, still under `__tests__/`.
- A spec file always mirrors the name of the file it tests (`<file-name>.spec.ts`).

## Imports

- Group imports in this order, one blank line between groups:
  1. Node built-ins
  2. Third-party packages
  3. `@`-aliased internal modules
  4. Relative imports
  5. Type-only imports, whatever their source
- When importing more than three named exports from one source, split them one per line.
- Prefer named imports over default imports for internal modules.
  - Default imports are fine for third-party packages that only export a default.
- Always import a type with a separate `import type { }` statement, never the inline modifier (`import { x, type y }`).

## Exports

- Named exports only, no default exports.
  - Keeps renaming and autocomplete/grep-ability consistent across the codebase.
  - The only exception is a file whose consumer requires a default export (e.g. a webpack loader, or a tool's config file).
- Export everything in one named block per export kind, at the end of the file.
  - Type exports separate from value exports, `export type {}`/`export {}` split.
  - One item per line, even for a single export.
- Only export what's genuinely needed outside the file — a type or value used solely within its own file stays unexported, even if other exported items are declared alongside it.

## Types

- Use `interface` for object shapes, `type` for unions/intersections/aliases.
- Add explicit return types on every exported function.
  - Constrains what every consumer can rely on — without it, a signature change is only caught wherever it happens to be consumed, if at all.
  - Preferred but not required on unexported/internal functions, since the compiler still catches a mismatch at their own call site.
- Avoid `any`; use `unknown` when the type is genuinely unknown, and narrow it before use.
- Use TypeScript's built-in utility types (`Partial`, `Pick`, `Omit`, `ReturnType`, etc.) over manually rewriting a subset of an existing shape.
- Make an `interface`/`type` generic (`interface Result<TResultData = Record<string, unknown>>`) when its shape needs to stay reusable across different data payloads, rather than duplicating it per payload type or widening a field to `unknown`/`any`. Give the type parameter a default so consumers that don't care about the payload shape can ignore it.
