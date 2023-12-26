// import ea from './ea';
import tomatoSoup from './tomatoSoup';
// import beginning from './beginning';
import bookList from './bookList';
import blogGuide from './blogGuide';
import zshThemeCustomization from './zsh-theme-customization';

const pages = {
	blogGuide: {
		title: 'Welcome to my blog!',
		content: blogGuide,
		date: '12/26/2023',
		tags: ['featured']
	},
	zshThemeCustomization: {
		title: 'Zsh Theme Customization',
		content: zshThemeCustomization,
		date: '12/26/2023',
		tags: ['coding']
	},
	bookList: {
		title: 'Book List',
		content: bookList,
		date: '10/6/2023',
		tags: ['suggestions']
	},
	// beginning: {
	// 	title: 'It began with a whimper',
	// 	content: beginning,
	// 	date: '8/3/2023',
	// 	tags: ['musings']
	// },
	tomatoSoup: {
		title: 'The best vegan/gf tomato soup and grilled cheese recipe you can find',
		content: tomatoSoup,
		date: '8/2/2023',
		tags: ['recipes']
	}
	// ea: {
	// 	title: 'Some recent musings on my personal philosophy and effective altruism',
	// 	content: ea
	// }
};

export { pages };
