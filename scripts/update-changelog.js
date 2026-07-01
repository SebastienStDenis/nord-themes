#!/usr/bin/env node
//
// Prepend a manually-entered changelog entry for the current version to the top
// of CHANGELOG.md (right after the "# Changelog" heading). Used by the manual
// Publish workflow. Reads the version and entry from the environment so the
// user-supplied text is never interpolated into a shell command.

const fs = require("fs");
const path = require("path");

const version = process.env.VERSION;
const entry = (process.env.CHANGELOG_ENTRY || "").trim();

if (!version) {
  console.error("VERSION is not set.");
  process.exit(1);
}
if (!entry) {
  console.error("CHANGELOG_ENTRY is empty.");
  process.exit(1);
}

const changelogPath = path.join(__dirname, "..", "CHANGELOG.md");
const contents = fs.readFileSync(changelogPath, "utf8");

if (new RegExp(`^## ${version.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "m").test(contents)) {
  console.log(`CHANGELOG.md already has an entry for ${version}; leaving it unchanged.`);
  process.exit(0);
}

const section = `## ${version}\n\n${entry}\n`;
const heading = "# Changelog";
const headingIndex = contents.indexOf(heading);

let updated;
if (headingIndex === -1) {
  updated = `${heading}\n\n${section}\n${contents}`;
} else {
  const afterHeading = headingIndex + heading.length;
  const rest = contents.slice(afterHeading).replace(/^\n+/, "");
  updated = `${contents.slice(0, afterHeading)}\n\n${section}\n${rest}`;
}

fs.writeFileSync(changelogPath, updated);
console.log(`Added changelog entry for ${version}.`);
