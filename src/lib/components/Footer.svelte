<script lang="ts">
	import Logo from './Logo.svelte';
</script>

<footer class="border-t border-line px-6 py-12">
	<div
		class="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center"
	>
		<Logo size={16} />
		<p class="text-sm text-muted">
			© {new Date().getFullYear()} VGT Developments · Porto, Portugal
		</p>
	</div>
</footer>
