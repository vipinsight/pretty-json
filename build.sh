#!/bin/bash -e

tsc

rm -rf build
mkdir -p build

rollup ts-out/content.js --format iife --file build/content.js
cp src/viewer.css build/viewer.css
cp src/manifest.json build/manifest.json
cp license.txt build/license.txt
cp -r src/_locales build
cp src/icon*.png build

rm -f prettyjson.zip
pushd build
zip -r ../prettyjson.zip *
popd
