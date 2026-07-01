# Development

## Publishing

The extension is published to [Open VSX](https://open-vsx.org) for Cursor. Run the [Publish](.github/workflows/publish.yml) GitHub Actions workflow by pushing a `v*` tag to main.

### Cutting a release

1. On a branch, bump the version:

   ```sh
   npm version patch --no-git-tag-version   # or: minor / major — edits package.json
   ```

   Then update the `CHANGELOG.md` file and open the PR and merge it to `main`.

2. Once merged, create a `v*` tag on `main`. The tag triggers the Publish workflow. The tag version must match the `package.json` version.

### Manual fallback

You can also publish locally via `publish.sh`, which reads an `OVSX_TOKEN` from `.env` (see `.env.example`). Open VSX rejects re-publishing a version that already exists, so bump the version first:

```sh
npm version patch --no-git-tag-version   # or: minor / major
./publish.sh
```
