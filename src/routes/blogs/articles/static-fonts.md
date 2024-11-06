# Where to find static font links from Google Fonts

This is a quick reference I wanted to write down for myself and figured it'd be useful to share with others as well.

The other day while working on creating a dynamic PDF with react, I needed to use a specific font within the PDF to match the rest of the site. Because it was a PDF it meant that I couldn't use css and `@font-face` as I would normally with Google Fonts. So here we'll quickly explore how to find the font file for a Google font (or any externally hosted font).

## Get your font

First, you'll need to find the font you want to use. I ended up using Open Sans, a common, free, sans-serif font these days. The google fonts link is [here](https://fonts.google.com/specimen/Open+Sans).

Next, you'll follow the buttons to get the embedded code that normally would live in a css file. Get the `https://fonts.googleapis.com/...` link and paste that into the browser.

## Getting the link for the font file

Inside this page you'll find any number of different `@font-face` tags for all the font variations. Find the one you want and from there you can easily grab the url that is under src.

## Another option

If the above is not an option for whatever reason, another way is to navigate to a page that is loading the font that you want and opening the dev tools. From there, navigate to the "Network" tab, filter by font by clicking on the "Font" pill, and reload the page. You should see a number of files appear. Click through each one to find one with a "Request URL" that is pointing to a woff2 or ttf link. And that should be what you're looking for!

## Conclusion

That's all there is to it! The first option is probably the easiest with regard to google fonts, but in a pinch you can always see what fonts other websites are downloading.

Happy typographing!
