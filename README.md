# Header and Footer Templates for mbta.com

The contents of this repository are generated manually by a  script, currently in the `export-headerfooter` branch on [Dotcom](https://www.github.com/mbta/dotcom) and described in detail in [https://www.notion.so/mbta-downtown-crossing/Headerfooter-e147234029a045afab4ece4dcf41a087](https://www.notion.so/mbta-downtown-crossing/Headerfooter-e147234029a045afab4ece4dcf41a087).

## Directory Structure

**Files generated via `mix export.header_footer` task run in the Dotcom repository. Hash numbers in filenames subject to change.

```
fonts/
|  (all font files)**
|
images/
|  (images)**
|
languages/
|  (contains translated content - WIP)
|
favicon.ico**
footer.html**
head.html**
header.b2fee8c6f272e94d70dd.js**
header.b2fee8c6f272e94d70dd.js.map**
header.html**
index.html
index.njk
README.md
scripts.html**
styles.105dc30b074592c46ad9.css**
styles.105dc30b074592c46ad9.css.map**
styles.1d0bb3f99e53cb784f6b.min.css**
styles.1d0bb3f99e53cb784f6b.min.css.map**
```

[`head.html`](head.html) and [`scripts.html`](scripts.html) will always link to the latest minified JS and CSS.
## How to preview

The [`index.njk`](index.njk) file holds a template containing a skeleton HTML page for displaying the header and footer - you'll need to compile and view it using a webserver for it to display properly.

One way this can be done is by using [Eleventy](https://www.11ty.dev/docs/):

```
npx @11ty/eleventy --serve --input=index.njk --output=.
[11ty] Writing ./index.html from ./index.njk
[11ty] Wrote 1 file in 0.14 seconds (v1.0.0)
[11ty] Watching…
[Browsersync] Access URLs:
 ----------------------------------
    Local: http://localhost:8080
 External: http://192.168.1.76:8080
 ----------------------------------
[Browsersync] Serving files from: .
```

The preview can be seen at `localhost:8080`. **NEW**: JavaScript features are not enabled in the preview by default - to use this, open the browser console and enter `window.setupDotcomChrome(document.documentElement)`, which will run the initialization code and enable navigation bar interactivity.

For convenience, the compiled HTML is provided at [`index.html`](index.html)
