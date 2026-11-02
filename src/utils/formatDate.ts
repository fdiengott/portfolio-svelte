import { Temporal } from 'temporal-polyfill';

export function formatDate(date: string) {
	return Temporal.PlainDate.from(date).toLocaleString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}
