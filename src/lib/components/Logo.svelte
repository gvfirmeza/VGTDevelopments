<script lang="ts">
	let { size = 28, showWordmark = true } = $props<{
		size?: number;
		showWordmark?: boolean;
	}>();

	const symbolRatio = 110 / 40;
</script>

<a href="/" class="group flex items-center gap-3" aria-label="VGT Developments, início">
	<svg
		width={size * symbolRatio}
		height={size}
		viewBox="0 0 110 40"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class="shrink-0 transition-transform duration-300 group-hover:scale-105"
		aria-hidden="true"
	>
		<!-- triângulo -->
		<path d="M0 38 L18 2 L36 38 Z" fill="currentColor" />
		<!-- círculo laranja -->
		<circle cx="50" cy="20" r="18" fill="var(--color-accent)" />
		<!-- quadrado -->
		<rect x="74" y="2" width="36" height="36" fill="currentColor" />
	</svg>

	{#if showWordmark}
		<span class="text-base leading-none font-medium tracking-tight">
			VGT <span class="font-normal text-muted">Developments</span>
		</span>
	{/if}
</a>
