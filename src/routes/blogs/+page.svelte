<script>
	import { pages } from './articles/index.js';
</script>

<ul>
	{#each Object.keys(pages) as article}
		<li><a href="/blogs/{article}">{article}</a></li>
	{/each}
</ul>
