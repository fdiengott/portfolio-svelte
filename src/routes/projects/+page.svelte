<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	import pebbble from '../../assets/images/pebbble-homepage.gif';
	import postcard from '../../assets/images/postcard-homepage.gif';
	import lexiloop from '../../assets/images/lexiloop-homepage.gif';
	import theBodyKnows from '../../assets/images/the-body-knows.gif';

	import PageTransitions from '../components/PageTransitions.svelte';

	let isPageLoaded = false;
	onMount(() => (isPageLoaded = true));
</script>

<svelte:head>
	<title>Freddy Diengott - Projects</title>
</svelte:head>

<PageTransitions>
	<article class="panel">
		<div class="projects__header">
			<h1>Projects</h1>
			<p>
				Take a look through a few of my recent projects! Most are from early on in my career and are no longer
				live, but you can still check out the code if you'd like!
			</p>
		</div>

		{#if isPageLoaded}
			<div transition:fly={{ delay: 200, duration: 400, y: -50, opacity: 0 }}>
				<div class="page-break" />
			</div>
		{/if}

		<section class="projects__wrapper">
			<div class="projects__card">
				<span class="projects__card-header">
					<h2>The Body Knows Somatics</h2>
					<div class="external-links">
						<a href="https://github.com/fdiengott/the_body_knows" target="_blank" rel="noopener noreferrer"
							>Github</a
						>
						<a href="https://thebodyknowssomatics.com" target="_blank" rel="noopener noreferrer">Live</a>
					</div>
				</span>
				<a
					href="https://github.com/fdiengott/the_body_knows"
					target="_blank"
					rel="noopener noreferrer"
					class="projects__image-link fit"
				>
					<img src={theBodyKnows} alt="" />
					<article class="hover-text web">
						<p>
							A simple, clean, easy to navigate website I built for my partner's small business as a
							trauma therapist.
						</p>
						<p>Built using Vue and Sass, with Netlify handling form submissions.</p>
					</article>
				</a>
				<article class="hover-text mobile">
					<p>
						A simple, clean, easy to navigate website I built for my partner's small business as a trauma
						therapist.
					</p>
					<p>Built using Vue and Sass, with Netlify handling form submissions.</p>
				</article>
			</div>
			<div class="projects__card">
				<span class="projects__card-header">
					<h2>Pebbble</h2>
					<div class="external-links">
						<a href="https://github.com/fdiengott/pebbble" target="_blank" rel="noopener noreferrer"
							>Github</a
						>
						<!-- <a href="https://pebbble.herokuapp.com/" target="_blank" rel="noopener noreferrer">Live</a> -->
					</div>
				</span>
				<a
					href="https://github.com/fdiengott/pebbble"
					target="_blank"
					rel="noopener noreferrer"
					class="projects__image-link fit"
				>
					<img src={pebbble} alt="" />
					<article class="hover-text web">
						<p>
							A full-stack website I created mimicking Dribbble, a haven for designers and design
							enthusiasts to share their work or find inspiration.
						</p>
						<p>Built using React/Redux, Ruby on Rails, PostgreSQL, and Amazon Web Services.</p>
					</article>
				</a>
				<article class="hover-text mobile">
					<p>
						A full-stack website I created mimicking Dribbble, a haven for designers and design enthusiasts
						to share their work or find inspiration.
					</p>
					<p>Built using React/Redux, Ruby on Rails, PostgreSQL, and Amazon Web Services.</p>
				</article>
			</div>
			<div class="projects__card">
				<span class="projects__card-header">
					<h2>Postcard</h2>
					<div class="external-links">
						<a href="https://github.com/chrisj1225/Postcard" target="_blank" rel="noopener noreferrer"
							>Github</a
						>
						<!-- <a href="https://postcard-triplog.herokuapp.com/" target="_blank" rel="noopener noreferrer">Live</a> -->
					</div>
				</span>
				<a
					href="https://github.com/chrisj1225/Postcard"
					target="_blank"
					rel="noopener noreferrer"
					class="projects__image-link fit"
					><img src={postcard} alt="" />
					<article class="hover-text web">
						<p>
							A website I worked on with a four person team as the frontend developer building a travel
							scrapbook with integrated maps and photos.
						</p>
						<p>
							Built using React/Redux, Express.js, MongoDB, Node.js, Google Maps API, and Amazon Web
							Services.
						</p>
					</article>
				</a>
				<article class="hover-text mobile">
					<p>
						A website I worked on with a four person team as the frontend developer building a travel
						scrapbook with integrated maps and photos.
					</p>
					<p>
						Built using React/Redux, Express.js, MongoDB, Node.js, Google Maps API, and Amazon Web Services.
					</p>
				</article>
			</div>
			<div class="projects__card">
				<span class="projects__card-header">
					<h2>Lexiloop</h2>
					<div class="external-links">
						<a href="https://github.com/fdiengott/LexiLoop" target="_blank" rel="noopener noreferrer"
							>Github</a
						>
						<!-- <a href="https://lexiloop.herokuapp.com/" target="_blank" rel="noopener noreferrer">Live</a> -->
					</div>
				</span>
				<a
					href="https://github.com/fdiengott/LexiLoop"
					target="_blank"
					rel="noopener noreferrer"
					class="projects__image-link fit"
					><img src={lexiloop} alt="" />
					<article class="hover-text web">
						<p>An interactive music sequencer I made that uses syllabified words as audio samples!</p>
						<p>Built with JavaScript, HTML, Sass, Webpack, WebAudio API, and the WordsAPI.</p>
					</article>
				</a>
				<article class="hover-text mobile">
					<p>An interactive music sequencer I made that uses syllabified words as audio samples!</p>
					<p>Built with JavaScript, HTML, Sass, Webpack, WebAudio API, and the WordsAPI.</p>
				</article>
			</div>
		</section>
	</article>
</PageTransitions>

<style>
	/* TODO on mobile the text describing the pictures should be visible below the gifs */
	.projects__wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4rem;
	}

	.projects__header p {
		line-height: 1.7;
	}

	.page-break {
		opacity: 1;
		height: 1px;
		background-color: #000;
		margin-block: 3rem;
		transition: all var(--transition-timing);
		transform: translateY(0);
	}

	.projects__card {
		width: 80%;
	}

	.projects__image-link {
		display: block;
		position: relative;
		overflow: hidden;
	}

	.projects__image-link img {
		transition: var(--transition-timing) transform ease-in-out, var(--transition-timing) filter ease-in-out;
		position: relative;
		top: 1px;
	}

	.hover-text {
		background-color: rgba(0, 0, 0, 0.45);
		color: white;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-block: 1rem;
		line-height: 1.6;
	}
	.hover-text.web {
		display: none;
		position: absolute;
		inset: 0;
		opacity: 0;
		gap: 4rem;
		font-size: var(--fs-500);
		font-weight: 600;
		transition: opacity calc(var(--transition-timing) * 2) ease-in-out;
	}
	.hover-text.mobile {
		display: flex;
		gap: 1rem;
		font-size: var(--fs-300);
		pointer-events: none;
	}

	@media (width > 768px) {
		.projects__image-link:hover img,
		.projects__image-link:focus-visible img {
			transform: scale(1.02);
			filter: blur(8px);
		}

		.hover-text.mobile {
			display: none;
		}
		.hover-text.web {
			display: flex;
		}

		.projects__image-link:hover .hover-text,
		.projects__image-link:focus-visible .hover-text {
			opacity: 0.9;
		}
	}

	.hover-text p {
		width: 80%;
		font-weight: 400;
	}

	.projects__card-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		margin-block-end: 0.5rem;
	}

	.projects__card-header h2 {
		font-size: var(--fs-700);
	}

	.external-links {
		text-align: right;
		line-height: 2.4;
	}

	.external-links a,
	.external-links a:visited {
		color: var(--color-primary);
		text-decoration: none;
		margin-inline: 0.5rem 0;
		font-weight: 400;
	}

	@media (width > 768px) {
		.external-links a:hover {
			text-decoration: underline;
		}

		.external-links {
			text-align: left;
		}

		.external-links a,
		.external-links a:visited {
			margin-inline: 0.5rem;
		}
	}
</style>
