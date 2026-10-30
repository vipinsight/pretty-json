const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

// jsonformatter calls into the extension APIs when building a document.
global.chrome = {
  i18n: { getMessage: (key) => key },
  runtime: { getURL: (file) => `chrome-extension://test/${file}` },
};

const { jsonToHTML, errorPage } = require('../ts-out-cjs/jsonformatter.js');
const { safeStringEncodeNums } = require('../ts-out-cjs/safe-encode-numbers.js');
const { isJSONContentType } = require('../ts-out-cjs/content-type.js');

const render = (text) => jsonToHTML(JSON.parse(safeStringEncodeNums(text)), 'http://example.com/a.json');

test('content types', () => {
  for (const ok of ['application/json', 'application/json; charset=utf-8', 'text/json',
    'application/vnd.api+json', 'application/problem+json', 'application/ld+json', 'Application/JSON']) {
    assert.ok(isJSONContentType(ok), ok);
  }
  for (const bad of ['text/html', 'application/jsonp', 'application/x-ndjson', 'text/plain', '']) {
    assert.ok(!isJSONContentType(bad), bad);
  }
});

test('large integers keep their digits', () => {
  const html = render('{"id": 12345678901234567890}');
  assert.ok(html.includes('<span class="num">12345678901234567890</span>'));
});

test('numbers inside strings are left alone', () => {
  const html = render('{"a": "x 12 y"}');
  assert.ok(html.includes('x 12 y'));
});

test('string values and keys are HTML-escaped', () => {
  const html = render('{"<img src=x onerror=alert(1)>": "<script>alert(1)</script>"}');
  assert.ok(!html.includes('<img'));
  assert.ok(!html.includes('<script>alert'));
});

test('only http, https and file strings become links', () => {
  assert.ok(render('["https://example.com/x"]').includes('<a href="https://example.com/x">'));
  assert.ok(!render('["javascript:alert(1)"]').includes('<a '));
});

test('error page escapes the parse error message', () => {
  const payload = 'a<img src=x onerror=alert(1)>';
  let error;
  try { JSON.parse(payload); } catch (e) { error = e; }
  const html = errorPage(error, payload, 'http://example.com/');
  assert.ok(!html.includes('<img'));
});

test('error page escapes a message without line/column', () => {
  const html = errorPage(new Error('bad <b>token</b>'), '{', 'http://example.com/');
  assert.ok(!html.includes('<b>'));
});

test('error page replaces every null byte', () => {
  const html = errorPage(new Error('x'), 'a\u0000b\u0000c', 'http://example.com/');
  assert.ok(!html.includes('\u0000'));
});

test('every fixture renders without throwing', () => {
  const dir = __dirname;
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.json'))) {
    const text = fs.readFileSync(path.join(dir, file), 'utf8').replace(/^﻿/, '');
    let html;
    try {
      html = render(text);
    } catch (e) {
      html = errorPage(e, text, 'http://example.com/' + file);
    }
    assert.ok(html.startsWith('<!DOCTYPE html>'), file);
  }
});
