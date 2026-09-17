<script lang="ts">
	import { onMount } from 'svelte';

	let scrolled = $state(false);
	onMount(() => {
		const s = () => (scrolled = window.scrollY > 20);
		window.addEventListener('scroll', s, { passive: true });
		s();
		return () => window.removeEventListener('scroll', s);
	});

	const links = [
		{ href: '#projetos', label: 'Projetos' },
		{ href: '#servicos', label: 'Serviços' },
		{ href: '#processo', label: 'Processo' },
		{ href: '#sobre', label: 'Sobre' },
		{ href: '#contacto', label: 'Contacto' }
	];
</script>

<header
	class="fixed inset-x-0 top-0 z-[90] transition-all duration-300 {scrolled
		? 'border-b border-line bg-paper/75 backdrop-blur-md'
		: ''}"
>
	<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
		<a href="/" class="flex items-center gap-2 font-medium tracking-tight">
			<span class="h-2.5 w-2.5 rounded-full bg-accent"></span>
			VGT <span class="font-normal text-muted">Developments</span>
		</a>
		<nav class="hidden gap-9 text-sm md:flex">
			{#each links as l (l.href)}
				<a href={l.href} class="group relative transition-colors hover:text-accent">
					{l.label}
					<span
						class="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all group-hover:w-full"
					></span>
				</a>
			{/each}
		</nav>
		<a
			href="#contacto"
			class="rounded-full border border-ink px-4 py-2 text-sm transition-colors hover:bg-ink hover:text-paper"
		>
			Falar connosco
		</a>
	</div>
</header>
