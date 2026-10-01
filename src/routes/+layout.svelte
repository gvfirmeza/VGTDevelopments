<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { getLenis, initSmoothScroll } from '$lib/motion';
	import { intro } from '$lib/intro.svelte';
	import Intro from '$lib/components/Intro.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Cursor from '$lib/components/Cursor.svelte';
	import ScrollProgress from '$lib/components/ScrollProgress.svelte';
	import WhatsAppButton from '$lib/components/WhatsAppButton.svelte';

	let { children } = $props();

	onMount(() => {
		const cleanup = initSmoothScroll();
		// os filhos montam primeiro: se a intro ainda está a correr, trava o scroll
		if (!intro.done) getLenis()?.stop();
		return cleanup;
	});
</script>

<div class="grain">
	<Intro />
	<Cursor />
	<ScrollProgress />
	<Nav />
	<main>
		{@render children()}
	</main>
	<Footer />
	<WhatsAppButton />
</div>
