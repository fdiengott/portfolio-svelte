import { TAGS } from '@/constants/blogs';

export const sortBlogs = (blogPagesObjects) =>
	Object.values(blogPagesObjects).sort((a, b) => {
		if (a.pinned || a.tags.includes(TAGS.featured)) {
			return -1;
		}

		if (b.pinned || b.tags.includes(TAGS.featured)) {
			return 1;
		}

		if (new Date(a.date) <= new Date(b.date)) {
			return 1;
		}

		return -1;
	});
