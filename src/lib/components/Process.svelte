<script lang="ts">
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
</script>

<section id="processo" class="relative overflow-hidden bg-ink px-6 py-32 text-paper">
	<div
		class="dot-grid pointer-events-none absolute inset-0 opacity-[0.08]"
		aria-hidden="true"
	></div>
	<div
		class="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[140px]"
		aria-hidden="true"
	></div>

	<div class="relative mx-auto max-w-7xl">
		<Reveal>
			<p class="mb-6 font-mono text-xs tracking-[0.22em] text-accent uppercase">
				03 Como trabalhamos
			</p>
			<h2
				class="mb-20 max-w-3xl font-[family-name:var(--font-display)] text-4xl leading-[1.05] font-medium tracking-[-0.04em] md:text-6xl"
			>
				Um processo simples, sem ruído.
			</h2>
		</Reveal>

		<div class="grid gap-x-16 gap-y-16 md:grid-cols-2">
			{#each steps as s (s.n)}
				<Reveal>
					<div
						class="group border-t border-paper/15 pt-8 transition-colors duration-500 hover:border-accent"
					>
						<p class="mb-4 font-mono text-xs text-accent">{s.n}</p>
						<h3 class="mb-4 text-2xl md:text-3xl">{s.title}</h3>
						<p class="leading-relaxed text-paper/60">{s.body}</p>
					</div>
				</Reveal>
			{/each}
		</div>
	</div>
</section>
