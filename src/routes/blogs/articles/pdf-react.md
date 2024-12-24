# Downloading (and displaying) PDFs in React

This is the second and final blog in a (short) series on downloading data in React! The first article was on [downloading CSV files](./csv-react), which we found was pretty straight-forward, but had a couple of nice notes collated for future use.

This article should prove to be a little more involved, as it isn't as seamless to create a PDF for download in React. So, strap in and let's get to it!

## Overview

To start, I must acknowledge that I know of no other way to download pdf files on the modern web with javascript without an external package. So that is what we're going to do! The best one I've seen is React-pdf, which provides a pretty straight-forward API for building custom-styled PDF files with React code.

The boilerplate to implement React-pdf is pretty simple and so I'll try to move through that fairly quickly. However, the styling takes a bit of a mental model shift, so that is probably where I'll spend most of our time.

I'll also go through how to actually go about downloading the PDF after it's made, the pitfall I fell into, and how I eventually fixed it.

## Installation

So let's start with installing the package. Make sure to download the `renderer` sub-package, as that's what we'll be using to create our PDFs. The basic `react-pdf` package is for _displaying_ pdfs, so we'll leave that out.

```typescript
npm i @react-pdf/renderer
```

(Maybe someday I'll switch to Pnpm, Deno, or Bun, but today we're gonna keep trucking with NPM.)

## Basic PDF

Here's the example React-pdf has in their docs:

```typescript
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
	page: {
		flexDirection: 'row',
		backgroundColor: '#E4E4E4',
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1,
	},
});

// Create Document Component
const MyDocument = () => (
	<Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.section}>
				<Text>Section #1</Text>
			</View>
			<View style={styles.section}>
				<Text>Section #2</Text>
			</View>
		</Page>
	</Document>
);
```

I'll come back to what's worth noting here, but at this point, just recognizing that it looks like normal React with some css-in-js is all that I want to highlight.

## Creating the Download Button

Now I'm going to go through how we can implement a button to download the _beautiful_ PDF we just created. I'm going to start with the solution I eventually came to, but think it'd be worth the effort to also show a couple failed attempts, and the reasons I went the way I did.

A note: I'm using Material UI at work, so that's what I'll use here as I find it informative and the same principles should apply to other UI libraries.

So here is the solution I came to:

```typescript
import { Button } from '@mui/material';
import { pdf } from '@react-pdf/renderer';

const MyDocument = () => (...);

const DownloadPDFButton = () => {
	const downloadPDF = async () => {...};

	return <Button onClick={downloadPDF}>Download PDF</Button>
};
```

I think it is very clean and, as I'll show below, only renders `<MyDocument />` on the click of the download button, which is great for performance.

Before I go into the details though, let me explain how I got here, and the pitfalls this solution solves.

### Bad Solution 1: Button > LinkComponent > PDFDownloadLink

This is was my initial attempt:

```typescript
import { Button } from '@mui/material';
import { PDFDownloadLink } from '@react-pdf/renderer';

const MyDocument = () => (...);

const DownloadPDFButton = () => {
	const filename = 'my-pdf.pdf';

	return (
		<Button
			LinkComponent={(({children}) => (
				<PDFDownloadLink document={<MyDocument />} filename={filename}>
					{children}
				</PDFDownloadLink >
			))}
			href={filename}
		>
			Download PDF
		</Button>
	)
};
```

At first glance, it seemed like what I was going for. We take the MUI `Button`, turn it into a link with the `href` attribute, and then use MUI's `LinkComponent` prop to stand in for the `<a>` tag. It looks like our normal MUI button. Perfect! Where's the catch?

Well, two things. Firstly, our pdf, `MyDocument` loads the moment this page loads, not great for performance. Secondly, and more importantly, I found this working inconsistently. There was a console error saying something to the effect of, "you're trying to use a ref here, but we don't support refs! Did you try forwardRef?" I can forgive the performance issue for our first issue, but obviously we can't forgive the second issue.

To get around this, I tried two different solutions, both duds. I'll cover each briefly in turn.

### Bad Solution 2: Button > styled(PDFDownloadLink)

The first attempt was to use a styled component to wrap our PDFDownloadLink and make it look like a Mui Button. This reliably solved our more important issue of unreliability, but I lost the colocated styling of the button as I would need to manually take all of my button styles and reapply them, piecemeal in this file. In other words, a mess.

Something like this:

```typescript
import { styled } from '@mui/material';

const StyledPDFDownloadLink = styled(PDFDownloadLink)(({ theme }) => ({
	color: theme.palette.primary.main,
	backgroundColor: theme.palette.primary.light,
	borderRadius: theme.spacing(1),
	padding: theme.spacing(2),
	...many more styles, including hover, active, focus, etc...
}));

const DownloadPDFButton = () => {
	const filename = 'my-pdf.pdf';
	return <StyledPDFDownloadLink document={<MyDocument />} filename={filename}>Download PDF</StyledPDFDownloadLink>;
};
```

### Bad Solution 3: Button + Button > DOM jiu-jitsu

The second solution involved some DOM jiu-jitsu to accept a ref and use the clicking of one button to trigger the clicking of our PDF link. Something like this:

```typescript
import { useRef } from 'react';

const DownloadPDFButton = () => {
	const filename = 'my-pdf.pdf';
	const ref = useRef();
	const handleDownload = () => {
		if (!ref.current) return;

		const link = ref.current.querySelector('a');
		link.click();
	};

	return (
		<>
			<Button onClick={handleDownload}>Download PDF</Button>
			<Box hidden ref={ref}>
				<PDFDownloadLink document={<MyDocument />} filename={filename}></PDFDownloadLink>
			</Box>
		</>
	);
};
```

This, as far as I can tell, solves our second problem, but not our first. As an attempt to solve the immediate load of the PDF issue, I added some state to track when our download link is rendered, and only render it upon click. This solves our first problem, but in my testing, broke the second again. It was unreliable, complex, and therefore harder to maintain.

### Best Solution 3

So let's return to the solution I eventually came to in more detail.

```typescript
import { pdf } from '@react-pdf/renderer';

const DownloadPDFButton = () => {
	const filename = 'my-pdf.pdf';
	const downloadPDF = async () => {
		const filename = 'my-pdf.pdf';
		const blob = await pdf(<MyDocument />).toBlob();
		const url = URL.createObjectURL(blob);

		const link = document.createElement('a');
		link.setAttribute('href', url);
		link.setAttribute('download', filename);
		link.style.display = 'none';

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		URL.revokeObjectURL(url);
	};

	return <Button onClick={downloadPDF}>Download PDF</Button>;
};
```

This is the best solution I've found so far. It is clean, maintainable, and performant. It solves the problem of unreliability, no issues with forwardRef, and it won't render `<MyDocument />` on page load. Let's walk through it.

First, we import `pdf` from `@react-pdf/renderer` and the `Button` component from whichever library you are using. You'll notice that I forgo our Button being an anchor tag, and just add in an `onClick`. This is important, because by using an event handler, we can make it asynchronous, so nothing in that code block runs on page load, solving our performance issue. In our `downloadPDF` event handler, we do a few things: we use react-pdf's `pdf` function to render our pdf and convert it into a blob with the `toBlob()` method. We then turn that into a proper url with the built-in `URL.createObjectURL()` method. Then we do some vanilla js to create a link on the fly, add this url to its `href` attribute, add the filename to its `download` attribute and give it a styling of display: none. At this point, we can add it to the DOM, click the link manually, since we have a reference to the element still, and then remove it from the DOM. Easy-peasy!

Lastly, you'll notice the `URL.revokeObjectURL(url)` method. This is important, because we don't want to leave a reference to the url in memory, as it would cause a memory leak.

My takeaway from this exercise was to read the docs more carefully, see what other methods are available, so if one isn't serving my needs, I can always fall back to another.

## Viewing the PDF: a better development experience

Okay, so far so good! We have a PDF that we can download, albeit a simple one, but as it stands, to develop the PDF we would need to click the button and download our file over and over again after any change we want to see. Not ideal.

So, to make this better we are going to use PDFViewer from `@react-pdf/renderer` to display the PDF. It won't have hot reloading, but it will be a lot easier to work with. I've also done a couple things to make it easier to see and therefore develop. Firstly, I've included some styles that should make the `iframe` (which is what `PDFViewer` renders) take up more of the page, which includes making it `position: "absolute"`. Secondly, in order to avoid any parents bounding in our `position: 'absolute'`, I've put our `PDFViewer` in a react portal, so it'll render at the bottom of the `body` tag.

```typescript
import { createPortal } from 'react-dom';
import { pdf, PDFViewer } from '@react-pdf/renderer';

const DownloadPDFButton = () => {
	//  TODO: remove this once done developing the PDF
	const pdf = <MyDocument />;
	const downloadPDF = async () => {...};

	return (
		<>
			<Button onClick={downloadPDF}>Download PDF</Button>
			{createPortal(
				<PDFViewer
					style={{
						position: 'absolute',
						right: 0,
						bottom: 0,
						zIndex: 1000,
						height: '50rem',
						aspectRatio: '1/1'
					}}
				>
					{pdf}
				</PDFViewer>,
				document.body
			)}
		</>
	);
};
```

Great! Now we have our button to render our PDF and a way to view it as we develop. Let's get into the nitty-gritty of how to create and style the PDF!

## Creating the PDF

Allow me to return to the PDF example that is shown in the react-pdf docs and point some things out.

```typescript
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
	page: {
		flexDirection: 'row',
		backgroundColor: '#E4E4E4',
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1,
	},
});

// Create Document Component
const MyDocument = () => (
	<Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.section}>
				<Text>Section #1</Text>
			</View>
			<View style={styles.section}>
				<Text>Section #2</Text>
			</View>
		</Page>
	</Document>
);
```

-   First, let's note that we need to create a `styles` object with `StyleSheet.create({})`. No styles will be inherited, as we are inside an iframe. It's also very important to recognize that we do not have access to all css language features. React-pdf ships with only a subset of css, which I will highlight where I can.
-   We need to wrap our PDF content in a `Document` component with any number of children, which must be of type `Page` with a specified size ([here are the possible options](https://github.com/diegomura/react-pdf/blob/master/packages/layout/src/page/getSize.js)). If you want to render multiple pages in this document, include multiple `Page` elements as children.
-   Inside of each `Page` component, there exist mainly two primitive components: `View` and `Text`, which I think is similar to React Native. I'll go into more detail on these in a bit, but it's important to know that with these elements, like in normal React code, we can use them to abstract away pieces in order to construct larger layouts.

### Layouts

Let's start with layouts as they are probably the most important part of a PDF. The first thing to note is that `View`'s don't act like divs, where each one will automatically be `display: block` and therefore render on a new line. We don't get that luxury. So, often instead, we will use `display: flex` with `flex-direction: column` and padding and/or margins.

Like so:

```typescript
<View style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
	<Text>Section #1</Text>
	<Text>Section #2</Text>
</View>
```

This will render as a single column, with two rows, separated by 10px. Note that if no units are included for a margin, we default to px. Other units are supported, but I'll leave that for you to [look up in the docs](https://react-pdf.org/).

I should also mention that `display: flex` is the default for `View`, so it isn't necessary to specify it.

#### Tables and Grids

Let's move onto tables and grids, which are treated exactly the same in react-pdf except for the borders for grids.

It's important to note that `flex` doesn't work quite the same in react-pdf as normal css flexbox. Items won't wrap, so it's important to split data into individual rows. I find it most helpful to decide up front how many columns should exist in each row, and from there split the data into separate rows.

Here is an example of a table with the number of columns based on the number of keys in the data object:

```typescript
// data will be something like this: [{ name: 'Alpha', size: 30 }, { name: 'Bravo', size: 25 }]
const Table = (
	data: Record<string, unknown>[],
	columns: string[], // `columns` should probably be keyof the data type[number]
) => (
	<View
		style={
			{
				/* any width styles or a marginHorizontal */
			}
		}
	>
		<TableHeaders columns={columns} />
		<TableBody data={data} columns={columns} />
	</View>
);

const TableHeaders = (columns) => (
	<View style={{ marginBottom: 10 /* implied styles: display: 'flex', flexDirection: 'row' */ }}>
		{columns.map((column, i) => (
			<Text key={`header-${i}`}>{column}</Text>
		))}
	</View>
);

const TableBody = (data, columns) => (
	<View>
		{data.map((row, i) => (
			<View key={`row-${i}`} style={{ marginBottom: 10 /* adds space between rows */ }}>
				{columns.map((column, j) => (
					<Text key={`cell-${i}-${j}`}>{row[column]}</Text>
				))}
			</View>
		))}
	</View>
);
```

If you have a grid instead of a table, you can use the same technique, but instead of `flexDirection: 'row'` be sure to update to `flexDirection: 'column'`.

### Images/SVGs

Before now, I have only mentioned text components, completely disregarding images. But now let's add them to the mix. Images and SVGs are natively supported by react-pdf, and are relatively easy to implement.

```typescript
import { Image } from '@react-pdf/renderer';

return (
	<View style={{ marginBottom: 10 }}>
		<Image src="https://your-image-url.com/image.png" />
		<Text>Section #1</Text>
	</View>
);
```

The `Image` acts just like a regular `img` tag, taking a `src` attribute. The only difference is that it might need some additional styling to make it look right.

SVGs are similarly straight-forward, except that they need to be created locally, with each of the tags replaced with a react-pdf equivalent.

```typescript
import { Svg, G, Path } from '@react-pdf/renderer';

const MyCoolSVG = () => (
	<View>
		<Svg width={100} height={100} viewBox="0 0 100 100">
			<G>
				<Path d="M100 50 L0 100 L100 0" style={{ fill: 'rebeccapurple' }} />
			</G>
		</Svg>
	</View>
);
```

For a list of all the available SVG components, [here they are on the docs](https://react-pdf.org/svg).

### Fonts

Lastly, let's talk a little about fonts! There are a few fonts that are shipped with react-pdf ([listed here](https://react-pdf.org/fonts#register)). These can be used simply by referencing the name of the font in the style object. Like so:

```typescript
const styles = StyleSheet.create({
	page: { fontFamily: 'Helvetica' },
});
```

If a custom font is desired, it is also supported and fairly straight-forward to use any font you want as long as it is in a ttf or woff format (this fact alluded me for a short time). Here is an example of using a static font from google fonts:

```typescript
import { Font } from '@react-pdf/renderer';

Font.register({
	family: 'Open Sans',
	src: 'https://fonts.gstatic.com/s/opensans/v13/cJZKeOuBrn4kERxqtaUH3aCWcynf_cDxXwCLxiixG1c.ttf'
)};

const styles = StyleSheet.create({
	page: {
		fontFamily: 'Open Sans'
	}
});
```

The `Font.register` method takes a `family` and in this case, a `src` attribute. But it can also take a `fonts` attribute with an array of objects, each with a `src` attribute and optionally `fontStyle` or `fontWeight` attributes.

```typescript
Font.register({
	family: 'Open Sans',
	fonts: [
		{ src: 'static-src-url', fontStyle: 'normal', fontWeight: 400 },
		{ src: 'static-src-url', fontStyle: 'italic', fontWeight: 400 },
		{ src: 'static-src-url', fontWeight: 700 }
	]
)};
```

Any number of fonts can be registered in this way and used in any style object by referencing the `family` name. If you are looking for a static url like I referenced above (the fonts.gstatic.com one) and it is not included in [this list](https://gist.github.com/sadikay/d5457c52e7fb2347077f5b0fe5ba9300) and are not sure how to track it down, I recently wrote a [quick article explaining how to to it](./static-fonts)!

## Conclusion

So a lot of ground was covered in this article. We set up the download PDF button, going through a few iterations until the best method was found; we displayed the PDF to improve the developer experience (don't forget to check that TODO and delete it once it is not longer needed); and we created our PDF, steering clear of any styling pitfalls, and even saw how to add images, SVGs, and custom fonts.

I hope this was helpful to you! I'll see you in the next one!

Until then!
