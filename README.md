# Header and Footer Templates for mbta.com

This directory includes two subdirectories, `fonts` with our required fonts and `templates` with the required HTML, CSS, and Javascript files.

### HTML templates
We included a copy of the HTML for our header and our footer in separate files.

### Vendored CSS
All css classes are vendored with a `mbta-` prefix, including Bootstrap. Some Bootstrap content selects on elements, such as h1, so including your stylesheets after ours is recommended to allow the cascade to override those selectors.

### Vendored Bootstrap
As mentioned above, Bootstrap CSS classes are vendored. We also modified and vendored a copy of Bootstrap toggle for our mobile menu. This script selects on our prefixed selectors.

### Fonts
The CSS file assumes that the font files are located in a sibling directory named `fonts`, i.e. `src: url('../fonts/LatoLatin-Regular.woff2')`. 
