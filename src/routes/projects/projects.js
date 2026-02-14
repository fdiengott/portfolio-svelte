import pebbble from '../../assets/images/pebbble-homepage.gif';
import postcard from '../../assets/images/postcard-homepage.gif';
import lexiloop from '../../assets/images/lexiloop-homepage.gif';
import theBodyKnows from '../../assets/images/the-body-knows.gif';
import taylorTaylorComposer from '../../assets/images/tylertaylorcomposer-works-page.png';
import barbaraCarlsonPoet from '../../assets/images/barbara-carlson-homepage.png';

export const projects = [
	{
		title: 'Barbara Siegel Carlson Poet',
		githubLink: 'https://github.com/fdiengott/barbara-carlson-poet',
		liveLink: 'https://barbarasiegelcarlson.com/',
		imgSrc: barbaraCarlsonPoet,
		description: [
			'An elegant, static website I built for my Aunt and profession poet, Barbara Siegel Carlson.',
			'Built using Astro with an emphasis on elegance, no-frills simplicity and ease of maintainability.',
		],
	},
	{
		title: 'Tyler Taylor Composer',
		githubLink: 'https://github.com/fdiengott/tyler-taylor-composer',
		liveLink: 'https://tylertaylorcomposer.netlify.app/',
		imgSrc: taylorTaylorComposer,
		description: [
			'A static website I built for my friend Taylor Taylor, a musician and composer.',
			'Built using Astro with an emphasis on simplicity and ease of maintainability and customization.',
		],
	},

	{
		title: 'The Body Knows Somatics',
		githubLink: 'https://github.com/fdiengott/the_body_knows',
		liveLink: 'https://thebodyknowssomatics.com',
		imgSrc: theBodyKnows,
		description: [
			"A simple, clean, easy to navigate website I built for my partner's small business as a trauma therapist.",
			'Built using Vue and Sass, with Netlify handling form submissions.',
		],
	},

	{
		title: 'Pebbble',
		githubLink: 'https://github.com/fdiengott/pebbble',
		liveLink: '',
		imgSrc: pebbble,
		description: [
			'A full-stack website I created mimicking Dribbble, a haven for designers and design enthusiasts to share their work or find inspiration.',
			'Built using React/Redux, Ruby on Rails, PostgreSQL, and Amazon Web Services.',
		],
	},

	{
		title: 'PostCard',
		githubLink: 'https://github.com/chrisj1225/Postcard',
		liveLink: '',
		imgSrc: postcard,
		description: [
			'A website I worked on with a four person team as the frontend developer building a travel scrapbook with integrated maps and photos.',
			'Built using React/Redux, Express.js, MongoDB, Node.js, Google Maps API, and Amazon Web Services.',
		],
	},

	{
		title: 'Lexiloop',
		githubLink: 'https://github.com/fdiengott/LexiLoop',
		liveLink: '',
		imgSrc: lexiloop,
		description: [
			'An interactive music sequencer I made that uses syllabified words as audio samples!',
			'Built with JavaScript, HTML, Sass, Webpack, WebAudio API, and the WordsAPI.',
		],
	},
];
