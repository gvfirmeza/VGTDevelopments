<script lang="ts">
	// as três formas do logo, reutilizadas como sistema visual
	type Kind = 'triangle' | 'circle' | 'square';

	let {
		kind,
		size = 24,
		outline = false,
		class: className = ''
	} = $props<{ kind: Kind; size?: number; outline?: boolean; class?: string }>();

	const stroke = $derived(outline ? 'currentColor' : 'none');
	const fill = $derived(outline ? 'none' : 'currentColor');
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 40 40"
	class={className}
	aria-hidden="true"
	overflow="visible"
>
	{#if kind === 'triangle'}
		<path
			d="M20 3 L38 37 L2 37 Z"
			{fill}
			{stroke}
			stroke-width="1"
			vector-effect="non-scaling-stroke"
		/>
	{:else if kind === 'circle'}
		<circle
			cx="20"
			cy="20"
			r="18"
			{fill}
			{stroke}
			stroke-width="1"
			vector-effect="non-scaling-stroke"
		/>
	{:else}
		<rect
			x="2"
			y="2"
			width="36"
			height="36"
			{fill}
			{stroke}
			stroke-width="1"
			vector-effect="non-scaling-stroke"
		/>
	{/if}
</svg>
