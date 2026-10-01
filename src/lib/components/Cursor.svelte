<script lang="ts">
	import { onMount } from 'svelte';
	import { canHover } from '$lib/motion';

	let dot = $state<HTMLElement>();
	let ring = $state<HTMLElement>();
	let label = $state('');

	onMount(() => {
		if (!canHover()) return;

		let mx = -100;
		let my = -100;
		let rx = mx;
		let ry = my;
		let raf: number;
		const cls = document.body.classList;

		const update = (target: Element | null) => {
			if (!target) return;
			const labelled = target.closest<HTMLElement>('[data-cursor-label]');
			label = labelled?.dataset.cursorLabel ?? '';
			cls.toggle('cursor-labelled', !!labelled);
			cls.toggle(
				'cursor-hover',
				!labelled && !!target.closest('a, button, input, textarea, label, [data-cursor]')
			);
		};
		const move = (e: PointerEvent) => {
			mx = e.clientX;
			my = e.clientY;
			cls.remove('cursor-hidden');
			update(e.target as Element);
		};
		// com scroll o elemento debaixo do cursor muda sem haver pointermove
		const scroll = () => update(document.elementFromPoint(mx, my));
		const out = () => cls.add('cursor-hidden');

		const loop = () => {
			rx += (mx - rx) * 0.16;
			ry += (my - ry) * 0.16;
			dot!.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
			ring!.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
			raf = requestAnimationFrame(loop);
		};

		window.addEventListener('pointermove', move, { passive: true });
		window.addEventListener('scroll', scroll, { passive: true });
		document.documentElement.addEventListener('pointerleave', out);
		raf = requestAnimationFrame(loop);
		return () => {
			window.removeEventListener('pointermove', move);
			window.removeEventListener('scroll', scroll);
			document.documentElement.removeEventListener('pointerleave', out);
			cancelAnimationFrame(raf);
		};
	});
</script>

<div class="cursor-dot" bind:this={dot} aria-hidden="true"></div>
<div class="cursor-ring" bind:this={ring} aria-hidden="true">
	<span class="cursor-label">{label}</span>
</div>
