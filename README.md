# Header and Footer Templates for mbta.com

This repository was recently updated with a script to automate the extraction of the latest header and footer from mbta.com. The old materials are kept in `templates/` and `fonts/` for posterity.

The new markup is at `generated/chrome.html`. This is a WIP.

TODO:
* Extract relevant CSS and JS to support the header and footer, in both formatted and minified (+mapped) versions.
* Support the required languages.

## Downloading the header and footer

An Elixir script is provided that extracts the HTML from mbta.com, modifies the links to add relevant `target`, `rel`, and `href` attributes, removes the language selector from the header, copies the supporting `<script>` and `<link>` JS and CSS tags, and writes the markup to a new file. It can be run with `elixir bin/getchrome` using the Elixir and Erlang versions indicated in `.tool-versions`.

# Old Header and Footer Templates for mbta.com

This directory includes two subdirectories, `fonts` with our required fonts and `templates` with the required HTML, CSS, and Javascript files.

### HTML templates
We included a copy of the HTML for our header and our footer in separate files.

### Vendored CSS
All css classes are vendored with a `mbta-` prefix, including Bootstrap. Some Bootstrap content selects on elements, such as h1, so including your stylesheets after ours is recommended to allow the cascade to override those selectors.

### Vendored Bootstrap
As mentioned above, Bootstrap CSS classes are vendored. We also modified and vendored a copy of Bootstrap toggle for our mobile menu. This script selects on our prefixed selectors.

### Fonts
The CSS file assumes that the font files are located in a sibling directory named `fonts`, i.e. `src: url('../fonts/LatoLatin-Regular.woff2')`. 
