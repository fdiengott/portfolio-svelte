export const load = async ({ params }) => {
	// const { pages } = await import('../articles.js');
	const { pages } = await import('../articles/index.js');

	// console.log(pages.default);

	// const page = pages.default.find((file) => file.url === params.slug);

	return {
		page: pages[params.slug]
		// page: pages.default.find((file) => file.url === params.slug)
	};
};
