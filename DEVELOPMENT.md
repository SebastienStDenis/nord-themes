# Development

## Publishing

The extension is published to [Open VSX](https://open-vsx.org) (the registry
Cursor uses).

Releases are **tag-triggered**: merging to `main` never publishes, so day-to-day
work is safe. A release happens only when you push a `v*` tag, which runs the
[`Publish`](.github/workflows/publish.yml) GitHub Actions workflow (build the
`.vsix`, verify the tag matches `package.json`, publish to Open VSX).

This requires an `OVSX_TOKEN`
[repository secret](https://github.com/SebastienStDenis/nord-themes/settings/secrets/actions)
(a personal access token from https://open-vsx.org — see `.env.example`).

### Cutting a release

`main` is protected, so the version bump goes through a PR, but the tag can be
pushed directly (tags aren't protected).

1. On a branch, bump the version (no tag yet) and add a `CHANGELOG.md` entry:

   ```sh
   git checkout -b release-1.0.5
   npm version patch --no-git-tag-version   # or: minor / major — edits package.json
   # add the CHANGELOG.md entry for this version
   git commit -am "Release 1.0.5"
   git push -u origin release-1.0.5
   ```

   Open the PR and merge it to `main`.

2. Once merged, create a `v*` tag on `main`'s new HEAD (e.g. `v1.0.5`). The tag
   triggers the Publish workflow.

The tag version must match the `package.json` version — the workflow's version
check enforces this and fails the release if they drift, so a mistyped tag never
publishes the wrong version.

### Manual fallback

You can also publish locally via `publish.sh`, which reads an `OVSX_TOKEN` from
`.env` (see `.env.example`). Open VSX rejects re-publishing a version that
already exists, so bump the version first:

```sh
npm version patch --no-git-tag-version   # or: minor / major
./publish.sh
```
