<script lang="ts">
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
	<div class="marquee-track items-center gap-12">
		{#each items as w, i (i)}
			<span class="font-[family-name:var(--font-display)] text-2xl whitespace-nowrap md:text-4xl">
				{w} <span class="mx-6 text-accent">✳</span>
			</span>
		{/each}
	</div>
</section>
