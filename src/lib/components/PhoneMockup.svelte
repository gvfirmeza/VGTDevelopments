<script lang="ts">
	import { onMount } from 'svelte';

	const features = [
		{
			icon: '◆',
			title: 'Web Design',
			body: 'Sites institucionais e landing pages com foco em conversão.'
		},
		{
			icon: '▣',
			title: 'Plataformas',
			body: 'Aplicações web à medida: áreas de cliente e dashboards.'
		},
		{
			icon: '◇',
			title: 'UX/UI',
			body: 'Protótipos, design systems e interfaces testadas.'
		},
		{
			icon: '●',
			title: 'E-commerce',
			body: 'Lojas online com integrações de pagamento e stock.'
		}
	];

	let activeIndex = $state(0);
	onMount(() => {
		const id = setInterval(() => {
			activeIndex = (activeIndex + 1) % features.length;
		}, 2200);
		return () => clearInterval(id);
	});
</script>

<div class="relative mx-auto w-full max-w-[340px]">
	<!-- glow por trás -->
	<div
		class="pointer-events-none absolute -inset-12 rounded-full bg-accent/15 blur-[80px]"
		aria-hidden="true"
	></div>

	<!-- phone -->
	<div
		class="relative rotate-[3deg] rounded-[2.5rem] border border-line bg-ink p-3 shadow-[0_40px_80px_-30px_rgba(17,18,20,.5)] transition-transform duration-700 hover:rotate-0"
	>
		<!-- notch -->
		<div class="absolute top-3 left-1/2 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-ink"></div>

		<!-- ecrã -->
		<div class="relative aspect-[9/19] overflow-hidden rounded-[2rem] bg-[#0d0f12]">
			<div class="dot-grid absolute inset-0 opacity-[0.06]" aria-hidden="true"></div>

			<!-- header -->
			<div class="relative flex items-center justify-between px-6 pt-10 pb-4 text-paper/80">
				<span class="font-mono text-[10px] tracking-widest">VGT</span>
				<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-accent"></span>
			</div>

			<!-- título -->
			<div class="mb-6 px-6">
				<p class="mb-2 font-mono text-[9px] tracking-[0.25em] text-paper/40 uppercase">
					estúdio digital
				</p>
				<h3
					class="font-[family-name:var(--font-display)] text-2xl leading-tight font-medium text-paper"
				>
					O que construímos
				</h3>
			</div>

			<!-- features -->
			<div class="space-y-2 px-4">
				{#each features as f, i (f.title)}
					<div
						class="flex items-start gap-3 rounded-xl border px-3 py-3 transition-all duration-500 {i ===
						activeIndex
							? 'translate-x-0 border-accent/40 bg-accent/5'
							: 'translate-x-1 border-paper/5 bg-paper/[0.02] opacity-60'}"
					>
						<span class="mt-0.5 text-xs text-accent">{f.icon}</span>
						<div class="flex-1">
							<p class="mb-0.5 text-[11px] font-medium text-paper">{f.title}</p>
							<p class="text-[9px] leading-snug text-paper/40">{f.body}</p>
						</div>
					</div>
				{/each}
			</div>

			<!-- bottom home bar -->
			<div
				class="absolute bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-paper/30"
			></div>
		</div>
	</div>
</div>
