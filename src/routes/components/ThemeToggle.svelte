<script>
	import { onMount } from 'svelte';
	import Sun from './Sun.svelte';
	import Moon from './Moon.svelte';

	let theme = 'light';

	const toggleTheme = () => {
		theme = theme === 'light' ? 'dark' : 'light';
		localStorage.setItem('theme', theme);
		document.documentElement.setAttribute('data-theme', theme);
	};

	onMount(() => {
		theme = localStorage.getItem('theme') || 'light';
		document.documentElement.setAttribute('data-theme', theme);
	});
</script>

<button class="theme-toggle {theme}" on:click={toggleTheme} title="Toggle theme">
	<span class="sun">
		<Sun />
	</span>
	<span class="moon">
		<Moon />
	</span>
</button>

<style>
	.theme-toggle {
		width: 2rem;
		aspect-ratio: 1;
		border-radius: 50%;
		cursor: pointer;
		border: none;
		background: var(--color-theme-bg);
		color: var(--color-bg);
		position: relative;
	}

	.sun,
	.moon {
		position: absolute;
		inset: 0;
		margin: auto;
		height: 1.2rem;
		width: 1.2rem;
		display: grid;
		place-items: center;
	}

	.light .sun,
	.dark .moon {
		display: none;
	}
</style>
