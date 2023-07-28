<script>
	import { fly } from 'svelte/transition';
</script>

<div in:fly={{ y: -50, duration: 500 }}>
	<slot />
</div>
