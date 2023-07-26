<svelte:head>
	<title>Freddy Diengott - skills</title>
</svelte:head>

<article id="skills" class="panel">
	<a href="/projects" class="jumplink">
		<span class="arrow icon solid fa-chevron-right"
		><span>See my projects</span></span
		>
	</a>
	<h2>Skills</h2>
	<section>
		<div class="skill-grid">
			<!-- TODO add title to each skill -->
			<!-- react -->
			<div class="skill-icon fit">
				<i class="devicon-react-original-wordmark colored" title="React"></i>
			</div>

			<!-- javascript -->
			<div class="skill-icon fit">
				<i class="devicon-javascript-plain colored"></i>
			</div>

			<!-- typescript -->
			<div class="skill-icon fit">
				<i class="devicon-typescript-plain colored"></i>
			</div>

			<!-- ruby -->
			<div class="skill-icon fit">
				<i class="devicon-ruby-plain-wordmark colored"></i>
			</div>

			<!-- rails -->
			<div class="skill-icon fit">
				<i class="devicon-rails-plain-wordmark colored"></i>
			</div>

			<!-- postgres -->
			<div class="skill-icon fit">
				<i class="devicon-postgresql-plain-wordmark colored"></i>
			</div>

			<!-- MongoDB -->
			<div class="skill-icon fit">
				<i class="devicon-mongodb-plain-wordmark colored"></i>
			</div>

			<!-- node -->
			<div class="skill-icon fit">
				<i class="devicon-nodejs-plain-wordmark colored"></i>
			</div>

			<!-- Express -->
			<div class="skill-icon fit">
				<i class="devicon-express-original-wordmark colored"></i>
			</div>

			<!-- sass -->
			<div class="skill-icon fit">
				<i class="devicon-sass-original colored"></i>
			</div>

			<!-- GraphQL -->
			<div class="skill-icon fit">
				<i class="devicon-graphql-plain-wordmark colored"></i>
			</div>

			<!-- redux -->
			<div class="skill-icon fit">
				<i class="devicon-redux-original colored redux"
					><small>Redux</small></i>
			</div>

			<!-- java -->
			<div class="skill-icon fit">
				<i class="devicon-java-plain-wordmark colored"></i>
			</div>

			<!-- amazon web services -->
			<div class="skill-icon fit">
				<i class="devicon-amazonwebservices-plain-wordmark colored"></i>
			</div>

			<!-- html -->
			<div class="skill-icon fit">
				<i class="devicon-html5-plain-wordmark colored"></i>
			</div>

			<!-- css -->
			<div class="skill-icon fit">
				<i class="devicon-css3-plain-wordmark colored"></i>
			</div>

			<!-- Webpack -->
			<div class="skill-icon fit">
				<i class="devicon-webpack-plain-wordmark colored"></i>
			</div>

			<!-- git -->
			<div class="skill-icon fit">
				<i class="devicon-git-plain-wordmark colored"></i>
			</div>

			<!-- illustrator -->
			<div class="skill-icon fit">
				<i class="devicon-illustrator-line colored"></i>
			</div>

			<!-- Heroku -->
			<div class="skill-icon fit">
				<i class="devicon-heroku-original-wordmark colored"></i>
			</div>

			<!-- jest -->
			<div class="skill-icon fit">
				<i class="devicon-jest-plain colored"></i>
			</div>

			<!-- tailwind css -->
			<div class="skill-icon fit">
				<i class="devicon-tailwindcss-original-wordmark colored"></i>
			</div>
		</div>
	</section>
</article>


<style>
	.skill-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		row-gap: 3rem;
	}

	.skill-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 80px;
	}

	.skill-icon i {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: hsl(241, 39%, 59%);
	}

	.redux {
		font-size: 60px;
	}

	.skill-icon small {
		font-size: 25px;
	}
</style>
