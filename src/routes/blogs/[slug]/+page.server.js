export const entries = async () => {
	const { pages } = await import('../articles/index.js');

	return Object.keys(pages).map((slug) => ({ slug }));
};
