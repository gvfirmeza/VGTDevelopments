<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from '$lib/motion';
	import Shape from './Shape.svelte';

	const stack = [
		'Svelte',
		'TypeScript',
		'Node',
		'Postgres',
		'UX/UI',
		'Tailwind',
		'Vercel',
		'APIs',
		'Performance',
		'Acessibilidade'
	];
	const phases = Array.from({ length: 4 }, () => ['Design', 'Código', 'Deploy']).flat();
	const kinds = ['triangle', 'circle', 'square'] as const;

	let rowA = $state<HTMLElement>();
	let rowB = $state<HTMLElement>();

	onMount(() => {
		registerGsap();
		if (prefersReducedMotion() || !rowA || !rowB) return;

		// cada fila tem o conteúdo duplicado: andar de 0 a -50% dá um loop perfeito
		const wrap = gsap.utils.wrap(-50, 0);
		let xA = 0;
		let xB = -25;
		let dir = 1;
		let boost = 0;

		const st = ScrollTrigger.create({
			onUpdate: (self) => {
				dir = self.direction;
				boost = Math.min(Math.abs(self.getVelocity()) / 220, 9);
			}
		});

		const tick = (_t: number, dt: number) => {
			boost *= 0.92;
			const step = (0.012 + boost * 0.02) * dt * 0.1 * dir;
			xA = wrap(xA - step);
			xB = wrap(xB + step);
			gsap.set(rowA!, { xPercent: xA });
			gsap.set(rowB!, { xPercent: xB });
		};
		gsap.ticker.add(tick);

		return () => {
			gsap.ticker.remove(tick);
			st.kill();
		};
	});
</script>

<section
	class="relative overflow-hidden py-20 md:py-28"
	aria-label="Tecnologias e fases de trabalho"
>
	<!-- fita laranja (atrás) -->
	<div class="relative z-0 -mx-10 rotate-[2.5deg] bg-accent py-4 text-ink">
		<div bind:this={rowB} class="flex w-max will-change-transform">
			{#each [0, 1] as copy (copy)}
				<div class="flex shrink-0 items-center" aria-hidden={copy === 1}>
					{#each phases as p, i (i)}
						<span
							class="flex items-center gap-6 pr-6 font-mono text-sm tracking-[0.25em] whitespace-nowrap uppercase md:text-base"
						>
							{p}
							<Shape kind={kinds[i % 3]} size={12} />
						</span>
					{/each}
				</div>
			{/each}
		</div>
	</div>

	<!-- fita escura (à frente) -->
	<div
		class="relative z-10 -mx-10 -mt-12 -rotate-[2deg] bg-ink py-7 text-paper shadow-[0_30px_60px_-30px_rgba(17,18,20,.6)] md:-mt-14 md:py-9"
	>
		<div bind:this={rowA} class="flex w-max will-change-transform">
			{#each [0, 1] as copy (copy)}
				<div class="flex shrink-0 items-center" aria-hidden={copy === 1}>
					{#each stack as w, i (w)}
						<span
							class="flex items-center gap-8 pr-8 font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight whitespace-nowrap md:text-5xl"
						>
							{w}
							<Shape
								kind={kinds[i % 3]}
								size={22}
								class="shrink-0 {i % 3 === 1 ? 'text-accent' : 'text-paper/35'}"
							/>
						</span>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</section>
