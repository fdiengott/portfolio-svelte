export const load = async ({ params }) => {
	const { pages } = await import('../articles/index.js');

	return {
		page: pages.find((page) => page.slug === params.slug),
	};
};
