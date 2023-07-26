<script>
	import { page } from '$app/stores';
	import github from '$lib/images/github.svg';

	$: pathname = $page.url.pathname;
</script>

<header>
	<div class="corner">
		<a href="/">
			Freddy Diengott
		</a>
	</div>

	<nav>
		<ul>
			<li aria-current={pathname === '/' && 'page'}>
				<a href="/">Home</a>
			</li>
			<li aria-current={pathname === '/skills' && 'page'}>
				<a href="/skills">Skills</a>
			</li>
			<li aria-current={pathname === '/projects' && 'page'}>
				<a href="/projects">Projects</a>
			</li>
			<li aria-current={pathname === '/contact' && 'page'}>
				<a href="/contact">Contact</a>
			</li>
		</ul>
	</nav>

	<div class="corner">
		<a href="https://github.com/fdiengott/" target="_blank">
			<img src={github} alt="GitHub" />
		</a>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		padding-inline: 0.5rem;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-inline: 0.5rem;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	/* TODO fix these styles */
	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 8px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-primary);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
	}

	nav a,
	.corner a {
		transition: color 0.2s linear;
	}

	.corner a {
		color: var(--color-text);
		text-decoration: none;
	}

	a:hover {
		color: var(--color-primary);
	}
</style>
