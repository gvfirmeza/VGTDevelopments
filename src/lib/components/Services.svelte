<script lang="ts">
	import Reveal from './Reveal.svelte';

	const services = [
		{
			title: 'Websites institucionais',
			body: 'Sites que representam a empresa com clareza e funcionam em qualquer dispositivo. Pensados para durar, não para impressionar num screenshot.',
			tags: ['Design', 'SEO', 'Performance']
		},
		{
			title: 'Plataformas web',
			body: 'Aplicações à medida — áreas de cliente, painéis de gestão, integrações. Construídas para o uso real do dia-a-dia.',
			tags: ['Full stack', 'APIs', 'Base de dados']
		},
		{
			title: 'UX/UI',
			body: 'Protótipos e interfaces desenhados antes de escrever uma linha de código. Evita retrabalho e más surpresas.',
			tags: ['Protótipos', 'Design system', 'Testes']
		}
	];
</script>

<section id="servicos" class="bg-surface px-6 py-32">
	<div class="mx-auto max-w-7xl">
		<Reveal>
			<p class="mb-6 font-mono text-xs tracking-[0.22em] text-muted uppercase">
				02 — O que fazemos
			</p>
		</Reveal>

		<div class="mt-16 grid gap-8 md:grid-cols-3">
			{#each services as s, i (s.title)}
				<Reveal>
					<article
						class="group h-full rounded-2xl border border-line bg-paper p-8 transition-all duration-500 hover:-translate-y-1 hover:border-ink hover:shadow-[0_20px_40px_-20px_rgba(17,18,20,.25)]"
					>
						<p class="mb-8 font-mono text-xs text-accent">0{i + 1}</p>
						<h3 class="mb-4 font-[family-name:var(--font-display)] text-3xl">{s.title}</h3>
						<p class="mb-8 leading-relaxed text-muted">{s.body}</p>
						<div class="flex flex-wrap gap-2">
							{#each s.tags as t (t)}
								<span
									class="rounded-full border border-line px-3 py-1 font-mono text-[11px] tracking-widest text-muted uppercase group-hover:border-ink/20"
								>
									{t}
								</span>
							{/each}
						</div>
					</article>
				</Reveal>
			{/each}
		</div>
	</div>
</section>
