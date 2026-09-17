<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Cursor from '$lib/components/Cursor.svelte';
	import ScrollProgress from '$lib/components/ScrollProgress.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="grain">
	<Cursor />
	<ScrollProgress />
	<Nav />
	{@render children()}
	<Footer />
</div>
