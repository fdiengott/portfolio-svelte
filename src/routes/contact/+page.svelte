<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let isPageLoaded = false;
	onMount(() => (isPageLoaded = true));
</script>

<svelte:head>
	<title>Freddy Diengott - Contact</title>
</svelte:head>

<article class="panel">
	<div class="contact__header">
		<h1>Contact Me</h1>
	</div>
	{#if isPageLoaded}
		<div transition:fly={{ delay: 200, duration: 400, y: -50, opacity: 0 }}>
			<div class="page-break" />
		</div>
	{/if}
	<table>
		<tbody>
			<tr>
				<th>Name</th>
				<th>Freddy Diengott</th>
			</tr>
			<tr>
				<th>Email</th>
				<th>fdiengott@gmail.com</th>
			</tr>
			<tr>
				<th>Location</th>
				<th>Brooklyn, NY</th>
			</tr>
			<tr>
				<th>Github</th>
				<th><a href="https://github.com/fdiengott" target="_blank" rel="noopener noreferrer">fdiengott</a></th>
			</tr>
			<tr>
				<th>LinkedIn</th>
				<th
					><a href="https://www.linkedin.com/in/freddiengott/" target="_blank" rel="noopener noreferrer"
						>freddiengott</a
					></th
				>
			</tr>
			<tr>
				<th>Wellfound</th>
				<th
					><a href="https://wellfound.com/u/freddy-diengott" target="_blank" rel="noopener noreferrer"
						>freddy-diengott</a
					></th
				>
			</tr>
			<tr>
				<th>Resume</th>
				<th><a href="images/Freddy_Diengott_Resume.pdf" target="_blank" rel="noopener noreferrer">Link</a></th>
			</tr>
		</tbody>
	</table>
</article>

<style>
	.page-break {
		opacity: 1;
		height: 1px;
		background-color: #000;
		margin-block: 1rem 3rem;
		transition: all var(--transition-timing);
		transform: translateY(0);
	}
	table {
		text-align: left;
		margin-inline: auto;
		margin-block-end: 2rem;
	}

	tr {
		height: 2.5rem;
	}

	th {
		font-weight: 400;
	}

	th:first-child {
		width: 17rem;
	}

	th:not(:first-child) {
		text-align: right;
	}

	@media (width > 768px) {
		th:not(:first-child) {
			text-align: left;
		}
	}
</style>
