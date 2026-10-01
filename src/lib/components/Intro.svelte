<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap, getLenis, prefersReducedMotion } from '$lib/motion';
	import { intro } from '$lib/intro.svelte';

	let root = $state<HTMLElement>();
	let show = $state(true);

	onMount(() => {
		const seen = document.documentElement.classList.contains('intro-seen');
		if (seen || prefersReducedMotion() || !root) {
			show = false;
			intro.done = true;
			getLenis()?.start();
			return;
		}

		getLenis()?.stop();
		const q = gsap.utils.selector(root);

		const tl = gsap.timeline({
			defaults: { ease: 'expo.out' },
			onComplete: () => {
				show = false;
				try {
					sessionStorage.setItem('vgt-intro', '1');
				} catch {
					/* modo privado: ignora */
				}
			}
		});

		tl.from(q('[data-shape]'), {
			yPercent: 120,
			rotate: (i: number) => [-40, 0, 40][i],
			duration: 0.9,
			stagger: 0.09
		})
			.from(q('[data-word]'), { yPercent: 110, duration: 0.8, stagger: 0.05 }, '-=0.5')
			.to(
				q('[data-shape]'),
				{
					yPercent: -140,
					rotate: (i: number) => [30, 0, -30][i],
					duration: 0.7,
					ease: 'expo.in',
					stagger: 0.05
				},
				'+=0.25'
			)
			.to(q('[data-word]'), { yPercent: -110, duration: 0.5, ease: 'expo.in' }, '<')
			.add(() => {
				intro.done = true;
				getLenis()?.start();
			}, '-=0.15')
			.to(root, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '-=0.3');

		return () => tl.kill();
	});
</script>

{#if show}
	<div
		bind:this={root}
		class="intro fixed inset-0 z-[300] flex flex-col items-center justify-center gap-8 bg-ink text-paper"
		aria-hidden="true"
	>
		<div class="flex items-end gap-4 overflow-hidden px-2 pt-2">
			<svg data-shape width="56" height="56" viewBox="0 0 40 40"
				><path d="M20 3 L38 37 L2 37 Z" fill="currentColor" /></svg
			>
			<svg data-shape width="56" height="56" viewBox="0 0 40 40"
				><circle cx="20" cy="20" r="19" fill="var(--color-accent)" /></svg
			>
			<svg data-shape width="56" height="56" viewBox="0 0 40 40"
				><rect x="2" y="2" width="36" height="36" fill="currentColor" /></svg
			>
		</div>
		<p class="flex gap-[0.35em] overflow-hidden font-mono text-xs tracking-[0.3em] uppercase">
			<span data-word class="inline-block">VGT</span>
			<span data-word class="inline-block text-paper/50">Developments</span>
		</p>
	</div>
{/if}
