# Development

## Publishing

The extension is published to [Open VSX](https://open-vsx.org) (the registry
Cursor uses) via `publish.sh`, which reads an `OVSX_TOKEN` from `.env` (see
`.env.example`).

Open VSX rejects re-publishing a version that already exists, so before each
release:

1. Add a `CHANGELOG.md` entry describing the changes.
2. Bump the `version` in `package.json` and publish:

   ```sh
   npm version patch --no-git-tag-version   # or: minor / major
   ./publish.sh
   ```
