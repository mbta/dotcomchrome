#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cp -r $DIR/../{fonts,images,favicon.ico,styles.*.css,header.*.js*} $DIR/
mkdir -p _includes && cp $DIR/../{footer.html,header.html} _includes
mkdir -p _includes && cp $DIR/../languages/{footer-*.html,header-*.html} $DIR/_includes
mkdir -p _data && cp $DIR/../assets-manifest.json $DIR/_data/manifest.json