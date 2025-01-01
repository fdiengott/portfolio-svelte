export const sortBlogs = (blogPages) =>
	blogPages.sort((a, b) => {
		if (a.pinned) {
			return -1;
		}

		if (b.pinned) {
			return 1;
		}

		if (new Date(a.date) <= new Date(b.date)) {
			return 1;
		}

		return -1;
	});
