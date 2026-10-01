<script lang="ts">
	import { splitReveal, tilt } from '$lib/motion';
	import Reveal from './Reveal.svelte';
	import Shape from './Shape.svelte';

	const services = [
		{
			kind: 'triangle',
			title: 'Websites institucionais',
			body: 'Sites que representam a empresa com clareza e funcionam em qualquer dispositivo. Pensados para durar, não para impressionar num screenshot.',
			tags: ['Design', 'SEO', 'Performance']
		},
		{
			kind: 'circle',
			title: 'Plataformas web',
			body: 'Aplicações à medida: áreas de cliente, painéis de gestão, integrações. Construídas para o uso real do dia-a-dia.',
			tags: ['Full stack', 'APIs', 'Base de dados']
		},
		{
			kind: 'square',
			title: 'UX/UI',
			body: 'Protótipos e interfaces desenhados antes de escrever uma linha de código. Evita retrabalho e más surpresas.',
			tags: ['Protótipos', 'Design system', 'Testes']
		}
	] as const;
</script>

<section id="servicos" class="relative overflow-hidden bg-surface px-6 py-32 md:py-40">
	<div class="dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true"></div>

	<div class="relative mx-auto max-w-7xl">
		<div class="mb-16 grid gap-8 md:mb-24 md:grid-cols-12">
			<div class="md:col-span-8">
				<Reveal>
					<p class="mb-6 font-mono text-xs tracking-[0.22em] text-muted uppercase">
						02 O que fazemos
					</p>
				</Reveal>
				<h2
					use:splitReveal
					class="font-[family-name:var(--font-display)] text-5xl leading-[0.98] font-medium tracking-[-0.045em] md:text-7xl"
				>
					Três formas de construir.
				</h2>
			</div>
			<div class="flex items-end md:col-span-4">
				<Reveal>
					<p class="leading-relaxed text-muted">
						Uma equipa pequena que cobre o ciclo completo — do primeiro esboço ao servidor em
						produção.
					</p>
				</Reveal>
			</div>
		</div>

		<div class="grid gap-5 md:grid-cols-3">
			{#each services as s, i (s.title)}
				<Reveal>
					<article
						use:tilt
						class="service group relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-3xl border border-ink/10 bg-paper p-8 transition-[border-color,box-shadow] duration-500 hover:border-ink/25 hover:shadow-[0_30px_60px_-30px_rgba(17,18,20,.35)] md:p-9"
					>
						<!-- foco de luz que segue o cursor -->
						<div
							class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
							style="background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(255 91 26 / 0.12), transparent 60%)"
							aria-hidden="true"
						></div>

						<div class="relative mb-auto flex items-start justify-between">
							<p class="font-mono text-xs text-accent">0{i + 1}</p>
							<div class="relative h-20 w-20" aria-hidden="true">
								<Shape
									kind={s.kind}
									size={80}
									outline
									class="shape-echo absolute inset-0 text-ink/20"
								/>
								<Shape
									kind={s.kind}
									size={80}
									class="shape-main absolute inset-0 {s.kind === 'circle'
										? 'text-accent'
										: 'text-ink'}"
								/>
							</div>
						</div>

						<div class="relative mt-16">
							<h3
								class="mb-4 font-[family-name:var(--font-display)] text-3xl font-medium tracking-[-0.03em]"
							>
								{s.title}
							</h3>
							<p class="mb-8 leading-relaxed text-muted">{s.body}</p>
							<div class="flex flex-wrap gap-2">
								{#each s.tags as t (t)}
									<span
										class="rounded-full border border-ink/10 px-3 py-1 font-mono text-[11px] tracking-widest text-muted uppercase transition-colors group-hover:border-ink/25"
									>
										{t}
									</span>
								{/each}
							</div>
						</div>
					</article>
				</Reveal>
			{/each}
		</div>
	</div>
</section>

<style>
	.service :global(.shape-main),
	.service :global(.shape-echo) {
		transition: transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
		transform-origin: center;
	}
	.service:hover :global(.shape-main) {
		transform: rotate(-90deg) scale(0.82);
	}
	.service:hover :global(.shape-echo) {
		transform: translate(12px, 12px) rotate(45deg);
	}
</style>
