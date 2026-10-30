# PrettyJSON

A lightweight Manifest V3 extension for **Microsoft Edge** and **Google Chrome** that turns raw JSON in the browser into a readable, collapsible view.

[Get PrettyJSON from the Microsoft Edge Add-ons store](https://microsoftedge.microsoft.com/addons/detail/jilmabbdmkbakhjganilpihpakkielnl)

![PrettyJSON screenshot](artwork/screenshot.png)

## Features

- **Syntax highlighting** for strings, numbers, booleans, `null` and property names.
- **Collapse and expand** any object or array with a click, or collapse/expand everything with the left and right arrow keys.
- **Property paths on hover**: hover a key to see its path, e.g. `<root>.items[2].name`.
- **Clickable links**: string values that are `http`, `https` or `file` URLs become links.
- **Large numbers stay exact**: integers above JavaScript's safe range (for example `12345678901234567890`) are shown with all their digits instead of being rounded.
- **Readable errors**: if the document is not valid JSON you see the parse error message together with the raw text, instead of a blank page.
- **Works on JSON content types** such as `application/json`, `text/json` and `application/vnd.api+json`, and on any URL ending in `.json`.

## Usage

Open any JSON URL or `.json` file. There is nothing to click and no settings: the page is formatted automatically.

To format local files (`file://` URLs), turn on **Allow access to file URLs** for the extension on `edge://extensions` or `chrome://extensions`.

## Permissions and privacy

- Runs on all pages (`<all_urls>`) only to check whether the page is a JSON document. If it is, the page is replaced by the formatted view, entirely inside your browser.
- No data is collected, stored or sent anywhere. The extension makes no network requests.
- See the [privacy policy](privacy-policy.md).

## Development

Requires [Node.js](https://nodejs.org/) 20+ and [Yarn](https://yarnpkg.com/).

```bash
yarn            # install dependencies
yarn lint       # type-check
yarn test       # run tests
yarn build      # build into build/ and prettyjson.zip
```

### Try it locally

1. Run `yarn build`.
2. Open `edge://extensions` (or `chrome://extensions`) and enable Developer mode.
3. Choose "Load unpacked" and select the `build/` folder.
4. Open any of the files in `tests/`.

## License

MIT. See [license.txt](license.txt).
