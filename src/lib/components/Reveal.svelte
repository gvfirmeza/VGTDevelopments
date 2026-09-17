<script lang="ts">
	import { onMount } from 'svelte';

	let { children } = $props();

	let el = $state<HTMLElement>();
	let visible = $state(false);

	onMount(() => {
		const io = new IntersectionObserver(
			([e]) => {
				if (e.isIntersecting) {
					visible = true;
					io.disconnect();
				}
			},
			{ threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
		);
		io.observe(el as HTMLElement);
		return () => io.disconnect();
	});
</script>

<div
	bind:this={el}
	class="transition-all duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] {visible
		? 'blur-0 translate-y-0 opacity-100'
		: 'translate-y-8 opacity-0 blur-[6px]'}"
>
	{@render children()}
</div>
