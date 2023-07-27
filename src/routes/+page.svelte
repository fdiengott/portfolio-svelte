<script>
	import headshot from '../assets/images/headshot.jpeg';
	import resume from '../assets/Freddy_Diengott_Resume.pdf';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<article id="home" class="panel intro">
		<div class="home__header">
			<img
				class="home__headshot"
				src={headshot}
				alt="A professional headshot of a young man wearing a black button down"
			/>
			<div>
				<h1>Freddy Diengott</h1>
				<p>Software Engineer</p>
			</div>
			<div class="home__blurb">
				<!-- TODO make the underlines links -->
				<p>
					I'm a <span class="cursive-text">curious</span>,
					<span class="design-text">design-focused</span>
					full-stack software engineer based in NYC who loves making beautiful webpages! I'm
					currently a frontend developer at Etrade from Morgan Stanley where I'm maintaining
					a <span class="underline">React Component Library</span> and work as the team
					lead for our <span class="underline">D3.js Charts Library</span>. I'm passionate
					about design, accessibility, and writing DRY, semantic code.
				</p>

				<p>
					My journey to software engineering took many unexpected turns. Some of the pit
					stops included pursing a career as an opera singer and organizing the
					entertainment for over 200 high-end events! I have lots and lots of hobbies and
					love to learn new things!
				</p>
			</div>
		</div>
		<div class="home__footer-links">
			<a
				href={resume}
				target="_blank"
				rel="noopener noreferrer"
				class="icon solid fa-file nav-icon"
			>
				<span>Resume</span>
			</a>
			<a
				href="https://github.com/fdiengott"
				target="_blank"
				rel="noopener noreferrer"
				class="icon brands fa-github nav-icon"
			>
				<span>Github</span>
			</a>
			<a
				href="https://www.linkedin.com/in/freddiengott/"
				target="_blank"
				rel="noopener noreferrer"
				class="icon brands fa-linkedin nav-icon"
			>
				<span>LinkedIn</span>
			</a>
			<a
				href="https://wellfound.com/u/freddy-diengott"
				target="_blank"
				rel="noopener noreferrer"
				class="icon brands fa-angellist nav-icon"
			>
				<span>Wellfound</span>
			</a>
		</div>
	</article>
</section>

<style>
	/* TODO make this look good on mobile */
	article {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.home__headshot {
		width: 20rem;
		border-radius: 50%;
		margin-inline-end: 2rem;
		float: left;
		shape-outside: polygon(0 0, 100% 0, 100% 60%, 70% 100%);
	}

	.home__blurb {
		margin-block: 1rem;
		text-align: justify;
	}
	.home__blurb p {
		padding-block: 1rem;
		line-height: 1.6;
	}

	.cursive-text,
	.design-text {
		--fancy-text-inline-spacing: 10px;
		font-size: var(--fs-600);
		line-height: 1;
	}

	.cursive-text {
		font-family: 'Dancing Script', cursive;
		margin-inline-start: var(--fancy-text-inline-spacing);
	}
	.design-text {
		font-family: 'Poiret One', sans-serif;
		margin-inline: var(--fancy-text-inline-spacing);
	}

	.underline {
		font-weight: 700;
	}

	.icon:focus {
		outline: 2px solid #000;
		outline-offset: 1px;
		border-radius: 3px;
	}

	.nav-icon {
		position: relative;
		display: inline-block;
		width: 1em;
		height: 1em;
		margin-inline-end: 0.5em;
		line-height: 0.9em;
		font-size: 2.5em;
		outline: 0;

		color: var(--color-primary);
		text-align: center;

		-webkit-transition: opacity 0.25s ease-in-out;
		transition: opacity 0.25s ease-in-out;
	}
	.nav-icon.icon:before {
		padding-right: 0;
		opacity: 0.45;
		font-size: 0.8em;
		transition: opacity var(--transition-timing);
	}

	.nav-icon:after {
		content: '';
		display: block;
		position: absolute;
		left: 50%;
		bottom: -0.75em;
		margin-left: -0.5em;
		border-bottom: solid 0em #ffffff;
		border-left: solid 0.5em transparent;
		border-right: solid 0.5em transparent;
		-webkit-transition: border-bottom-width 0.25s ease-in-out;
		transition: border-bottom-width 0.25s ease-in-out;
	}

	.nav-icon span {
		display: block;
		position: absolute;
		background: #222222;
		color: #ffffff;
		top: -2.75em;
		font-size: 0.3em;
		height: 2.25em;
		line-height: 2.25em;
		left: 50%;
		opacity: 0;
		-webkit-transition: opacity 0.25s ease-in-out;
		transition: opacity 0.25s ease-in-out;
		width: 5.5em;
		margin-left: -2.75em;
	}

	.nav-icon span:after {
		content: '';
		display: block;
		position: absolute;
		bottom: -0.4em;
		left: 50%;
		margin-left: -0.6em;
		border-top: solid 0.6em #222222;
		border-left: solid 0.6em transparent;
		border-right: solid 0.6em transparent;
	}

	.nav-icon:hover:before {
		opacity: 1;
	}

	.nav-icon:hover span {
		opacity: 1;
	}

	.home__footer-links {
		display: flex;
		width: 25rem;
		justify-content: space-between;
	}
</style>
