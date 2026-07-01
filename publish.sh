#!/usr/bin/env bash
#
# Re-publish the extension to Open VSX, the registry Cursor uses.
#
# Open VSX rejects re-publishing an existing version, so bump the version
# in package.json (and add a CHANGELOG line) before each release.

set -euo pipefail
cd "$(dirname "$0")"

# Load OVSX_TOKEN from .env
if [ -f .env ]; then
  set -a; . ./.env; set +a
fi

if [ -z "${OVSX_TOKEN:-}" ]; then
  echo "Error: OVSX_TOKEN is not set. Add it to .env (see .env.example)." >&2
  exit 1
fi

npx ovsx publish -p "$OVSX_TOKEN"
