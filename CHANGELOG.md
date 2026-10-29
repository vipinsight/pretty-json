# Changelog

## 1.0.4
- Security: escape the JSON parse error message before rendering it as HTML.
- Detect more JSON content types (`application/vnd.api+json`, `text/json`, ...).
- Replace every null byte in the error view, not just the first.
- Remove the unused `viewer.js` script and leftover Firefox/legacy files.
- Upgrade TypeScript and rollup, commit `yarn.lock`, add tests and CI.

## 1.0.3
- Migrate to Manifest V3.

## 1.0.0
- First public release.
