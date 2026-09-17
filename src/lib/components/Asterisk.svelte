<script lang="ts">
	let { size = 24, class: className = '' } = $props<{
		size?: number;
		class?: string;
	}>();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class={className}
	aria-hidden="true"
>
	<path
		d="M12 1.5 L13.6 8.4 L19.5 4.5 L15.6 10.4 L22.5 12 L15.6 13.6 L19.5 19.5 L13.6 15.6 L12 22.5 L10.4 15.6 L4.5 19.5 L8.4 13.6 L1.5 12 L8.4 10.4 L4.5 4.5 L10.4 8.4 Z"
		fill="currentColor"
	/>
</svg>
