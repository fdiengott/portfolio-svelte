<svelte:head>
	<title>Freddy Diengott - skills</title>
</svelte:head>

<article id="skills" class="panel">
	<h1>Skills</h1>
	<section>
		<div class="skill__grid">
			<!-- react -->
			<div class="skill__icon">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<i class="devicon-react-original colored" data-text="React" tabindex="0" />
			</div>

			<!-- javascript -->
			<div class="skill__icon">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<i class="devicon-javascript-plain colored" data-text="JavaScript" tabindex="0" />
			</div>

			<!-- d3 -->
			<div class="skill__icon">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<i class="devicon-d3js-plain colored" data-text="D3.js" tabindex="0" />
			</div>

			<!-- sass -->
			<div class="skill__icon">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<i class="devicon-sass-original colored" data-text="Sass" tabindex="0" />
			</div>

			<!-- GraphQL -->
			<div class="skill__icon">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<i class="devicon-graphql-plain colored" data-text="GraphQL" tabindex="0" />
			</div>

			<!-- ruby -->
			<div class="skill__icon">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<i class="devicon-ruby-plain colored" data-text="Ruby" tabindex="0" />
			</div>

			<!-- rails -->
			<div class="skill__icon">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<i class="devicon-rails-plain colored" data-text="Rails" tabindex="0" />
			</div>

			<!-- git -->
			<div class="skill__icon">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<i class="devicon-git-plain colored" data-text="Git" tabindex="0" />
			</div>

			<!-- node -->
			<div class="skill__icon">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<i class="devicon-nodejs-plain colored" data-text="Node.js" tabindex="0" />
			</div>

			<!-- Express -->
			<div class="skill__icon">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<i class="devicon-express-original colored" data-text="Express" tabindex="0" />
			</div>

			<!-- postgres -->
			<div class="skill__icon">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<i class="devicon-postgresql-plain colored" data-text="PostgreSQL" tabindex="0" />
			</div>

			<!-- MongoDB -->
			<div class="skill__icon">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<i class="devicon-mongodb-plain colored" data-text="MongoDB" tabindex="0" />
			</div>

			<!-- Next.js -->
			<div class="skill__icon">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<i
					class="devicon-nextjs-original-wordmark colored"
					data-text="Next.js"
					tabindex="0"
				/>
			</div>

			<!-- html -->
			<div class="skill__icon">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<i class="devicon-html5-plain colored" data-text="HTML" tabindex="0" />
			</div>

			<!-- css -->
			<div class="skill__icon">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<i class="devicon-css3-plain colored" data-text="CSS" tabindex="0" />
			</div>

			<!-- Webpack -->
			<div class="skill__icon">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<i class="devicon-webpack-plain colored" data-text="Webpack" tabindex="0" />
			</div>

			<!-- Babel -->
			<div class="skill__icon">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<i class="devicon-babel-plain colored" data-text="Babel" tabindex="0" />
			</div>

			<!-- Vue -->
			<div class="skill__icon">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<i class="devicon-vuejs-plain colored" data-text="Vue.js" tabindex="0" />
			</div>

			<!-- Svelte -->
			<div class="skill__icon">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<i class="devicon-svelte-plain colored" data-text="Svelte" tabindex="0" />
			</div>

			<!-- amazon web services -->
			<div class="skill__icon">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<i
					class="devicon-amazonwebservices-plain colored"
					data-text="Amazon Web Services"
					tabindex="0"
				/>
			</div>

			<!-- Heroku -->
			<div class="skill__icon">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<i class="devicon-heroku-original colored" data-text="Heroku" tabindex="0" />
			</div>

			<!-- jest -->
			<div class="skill__icon">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<i class="devicon-jest-plain colored" data-text="Jest" tabindex="0" />
			</div>

			<!-- tailwind css -->
			<div class="skill__icon">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<i
					class="devicon-tailwindcss-plain colored"
					data-text="Tailwind CSS"
					tabindex="0"
				/>
			</div>

			<!-- Three js -->
			<div class="skill__icon">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<i class="devicon-threejs-original colored" data-text="Three.js" tabindex="0" />
			</div>
		</div>
	</section>
</article>

<style>
	.skill__grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		row-gap: 3rem;
	}

	@media (width > 768px) {
		.skill__grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.skill__icon {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 80px;
		position: relative;
		opacity: 0.9;
		transition: all var(--transition-timing);
	}

	.skill__icon:hover,
	.skill__icon:has(:focus-visible) {
		color: var(--color-primary);
		opacity: 1;
		transform: translateY(5px) scale(1.05);
	}

	.skill__icon:before {
		content: '';
		position: absolute;
		inset: 100% 30% -20% 30%;
		background-color: #444;
		filter: blur(10px);
		opacity: 0;
		transition: all var(--transition-timing);
	}
	.skill__icon:hover:before,
	.skill__icon:has(:focus-visible):before {
		opacity: 0.2;
	}
	.skill__icon i {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: var(--color-primary);
		outline: none;
	}

	i[data-text]:after {
		content: attr(data-text);
		font-size: 1rem;
		position: absolute;

		top: 0;
		padding: 10px;
		border-radius: 10px;
		/* background: var(--color-bg); */
		background: var(--color-primary);
		color: var(--white);
		text-align: center;

		opacity: 0;
		transition: all var(--transition-timing);
	}

	i[data-text]:hover:after,
	i[data-text]:focus-visible:after {
		opacity: 1;
		transform: translateY(-120%);
	}
</style>
