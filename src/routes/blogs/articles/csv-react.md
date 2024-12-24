# Downloading CSV data in React

## A little housekeeping

This is going to be the first article in a series of two about downloading files from React! Nothing is, perhaps, very special about these techniques and, I figure, it is pretty common practice at this point. That said, I felt that it was important to write up something quick and easy to reference myself later and for those that are looking for more code examples in one place than what I could readily find on the web after a cursory Kagi search (my google alternative).

So this is the first article about downloading CSV (comma-separated values) files, normally to be read in excel (or today probably more likely google sheets because of the google-ification of the web. See my earlier note about using Kagi over google search). The next article will be for PDFs and should be a little more involved than this one.

Luckily for us UI devs, downloading CSV files in React or vanilla js/html is pretty easy and straight-forward. I mean, "comma-separated values" really does say it all doesn't it! However, what if you want to format numbers in your file? How does one include those commas without it being separated into multiple fields? Well, sit tight baby birds. I'll feed you.

## Simple example

Below is the most straight-forward way to format and download CSV data.

```typescript
const fileName = 'my-data.csv';
const data = [
	['Name', 'Age', 'Height'],
	['Alice', 30, 1.8],
	['Bob', 25, 1.7],
	['Charlie', 35, 1.9],
];

const csvData = data.map((row) => row.join(',')).join('\n');
const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
const url = URL.createObjectURL(blob);

return (
	<button download={fileName} href={csvData}>
		Download CSV
	</button>
);
```

Let's break this down a little bit! Firstly, the file to be downloaded needs a name. This can be procedurally generated, and probably should be, with a timestamp and category. I left it "my-data.csv" above to keep it simple. But in any case, it should have a ".csv" extension.

As for the data, the proper formatting is to have each row separated by a line-break (`\n`) and each row by a comma (`,`). Above the data comes to us (or in this case is defined) as an array of arrays. However, it is more likely to come as a list of objects. If that is the case, an array of the headers will be needed to specify the order, otherwise, because objects aren't ordered, data might be displayed in the wrong column. Additionally, if the object keys aren't just a camelCased version of the column headers, then a mapping object will be needed. This object will map the properly formatted headers to the object keys. Here's how I've done it with data as a list of objects:

```typescript
const data = [
	{ name: 'Alice', age: 30, height: 1.8 },
	{ name: 'Bob', age: 25, height: 1.7 },
	{ name: 'Charlie', age: 35, height: 1.9 },
];

const DOWNLOAD_HEADERS = ['Name', 'Age', 'Height'];

// this is only necessary if the column headers aren't just camelCased versions of the headers
const mapper = {
	[DOWNLOAD_HEADERS[0]]: 'name',
	[DOWNLOAD_HEADERS[1]]: 'age',
	[DOWNLOAD_HEADERS[2]]: 'height',
};

const csvData = data
	.map((row) => {
		return DOWNLOAD_HEADERS.map((header) => {
			const key = mapper[header];
			return row[key];
		}).join(','); // comma separate the cells within a row
	})
	.join('\n'); // line-break separate the rows
```

If the data objects' keys are consistently just a camel-cased version of the column headers, than this mapping is not necessary and can be generated like so:

```typescript
const headerToCamelCase = (header: string) => {
	const pascalCasedKey = string.replace(/\s/g, ''); //remove spaces. This assumes column headers are all capitalized
	return pascalCasedKey[0].toLowerCase() + pascalCasedKey.slice(1); // lower case the first char
};
const csvData = data
	.map((row) => {
		return DOWNLOAD_HEADERS.map((header) => {
			return row[headerToCamelCase(header)];
		}).join(',');
	})
	.join('\n');
```

### So what about that blob?

To make sure the data is interpreted correctly by the browser as a CSV file using utf-8 encoding, we use the built-in `URL.createObjectURL` function to turn a blob into a proper url. Therefore we need to create a blob! Lucky for us it's just as easy as:

```typescript
const blob = new Blob([downloadData], { type: 'text/csv; charset=utf-8;' });
```

So, to put it back together, we create a blob, and use that with our `URL` class to create a properly formatted url. Like so:

```typescript
const createCsvBlobUrl = (downloadData: string) => {
	const blob = new Blob([downloadData], { type: 'text/csv; charset=utf-8;' });

	return URL.createObjectURL(blob);
};
```

## Handling number formatting

If, for example, there are large numbers in the data that should be formatted to be human readable (with commas), how does one sanitize these commas so as not to accidentally create new cells? Simply wrap exactly the format in quotes. Like so:

```typescript
const csvData = data
	.map((row) => {
		return DOWNLOAD_HEADERS.map((header) => {
			const value = row[headerToCamelCase(header)];

			return typeof value === 'number'
				? `"${value.toLocaleString()}"` // toLocaleString will add commas (or periods if European)
				: value;
		}).join(',');
	})
	.join('\n');
```

I personally like to make a helper classes for a case such as this because it undoubtably will be needed again.

```typescript
const escapeCommas = (n: number) => `"${n.toLocaleString()}"`;
```

## Wrap up

So that's it! Pretty straight-forward once you get all the key info: separate your rows with line-breaks (`\n`), separate the cells with commas (`,`), and wrap any comma-formatted numbers in double quotes (`"number"`). Make sure to turn your data strings into blobs and then into formatted urls and pass that cutie to a nice button with download and href tags.

Now you can go off and spreadsheet!

Next up is PDFs! These are a little more involved than CSVs as I stated above, as it requires an external library to be used and the styling is quite different compared to regular CSS. ~~Once it is done I'll link it here!~~ [You can find the article here](./pdf-react)!

Until next time!
