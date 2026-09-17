<script lang="ts">
	import Reveal from './Reveal.svelte';

	// Substitui pelos teus projetos reais
	const projects = [
		{ name: 'Cliente A', sector: 'Retalho', result: 'Loja online com +40% de conversão', url: '#' },
		{
			name: 'Cliente B',
			sector: 'Serviços',
			result: 'Website institucional e área de cliente',
			url: '#'
		},
		{
			name: 'Cliente C',
			sector: 'Indústria',
			result: 'Plataforma interna de gestão',
			url: '#'
		}
	];
</script>

<section id="projetos" class="px-6 py-32">
	<div class="mx-auto max-w-7xl">
		<Reveal>
			<p class="mb-6 font-mono text-xs tracking-[0.22em] text-muted uppercase">01 Projetos</p>
			<h2
				class="mb-20 max-w-3xl font-[family-name:var(--font-display)] text-4xl leading-[1.05] font-medium tracking-[-0.04em] md:text-6xl"
			>
				Trabalho entregue. Nada de maquetes.
			</h2>
		</Reveal>

		<div class="grid gap-px border border-line bg-line">
			{#each projects as p, i (p.name)}
				<Reveal>
					<a
						href={p.url}
						class="group grid gap-6 bg-paper px-6 py-10 transition-colors duration-500 hover:bg-ink hover:text-paper md:grid-cols-12 md:px-8"
					>
						<div class="font-mono text-xs text-muted group-hover:text-accent md:col-span-1">
							0{i + 1}
						</div>
						<div class="md:col-span-5">
							<h3 class="font-[family-name:var(--font-display)] text-3xl md:text-4xl">{p.name}</h3>
							<p class="mt-2 text-sm text-muted group-hover:text-paper/60">{p.sector}</p>
						</div>
						<div class="flex items-center md:col-span-5">
							<p class="text-base">{p.result}</p>
						</div>
						<div class="flex items-center justify-end md:col-span-1">
							<span
								class="text-2xl transition-transform group-hover:translate-x-1 group-hover:text-accent"
								>→</span
							>
						</div>
					</a>
				</Reveal>
			{/each}
		</div>
	</div>
</section>
