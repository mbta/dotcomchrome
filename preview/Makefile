serve_preview: copy_files
	npx @11ty/eleventy --serve

copy_files:
	cp -r ../{fonts,images,favicon.ico,styles.*.css,header.*.js*} .
	mkdir -p _includes && cp ../{footer.html,header.html} _includes
	mkdir -p _includes && cp ../languages/{footer-*.html,header-*.html} _includes
	mkdir -p _data && cp ../assets-manifest.json _data/manifest.json
