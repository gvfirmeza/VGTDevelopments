<script lang="ts">
	import { onMount } from 'svelte';

	let dot = $state<HTMLElement>();
	let ring = $state<HTMLElement>();

	onMount(() => {
		let mx = window.innerWidth / 2;
		let my = window.innerHeight / 2;
		let rx = mx;
		let ry = my;
		let raf: number;

		const move = (e: MouseEvent) => {
			mx = e.clientX;
			my = e.clientY;
			const target = e.target as HTMLElement;
			const interactive = target.closest('a, button, input, textarea, [data-cursor]');
			document.body.classList.toggle('cursor-hover', !!interactive);
		};

		const loop = () => {
			rx += (mx - rx) * 0.18;
			ry += (my - ry) * 0.18;
			dot!.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
			ring!.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
			raf = requestAnimationFrame(loop);
		};

		window.addEventListener('mousemove', move);
		raf = requestAnimationFrame(loop);
		return () => {
			window.removeEventListener('mousemove', move);
			cancelAnimationFrame(raf);
		};
	});
</script>

<div class="cursor-dot" bind:this={dot}></div>
<div class="cursor-ring" bind:this={ring}></div>
