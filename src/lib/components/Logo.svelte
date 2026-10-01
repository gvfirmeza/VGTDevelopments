<script lang="ts">
	let { size = 28, showWordmark = true } = $props<{
		size?: number;
		showWordmark?: boolean;
	}>();

	const symbolRatio = 110 / 40;
</script>

<a href="/" class="logo group flex items-center gap-3" aria-label="VGT Developments, início">
	<svg
		width={size * symbolRatio}
		height={size}
		viewBox="0 0 110 40"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class="shrink-0 overflow-visible"
		aria-hidden="true"
	>
		<!-- triângulo -->
		<path class="tri" d="M0 38 L18 2 L36 38 Z" fill="currentColor" />
		<!-- círculo laranja -->
		<circle class="dot" cx="50" cy="20" r="18" fill="var(--color-accent)" />
		<!-- quadrado -->
		<rect class="sq" x="74" y="2" width="36" height="36" fill="currentColor" />
	</svg>

	{#if showWordmark}
		<span class="text-base leading-none font-medium tracking-tight">
			VGT <span class="font-normal opacity-55">Developments</span>
		</span>
	{/if}
</a>

<style>
	.logo svg :global(*) {
		transform-box: fill-box;
		transform-origin: center;
		transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	.logo:hover .tri {
		transform: rotate(120deg);
	}
	.logo:hover .dot {
		transform: translateY(-6px) scale(0.85);
		transition-delay: 0.05s;
	}
	.logo:hover .sq {
		transform: rotate(90deg) scale(0.9);
		transition-delay: 0.1s;
	}
</style>
