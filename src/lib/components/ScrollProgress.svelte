<script lang="ts">
	import { onMount } from 'svelte';

	let progress = $state(0);
	onMount(() => {
		const update = () => {
			const h = document.documentElement.scrollHeight - window.innerHeight;
			progress = h > 0 ? (window.scrollY / h) * 100 : 0;
		};
		window.addEventListener('scroll', update, { passive: true });
		update();
		return () => window.removeEventListener('scroll', update);
	});
</script>

<div class="fixed top-0 right-0 left-0 z-[150] h-[3px] bg-transparent">
	<div
		class="h-full bg-accent transition-[width] duration-100 ease-out"
		style="width: {progress}%"
	></div>
</div>
