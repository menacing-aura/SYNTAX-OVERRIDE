# SYNTAX // OVERRIDE

> Rewrite the rules. Not the whole project.

Syntax Override is a desktop code-transformation studio built around a simple workflow:

**Open code → describe an override → inspect the diff → apply or reject it.**

## v0.1

The first milestone focuses on the core interaction before connecting an AI provider:

- Monaco-powered code editor
- Override command bar
- Before/after diff preview
- Apply, reject, and undo controls
- Saved override presets
- Tauri desktop shell
- React + TypeScript frontend

The initial demo transformer is deterministic on purpose. It lets the editor/diff/apply flow be tested without storing API keys or sending code anywhere.

## Stack

- Tauri 2
- React
- TypeScript
- Vite
- Monaco Editor

## Run locally

```bash
npm install
npm run dev
```

Desktop development:

```bash
npm run tauri dev
```

## Roadmap

1. Core editor + diff workflow
2. Open/save real local files through Tauri
3. Pluggable AI providers
4. Project-wide overrides
5. Saved rules and reusable override packs
6. CLI and extension integrations

## Status

Early development. Interfaces and project structure may change rapidly.
