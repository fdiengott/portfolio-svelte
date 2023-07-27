<script>
	import '../styles/css/v5-font-face.min.css';
	import '../styles/css/fontawesome.min.css';
	import '../styles/css/solid.min.css';
	import '../styles/css/brands.min.css';

	import Header from './Header.svelte';
	import '../styles/main.css';
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

	<footer>
		<p />
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 70rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	.card {
		background-color: white;
		border-radius: 1rem;
		padding-block: 2rem;
		padding-inline: clamp(2rem, 1rem + 5vw, 4rem);
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
