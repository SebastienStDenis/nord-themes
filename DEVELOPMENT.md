# Development

## Publishing

The extension is published to [Open VSX](https://open-vsx.org) (the registry
Cursor uses).

### Automatic (default)

Every push/merge to `main` triggers the
[`Publish`](.github/workflows/publish.yml) GitHub Actions workflow, which:

1. Bumps the patch `version` in `package.json`.
2. Prepends a `CHANGELOG.md` entry using the merge commit message as the notes.
3. Commits the bump back to `main` (marked `[skip ci]` so it doesn't loop).
4. Publishes the extension to Open VSX.

This requires an `OVSX_TOKEN`
[repository secret](https://github.com/SebastienStDenis/nord-themes/settings/secrets/actions)
(a personal access token from https://open-vsx.org — see `.env.example`).

### Manual

You can also publish locally via `publish.sh`, which reads an `OVSX_TOKEN` from
`.env` (see `.env.example`). Open VSX rejects re-publishing a version that
already exists, so bump the version and add a changelog entry first:

```sh
npm version patch --no-git-tag-version   # or: minor / major
./publish.sh
```
