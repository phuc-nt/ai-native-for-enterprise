#!/usr/bin/env bash
# Builds the release archive: agent-kit-<version>.zip, holding one top-level
# agent-kit/ directory with everything needed to install the kit and nothing
# else. Tests and test helpers stay in the repository.
#
#   ./package-release.sh [output-directory]     default: the current directory

set -euo pipefail

kit_root="$(cd "$(dirname "$0")" && pwd)"
mkdir -p "${1:-.}"
output_directory="$(cd "${1:-.}" && pwd)"
version="$(node -p "require('$kit_root/kit.json').version")"
archive="$output_directory/agent-kit-$version.zip"

staging="$(mktemp -d)"
trap 'rm -rf "$staging"' EXIT

rsync -a \
  --exclude 'tests/' \
  --exclude '*test*' \
  --exclude 'package-release.sh' \
  --exclude '.DS_Store' \
  --exclude '*.zip' \
  "$kit_root/" "$staging/agent-kit/"

rm -f "$archive"
(cd "$staging" && zip -qrX "$archive" agent-kit)
echo "$archive"
