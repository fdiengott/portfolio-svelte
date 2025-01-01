// import ea from './ea';
import tomatoSoup from './tomatoSoup';
// import beginning from './beginning';
import bookList from './bookList';
import blogGuide from './blogGuide';
import zshThemeCustomization from './zsh-theme-customization';
import regex101 from './regex101.md?raw';
import csvReact from './csv-react.md?raw';
import staticFonts from './static-fonts.md?raw';
import pdfReact from './pdf-react.md?raw';
import recommendedBookList from './recommendedBookList';
import goalActivities from './goal-activities-2025.md?raw';

export const TAGS = {
	suggestions: 'suggestions',
	coding: 'coding',
	recipes: 'recipes',
	featured: 'featured',
	musings: 'musings',
	music: 'music',
};

const pages = {
	'goal-activities-2025': {
		title: 'Goal Activities in 2025',
		content: goalActivities,
		date: '01/01/25',
		tags: [TAGS.suggestions],
	},
	'book-list': {
		title: 'Recent Reading List',
		content: bookList,
		date: '12/04/24',
		tags: [TAGS.suggestions],
		pinned: true,
	},
	'recommended-books': {
		title: 'Recommended Book List',
		content: recommendedBookList,
		date: '12/04/24',
		tags: [TAGS.suggestions],
	},
	'pdf-react': {
		title: 'PDFs in React',
		content: pdfReact,
		date: '11/20/2024',
		tags: [TAGS.coding],
	},
	'static-fonts': {
		title: 'Where to Find Static Font Links',
		content: staticFonts,
		date: '11/6/2024',
		tags: [TAGS.coding],
	},
	'csv-react': {
		title: 'Downloading CSVs in React',
		content: csvReact,
		date: '11/2/2024',
		tags: [TAGS.coding],
	},
	'blog-guide': {
		title: 'Welcome to my blog!',
		content: blogGuide,
		date: '12/26/2023',
		tags: [TAGS.featured],
	},
	regex101: {
		title: 'Regex 101',
		content: regex101,
		date: '12/29/2023',
		tags: [TAGS.coding],
	},
	'zsh-theme-customization': {
		title: 'Zsh Theme Customization',
		content: zshThemeCustomization,
		date: '12/26/2023',
		tags: [TAGS.coding],
	},
	// beginning: {
	// 	title: 'It began with a whimper',
	// 	content: beginning,
	// 	date: '8/3/2023',
	// 	tags: [TAGS.musings]
	// },
	'tomato-soup': {
		title: 'The best vegan/gf tomato soup and grilled cheese recipe you can find',
		content: tomatoSoup,
		date: '8/2/2023',
		tags: [TAGS.recipes],
	},
	// ea: {
	// 	title: 'Some recent musings on my personal philosophy and effective altruism',
	// 	content: ea
	// }
};

export { pages };
