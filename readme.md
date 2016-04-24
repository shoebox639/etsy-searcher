# Searching Etsy

An all client-side and dependency-free app that searches Etsy for you.

##Compatibility
This site was tested on Chrome 50. Any other modern browser should work, except IE. 

## Deploy
```
npm install
```

Then just serve up the root directory using your favorite webserver. I used python SimpleHTTPServer. 

## Features
In addition to typing in the input box and searching Etsy, this app as a few other features.

### Bookmarkable Search
You can navigate to the root page with the `?q=[search term]` query parameter and the page will automatically search on that term.

### Forward and Back
Every search utilizes HTML5 `pushState()` api, essentially going to a different url. This allows for the user to go back and forth between searches by going forward or back in the browser.

### Infinite Scroll
As the user scrolls, automatically fetch more results.

### Responsive
The the site is fairly responsive thanks to Twitter Bootstrap.

## Organization
- components.js - creates listing and spinner DOM components
- etsy.js - queries esty
- extend.js - a simple implementation of methods like `$.extend`.
- infinite-scroll.js - provide a function to call a callback when the user gets the bottom of the screen
- jsonp.js - library to make jsonp calls
- main.js - orchestrates the page.
- routing.js - handles on page route changes
- url.js - convenience methods for dealing with urls
- shoebox.js - entry file for my utility function


## Testing
This was a fairly small project and I felt that testing was not necessary.