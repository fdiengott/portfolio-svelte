// import ea from './ea';
import tomatoSoup from './tomatoSoup';
import beginning from './beginning';
import bookList from './bookList';

const pages = {
	bookList: {
		title: 'Book List',
		content: bookList,
		date: '10/6/2023',
		tags: ['suggestions']
	},
	beginning: {
		title: 'It began with a whimper',
		content: beginning,
		date: '8/3/2023',
		tags: ['musings']
	},
	tomatoSoup: {
		title: 'The best vegan/gf tomato soup and grilled cheese recipe you can find',
		content: tomatoSoup,
		date: '8/2/2023',
		tags: ['recipe']
	}
	// ea: {
	// 	title: 'Some recent musings on my personal philosophy and effective altruism',
	// 	content: ea
	// }
};

export { pages };
