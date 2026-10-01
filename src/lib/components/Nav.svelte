<script lang="ts">
	import { onMount } from 'svelte';
	import Logo from './Logo.svelte';
	import Shape from './Shape.svelte';
	import { getLenis, magnetic } from '$lib/motion';

	const links = [
		{ href: '#projetos', label: 'Projetos' },
		{ href: '#servicos', label: 'Serviços' },
		{ href: '#processo', label: 'Processo' },
		{ href: '#sobre', label: 'Sobre' },
		{ href: '#contacto', label: 'Contacto' }
	];

	let scrolled = $state(false);
	let dark = $state(false);
	let open = $state(false);
	let active = $state('');
	let header = $state<HTMLElement>();

	onMount(() => {
		const s = () => {
			scrolled = window.scrollY > 40;
			// o que está por baixo da barra é uma secção escura?
			const below = document
				.elementsFromPoint(window.innerWidth / 2, 36)
				.find((el) => !header?.contains(el));
			dark = !!below?.closest('[data-nav="dark"]');
		};
		window.addEventListener('scroll', s, { passive: true });
		s();

		// secção ativa: a que ocupa a faixa central do ecrã
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) active = `#${e.target.id}`;
			},
			{ rootMargin: '-45% 0px -50% 0px' }
		);
		for (const l of links) {
			const el = document.querySelector(l.href);
			if (el) io.observe(el);
		}

		const esc = (e: KeyboardEvent) => e.key === 'Escape' && (open = false);
		window.addEventListener('keydown', esc);

		return () => {
			window.removeEventListener('scroll', s);
			window.removeEventListener('keydown', esc);
			io.disconnect();
		};
	});

	// trava o smooth scroll com o menu aberto (só reage a mudanças, não à montagem)
	let wasOpen = false;
	$effect(() => {
		if (open === wasOpen) return;
		wasOpen = open;
		if (open) getLenis()?.stop();
		else getLenis()?.start();
	});
</script>

<header bind:this={header} class="fixed inset-x-0 top-0 z-[90] px-3 pt-3 md:px-6">
	<div
		class="mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-500 md:px-5 {open
			? 'border-transparent text-paper'
			: !scrolled
				? 'border-transparent'
				: dark
					? 'border-paper/10 bg-ink/60 text-paper backdrop-blur-xl'
					: 'border-line/80 bg-paper/70 shadow-[0_10px_40px_-20px_rgba(17,18,20,.35)] backdrop-blur-xl'}"
	>
		<Logo size={16} />

		<nav class="hidden items-center gap-1 text-sm md:flex" aria-label="Principal">
			{#each links as l (l.href)}
				<a
					href={l.href}
					class="relative rounded-full px-4 py-2 transition-[color,opacity] hover:text-accent {active ===
					l.href
						? ''
						: 'opacity-60 hover:opacity-100'}"
					aria-current={active === l.href ? 'true' : undefined}
				>
					{#if active === l.href}
						<span
							class="absolute top-1/2 left-1.5 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent"
						></span>
					{/if}
					{l.label}
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-2">
			<a
				href="#contacto"
				use:magnetic={0.25}
				class="hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors hover:bg-accent hover:text-paper sm:flex {dark &&
				scrolled
					? 'bg-paper text-ink'
					: 'bg-ink text-paper'}"
			>
				Falar connosco
				<span class="h-1.5 w-1.5 rounded-full bg-accent transition-colors"></span>
			</a>
			<button
				type="button"
				class="relative flex h-10 w-10 items-center justify-center rounded-full border border-current/15 md:hidden"
				aria-label={open ? 'Fechar menu' : 'Abrir menu'}
				aria-expanded={open}
				aria-controls="menu-mobile"
				onclick={() => (open = !open)}
			>
				<span
					class="absolute h-px w-4 bg-current transition-transform duration-300 {open
						? 'rotate-45'
						: '-translate-y-1'}"
				></span>
				<span
					class="absolute h-px w-4 bg-current transition-transform duration-300 {open
						? '-rotate-45'
						: 'translate-y-1'}"
				></span>
			</button>
		</div>
	</div>
</header>

<!-- menu mobile -->
<div
	id="menu-mobile"
	class="fixed inset-0 z-[85] flex flex-col justify-between overflow-hidden bg-ink px-6 pt-28 pb-10 text-paper transition-[clip-path] duration-700 ease-[cubic-bezier(.76,0,.24,1)] md:hidden"
	style="clip-path: {open ? 'circle(150% at 100% 0)' : 'circle(0% at calc(100% - 2.5rem) 2.25rem)'}"
	inert={!open}
>
	<div
		class="orb orb-deep drift-a -right-32 -bottom-32 h-[420px] w-[420px]"
		aria-hidden="true"
	></div>
	<nav class="relative flex flex-col gap-2" aria-label="Menu móvel">
		{#each links as l, i (l.href)}
			<a
				href={l.href}
				onclick={() => (open = false)}
				class="flex items-baseline gap-4 font-[family-name:var(--font-display)] text-5xl font-medium tracking-[-0.04em] transition-all duration-700 {open
					? 'translate-y-0 opacity-100'
					: 'translate-y-8 opacity-0'}"
				style="transition-delay: {open ? 150 + i * 60 : 0}ms"
			>
				<span class="font-mono text-xs tracking-widest text-accent">0{i + 1}</span>
				{l.label}
			</a>
		{/each}
	</nav>
	<div class="relative flex items-end justify-between">
		<div class="space-y-1 text-sm text-paper/60">
			<a href="mailto:vgtdevelopments@gmail.com" class="block text-paper"
				>vgtdevelopments@gmail.com</a
			>
			<p>Porto · Remoto</p>
		</div>
		<div class="flex items-end gap-2 text-paper">
			<Shape kind="triangle" size={18} />
			<Shape kind="circle" size={18} class="text-accent" />
			<Shape kind="square" size={18} />
		</div>
	</div>
</div>
