<script lang="ts">
	import Asterisk from './Asterisk.svelte';

	const words = [
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
	const items = [...words, ...words];
</script>

<section class="overflow-hidden border-y border-line bg-ink py-10 text-paper">
	<div class="marquee-track items-center gap-8">
		{#each items as w, i (i)}
			<span
				class="flex items-center gap-8 font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight whitespace-nowrap md:text-4xl"
			>
				{w}
				<Asterisk size={28} class="shrink-0 text-accent" />
			</span>
		{/each}
	</div>
</section>
