<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap, canHover, prefersReducedMotion, splitReveal } from '$lib/motion';
	import Reveal from './Reveal.svelte';

	// Substitui pelos teus projetos reais
	const projects = [
		{
			name: 'Mariana Barbetta',
			sector: 'Moda / E-commerce',
			result: 'Loja online de moda premium',
			url: 'https://marianabarbetta.com/',
			image: '/projects/mariana-barbetta.jpg'
		},
		{
			name: 'Next Step',
			sector: 'Coaching & Educação',
			result: 'Plataforma de acompanhamento de alunos',
			url: 'https://next-step-front.vercel.app/',
			image: '/projects/next-step.jpg'
		},
		{
			name: 'BetCopilot',
			sector: 'SaaS / Betting Tech',
			result: 'Copiloto de apostas com IA',
			url: 'https://betcopilot.vercel.app/',
			image: '/projects/betcopilot.jpg'
		}
	];

	const domain = (url: string) => new URL(url).hostname.replace(/^www\./, '');

	let list = $state<HTMLElement>();
	let preview = $state<HTMLElement>();
	let strip = $state<HTMLElement>();
	let active = $state(-1);

	onMount(() => {
		if (!canHover() || !list || !preview || !strip) return;
		const reduced = prefersReducedMotion();

		gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0, autoAlpha: 0 });
		const x = gsap.quickTo(preview, 'x', { duration: reduced ? 0 : 0.7, ease: 'power3.out' });
		const y = gsap.quickTo(preview, 'y', { duration: reduced ? 0 : 0.7, ease: 'power3.out' });
		const rot = gsap.quickTo(preview, 'rotate', { duration: 0.8, ease: 'power3.out' });
		let lastX = 0;

		const move = (e: PointerEvent) => {
			x(e.clientX);
			y(e.clientY);
			// inclina na direção do movimento
			rot(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6));
			lastX = e.clientX;
		};
		const enter = (e: PointerEvent) => {
			lastX = e.clientX;
			gsap.set(preview!, { x: e.clientX, y: e.clientY });
			gsap.to(preview!, { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'expo.out' });
		};
		const leave = () => {
			active = -1;
			gsap.to(preview!, { scale: 0, autoAlpha: 0, duration: 0.4, ease: 'expo.in' });
		};

		list.addEventListener('pointermove', move);
		list.addEventListener('pointerenter', enter);
		list.addEventListener('pointerleave', leave);
		return () => {
			list!.removeEventListener('pointermove', move);
			list!.removeEventListener('pointerenter', enter);
			list!.removeEventListener('pointerleave', leave);
		};
	});

	$effect(() => {
		if (active < 0 || !strip) return;
		gsap.to(strip, {
			yPercent: (-100 / projects.length) * active,
			duration: prefersReducedMotion() ? 0 : 0.8,
			ease: 'expo.out'
		});
	});
</script>

<section id="projetos" class="relative px-6 py-32 md:py-40">
	<div class="mx-auto max-w-7xl">
		<div class="mb-16 flex flex-wrap items-end justify-between gap-8 md:mb-24">
			<div>
				<Reveal>
					<p class="mb-6 font-mono text-xs tracking-[0.22em] text-muted uppercase">01 Projetos</p>
				</Reveal>
				<h2
					use:splitReveal
					class="max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[0.98] font-medium tracking-[-0.045em] md:text-7xl"
				>
					Trabalho entregue. <span class="text-muted">Nada de maquetes.</span>
				</h2>
			</div>
			<Reveal>
				<p class="font-mono text-xs tracking-[0.22em] text-muted uppercase">
					( {String(projects.length).padStart(2, '0')} ) Selecionados
				</p>
			</Reveal>
		</div>

		<div bind:this={list} class="projects border-t border-ink/15">
			{#each projects as p, i (p.name)}
				<a
					href={p.url}
					target="_blank"
					rel="noopener noreferrer"
					data-cursor-label="Ver ↗"
					onpointerenter={() => (active = i)}
					class="project group relative block border-b border-ink/15 py-8 transition-opacity duration-500 md:py-12"
				>
					<span
						class="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100"
					></span>
					<div class="grid items-baseline gap-4 md:grid-cols-12 md:gap-6">
						<p
							class="font-mono text-xs text-muted transition-colors group-hover:text-accent md:col-span-1"
						>
							0{i + 1}
						</p>
						<h3
							class="font-[family-name:var(--font-display)] text-4xl font-medium tracking-[-0.04em] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-3 md:col-span-6 md:text-6xl lg:text-7xl"
						>
							{p.name}
						</h3>
						<div class="md:col-span-4">
							<p class="text-base">{p.result}</p>
							<p class="mt-1 font-mono text-[11px] tracking-widest text-muted uppercase">
								{p.sector}
							</p>
						</div>
						<div class="hidden justify-end md:col-span-1 md:flex">
							<span
								class="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-lg transition-all duration-500 group-hover:-rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-paper"
								>→</span
							>
						</div>
					</div>

					<!-- mobile / touch: imagem inline -->
					<div class="mt-6 overflow-hidden rounded-xl border border-ink/10 md:hidden">
						<img
							src={p.image}
							alt="Página inicial de {p.name}"
							width="1440"
							height="900"
							loading="lazy"
							decoding="async"
							class="aspect-[16/9] w-full object-cover object-top"
						/>
					</div>
				</a>
			{/each}
		</div>
	</div>

	<!-- pré-visualização que segue o cursor (desktop) -->
	<div
		bind:this={preview}
		class="pointer-events-none invisible fixed top-0 left-0 z-[60] hidden w-[420px] md:block"
		aria-hidden="true"
	>
		<div
			class="overflow-hidden rounded-2xl bg-ink p-1.5 shadow-[0_40px_80px_-20px_rgba(17,18,20,.5)]"
		>
			<div class="flex items-center gap-1.5 px-3 py-2">
				<span class="h-2 w-2 rounded-full bg-paper/20"></span>
				<span class="h-2 w-2 rounded-full bg-paper/20"></span>
				<span class="h-2 w-2 rounded-full bg-accent"></span>
				<span class="ml-3 font-mono text-[10px] text-paper/50">
					{active >= 0 ? domain(projects[active].url) : ''}
				</span>
			</div>
			<div class="aspect-[16/9] overflow-hidden rounded-xl">
				<div bind:this={strip} class="flex flex-col">
					{#each projects as p (p.name)}
						<img
							src={p.image}
							alt=""
							width="1440"
							height="900"
							loading="lazy"
							decoding="async"
							class="aspect-[16/9] w-full object-cover object-top"
						/>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ao passar num projeto, os outros recuam */
	@media (hover: hover) {
		.projects:hover .project:not(:hover) {
			opacity: 0.35;
		}
	}
</style>
