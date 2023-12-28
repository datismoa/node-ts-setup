## Node TS Template

To run a project in the watch mode, use `pnpm watch`. It will rerun the project every time you update a file within it.

To build a project, use `pnpm build`. It is implied that the entry point is always `src/index.ts`, so it will be the same within a build, `dist/index.js`.

You also can utilise pre-configured VSCode debugger settings (`.vscode/launch.json`), which are included intentionally in the repository to provide the best possible experience within this template. If another CE/IDE is used, configure its debugger by yourself based on this VSCode debugger settings.

### Husky and commit linting

By default, commit linting is enabled. Thus, every time you commit something, your commit message is checked. If a check fails, the error pops up. To disable it, remove `.husky` folder and `prepare` script in `package.json`.