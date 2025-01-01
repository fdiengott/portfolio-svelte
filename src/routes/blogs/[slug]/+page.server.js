export const entries = async () => {
	const { pages } = await import('../articles/index.js');

	return pages.map(({ slug }) => ({ slug }));
};
