<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap, registerGsap, canHover, magnetic, prefersReducedMotion } from '$lib/motion';
	import { intro } from '$lib/intro.svelte';
	import WordRotator from './WordRotator.svelte';
	import HeroStage from './HeroStage.svelte';

	let section = $state<HTMLElement>();
	let copy = $state<HTMLElement>();
	let glow = $state<HTMLElement>();
	let hours = $state(24);
	let entered = false;

	const stats = [
		{ label: 'Onde estamos', value: 'Porto' },
		{ label: 'Onde trabalhamos', value: 'Remoto' },
		{ label: 'Resposta a pedidos', value: '24h', count: true },
		{ label: 'Desenvolvimento', value: 'Full-stack' }
	];

	onMount(() => {
		registerGsap();
		if (!section || prefersReducedMotion()) return;

		const ctx = gsap.context(() => {
			// o texto sobe mais devagar e desvanece ao sair
			gsap.to(copy!, {
				y: -120,
				opacity: 0.2,
				ease: 'none',
				scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true }
			});
		}, section);

		// luz que segue o cursor no fundo
		let off = () => {};
		if (canHover() && glow) {
			const x = gsap.quickTo(glow, 'x', { duration: 1.4, ease: 'power3.out' });
			const y = gsap.quickTo(glow, 'y', { duration: 1.4, ease: 'power3.out' });
			const move = (e: PointerEvent) => {
				const r = section!.getBoundingClientRect();
				x(e.clientX - r.left);
				y(e.clientY - r.top);
			};
			section.addEventListener('pointermove', move);
			off = () => section!.removeEventListener('pointermove', move);
		}

		return () => {
			ctx.revert();
			off();
		};
	});

	$effect(() => {
		if (!intro.done || !section || entered) return;
		entered = true;
		if (prefersReducedMotion()) return;

		const q = gsap.utils.selector(section);
		const counter = { v: 0 };
		hours = 0;
		const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
		tl.to(q('.hero-line > span'), { y: 0, duration: 1.4, stagger: 0.12 })
			.to(q('.hero-fade'), { opacity: 1, y: 0, duration: 1.2, stagger: 0.08 }, 0.35)
			.to(
				counter,
				{
					v: 24,
					duration: 1.6,
					ease: 'power2.out',
					onUpdate: () => (hours = Math.round(counter.v))
				},
				0.8
			);
	});
</script>

<section
	bind:this={section}
	id="topo"
	class="relative flex min-h-[100svh] flex-col overflow-x-clip px-6 pt-32 pb-10 md:pt-40"
>
	<!-- fundo -->
	<div
		class="dot-grid dot-grid-fade pointer-events-none absolute inset-0 opacity-70"
		aria-hidden="true"
	></div>
	<div class="pointer-events-none absolute inset-0" aria-hidden="true">
		<div class="orb orb-accent drift-a top-[-10%] left-[-15%] h-[780px] w-[780px]"></div>
		<div class="orb orb-warm drift-b right-[-20%] bottom-[-25%] h-[720px] w-[720px]"></div>
		<div
			bind:this={glow}
			class="orb orb-accent -top-[200px] -left-[200px] hidden h-[400px] w-[400px] opacity-60 md:block"
		></div>
	</div>

	<!-- composição das formas -->
	<HeroStage
		class="absolute top-[40px] -right-[110px] w-[290px] sm:top-[88px] sm:-right-[40px] sm:w-[360px] md:top-[120px] md:w-[440px] lg:top-1/2 lg:right-[3%] lg:w-[min(44vw,600px)] lg:-translate-y-[46%]"
	/>

	<div bind:this={copy} class="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col">
		<div class="hero-fade mb-8 flex items-center gap-3">
			<span class="relative flex h-2 w-2">
				<span class="absolute inset-0 animate-ping rounded-full bg-accent/60"></span>
				<span class="relative h-2 w-2 rounded-full bg-accent"></span>
			</span>
			<p class="font-mono text-xs tracking-[0.22em] text-muted uppercase">
				Estúdio digital · Porto · Remoto
			</p>
		</div>

		<h1
			class="max-w-[15ch] font-[family-name:var(--font-display)] text-[clamp(2.9rem,7.4vw,7.25rem)] leading-[0.92] font-medium tracking-[-0.05em]"
		>
			<span class="hero-line -mb-[0.12em] block overflow-hidden pb-[0.12em]"
				><span class="block">Criamos</span></span
			>
			<span class="hero-line -mb-[0.12em] block overflow-hidden pb-[0.12em]">
				<span class="block">
					<WordRotator
						words={[
							'websites.',
							'plataformas web.',
							'aplicações à medida.',
							'interfaces.',
							'produtos digitais.'
						]}
					/>
				</span>
			</span>
		</h1>

		<div class="mt-10 flex flex-col gap-10 md:mt-12 md:flex-row md:items-end md:justify-between">
			<p class="hero-fade max-w-md text-lg leading-relaxed text-muted">
				A VGT concebe websites e plataformas web para empresas portuguesas, do primeiro esboço à
				entrega em produção. Sediados no Porto, a trabalhar remotamente com todo o país.
			</p>
		</div>

		<div class="hero-fade mt-10 flex flex-wrap items-center gap-6">
			<a
				href="#contacto"
				use:magnetic
				class="group relative flex items-center gap-3 overflow-hidden rounded-full bg-ink py-2 pr-2 pl-7 text-sm font-medium text-paper"
			>
				<span
					class="absolute inset-0 translate-y-full rounded-full bg-accent transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0"
				></span>
				<span class="relative">Começar projeto</span>
				<span
					class="relative flex h-10 w-10 items-center justify-center rounded-full bg-accent transition-colors duration-500 group-hover:bg-ink"
				>
					<span class="transition-transform duration-500 group-hover:-rotate-45">→</span>
				</span>
			</a>
			<a href="#projetos" class="group flex items-center gap-2 text-sm">
				<span class="relative">
					Ver projetos
					<span
						class="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-100 bg-ink/30 transition-transform duration-500 group-hover:origin-left group-hover:scale-x-0"
					></span>
					<span
						class="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform delay-200 duration-500 group-hover:origin-left group-hover:scale-x-100"
					></span>
				</span>
				<span class="transition-transform duration-500 group-hover:translate-y-0.5">↓</span>
			</a>
		</div>

		<div class="mt-auto pt-20">
			<div class="grid grid-cols-2 gap-x-8 gap-y-8 border-t border-ink/10 pt-8 md:grid-cols-4">
				{#each stats as s (s.label)}
					<div class="hero-fade">
						<p class="mb-2 font-mono text-[10px] tracking-widest text-muted uppercase">{s.label}</p>
						<p class="text-3xl font-medium tracking-tight">
							{#if s.count}{hours}h{:else}{s.value}{/if}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- indicador de scroll -->
	<div
		class="hero-fade absolute right-6 bottom-10 z-10 hidden flex-col items-center gap-3 2xl:flex"
		aria-hidden="true"
	>
		<span
			class="font-mono text-[10px] tracking-[0.3em] text-muted uppercase [writing-mode:vertical-rl]"
			>Scroll</span
		>
		<span class="relative h-14 w-px overflow-hidden bg-ink/15">
			<span class="scroll-cue absolute top-0 left-0 h-1/2 w-full bg-accent"></span>
		</span>
	</div>
</section>

<style>
	@keyframes cue {
		from {
			transform: translateY(-100%);
		}
		to {
			transform: translateY(200%);
		}
	}
	.scroll-cue {
		animation: cue 1.8s cubic-bezier(0.65, 0, 0.35, 1) infinite;
	}
</style>
