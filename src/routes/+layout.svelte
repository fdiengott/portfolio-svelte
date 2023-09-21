<script>
	import '../styles/css/v5-font-face.min.css';
	import '../styles/css/fontawesome.min.css';
	import '../styles/css/solid.min.css';
	import '../styles/css/brands.min.css';

	import '../styles/main.css';
	import Header from './Header.svelte';
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />
</svelte:head>

<div class="app">
	<Header />
	<main>
		<div class="card">
			<slot />
		</div>
	</main>
</div>

<style>
	main {
		padding: 1rem;
		max-width: 75rem;
		margin: 0 auto;
	}

	.card {
		background-color: white;
		border-radius: 1rem;
		padding-block: 2rem;
		padding-inline: clamp(1rem, 5vw, 4rem);
	}
</style>
