Pretty JSON
========

PrettyJSON is a Manifest V3 extension for Microsoft Edge and Google Chrome that formats JSON documents in the browser: syntax highlighting, collapsible objects and arrays, clickable links, and a readable error view for invalid JSON.

## Development

Requires [Node.js](https://nodejs.org/) 20+ and [Yarn](https://yarnpkg.com/).

```bash
yarn            # install dependencies
yarn lint       # type-check
yarn test       # run tests
yarn build      # build into build/ and prettyjson.zip
```

## Try it locally

1. Run `yarn build`.
2. Open `edge://extensions` (or `chrome://extensions`) and enable Developer mode.
3. Choose "Load unpacked" and select the `build/` folder.
4. Open any of the files in `tests/` (for `file://` URLs, enable "Allow access to file URLs" for the extension).
