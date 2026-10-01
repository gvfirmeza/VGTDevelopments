<script lang="ts">
	import { onMount } from 'svelte';
	import {
		gsap,
		ScrollTrigger,
		registerGsap,
		parallax,
		prefersReducedMotion,
		splitReveal
	} from '$lib/motion';
	import Reveal from './Reveal.svelte';

	const steps = [
		{
			n: '01',
			title: 'Conversa inicial',
			body: 'Percebemos o que precisa, o que já existe e o que faz sentido.'
		},
		{
			n: '02',
			title: 'Proposta e âmbito',
			body: 'Âmbito fechado, prazo claro, valor definido. Sem surpresas.'
		},
		{
			n: '03',
			title: 'Desenvolvimento',
			body: 'Entregas parciais para acompanhar o progresso, não um bloco opaco no fim.'
		},
		{
			n: '04',
			title: 'Entrega e acompanhamento',
			body: 'Publicação, formação breve e suporte no arranque.'
		}
	];

	let timeline = $state<HTMLElement>();
	let current = $state(0);

	onMount(() => {
		registerGsap();
		if (!timeline) return;
		const items = [...timeline.querySelectorAll<HTMLElement>('[data-step]')];

		// passo ativo = o que atravessa o centro do ecrã
		const triggers = items.map((el, i) =>
			ScrollTrigger.create({
				trigger: el,
				start: 'top 60%',
				end: 'bottom 60%',
				onToggle: (self) => self.isActive && (current = i)
			})
		);

		let fill: gsap.core.Tween | undefined;
		if (!prefersReducedMotion()) {
			fill = gsap.fromTo(
				timeline.querySelector('[data-fill]'),
				{ scaleY: 0 },
				{
					scaleY: 1,
					ease: 'none',
					scrollTrigger: { trigger: timeline, start: 'top 60%', end: 'bottom 60%', scrub: true }
				}
			);
		}

		return () => {
			triggers.forEach((t) => t.kill());
			fill?.scrollTrigger?.kill();
			fill?.kill();
		};
	});
</script>

<section
	id="processo"
	data-nav="dark"
	class="relative overflow-hidden bg-ink px-6 py-32 text-paper md:py-40"
>
	<div
		class="dot-grid pointer-events-none absolute inset-0 opacity-[0.07]"
		aria-hidden="true"
	></div>
	<div
		use:parallax={{ y: 160 }}
		class="orb orb-deep -top-40 -right-40 h-[620px] w-[620px]"
		aria-hidden="true"
	></div>
	<div
		use:parallax={{ y: -120 }}
		class="orb orb-accent bottom-0 -left-60 h-[520px] w-[520px] opacity-60"
		aria-hidden="true"
	></div>

	<div class="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-12">
		<div class="lg:col-span-5">
			<div class="lg:sticky lg:top-32">
				<Reveal>
					<p class="mb-6 font-mono text-xs tracking-[0.22em] text-accent uppercase">
						03 Como trabalhamos
					</p>
				</Reveal>
				<h2
					use:splitReveal
					class="font-[family-name:var(--font-display)] text-5xl leading-[0.98] font-medium tracking-[-0.045em] md:text-7xl"
				>
					Um processo simples, sem ruído.
				</h2>

				<!-- contador grande do passo atual -->
				<div class="mt-14 hidden items-end gap-4 lg:flex" aria-hidden="true">
					<div class="relative h-[7.5rem] overflow-hidden">
						<div
							class="transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
							style="transform: translateY(-{current * 7.5}rem)"
						>
							{#each steps as s (s.n)}
								<p
									class="text-outline h-[7.5rem] font-[family-name:var(--font-display)] text-[7.5rem] leading-none font-medium tracking-[-0.05em] text-paper/60"
								>
									{s.n}
								</p>
							{/each}
						</div>
					</div>
					<p class="mb-3 font-mono text-xs tracking-[0.22em] text-paper/40 uppercase">
						/ 0{steps.length}
					</p>
				</div>
			</div>
		</div>

		<div bind:this={timeline} class="relative lg:col-span-6 lg:col-start-7">
			<!-- linha de progresso -->
			<div class="absolute top-2 bottom-2 left-[11px] w-px bg-paper/15" aria-hidden="true">
				<div data-fill class="h-full w-full origin-top bg-accent"></div>
			</div>

			<ol class="space-y-20 md:space-y-28">
				{#each steps as s, i (s.n)}
					<li data-step class="relative pl-14">
						<span
							class="absolute top-1 left-0 flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-500 {i <=
							current
								? 'border-accent bg-accent'
								: 'border-paper/25 bg-ink'}"
							aria-hidden="true"
						>
							<span
								class="h-1.5 w-1.5 rounded-full transition-colors duration-500 {i <= current
									? 'bg-ink'
									: 'bg-paper/30'}"
							></span>
						</span>
						<Reveal>
							<p class="mb-4 font-mono text-xs text-accent">{s.n}</p>
							<h3
								class="mb-4 font-[family-name:var(--font-display)] text-3xl font-medium tracking-[-0.03em] transition-colors duration-500 md:text-4xl {i <=
								current
									? 'text-paper'
									: 'text-paper/45'}"
							>
								{s.title}
							</h3>
							<p class="max-w-md text-lg leading-relaxed text-paper/60">{s.body}</p>
						</Reveal>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>
