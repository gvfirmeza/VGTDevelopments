<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap, prefersReducedMotion } from '$lib/motion';

	let { words, interval = 2600 } = $props<{ words: string[]; interval?: number }>();

	let root = $state<HTMLElement>();
	let index = $state(0);

	// cada palavra partida em grupos (palavras) e letras, para animar letra a letra
	const parts = $derived(words.map((w: string) => w.split(' ').map((p) => [...p])));

	onMount(() => {
		if (!root) return;
		const items = [...root.querySelectorAll<HTMLElement>('[data-item]')];
		const chars = items.map((el) => el.querySelectorAll('[data-char]'));
		const reduced = prefersReducedMotion();

		gsap.set(items, { autoAlpha: 0 });
		gsap.set(items[0], { autoAlpha: 1 });

		const id = setInterval(() => {
			const prev = index;
			const next = (index + 1) % words.length;
			index = next;

			if (reduced) {
				gsap.set(items[prev], { autoAlpha: 0 });
				gsap.set(items[next], { autoAlpha: 1 });
				return;
			}

			gsap.to(chars[prev], {
				yPercent: -110,
				duration: 0.5,
				ease: 'expo.in',
				stagger: 0.015,
				onComplete: () => gsap.set(items[prev], { autoAlpha: 0 })
			});
			gsap.set(items[next], { autoAlpha: 1 });
			gsap.fromTo(
				chars[next],
				{ yPercent: 110 },
				{ yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.022, delay: 0.35 }
			);
		}, interval);

		return () => clearInterval(id);
	});
</script>

<span class="sr-only">{words.join(', ')}</span>
<span bind:this={root} class="grid text-accent" aria-hidden="true">
	{#each parts as groups, w (w)}
		<span data-item class="col-start-1 row-start-1 {w === 0 ? '' : 'invisible'}">
			{#each groups as letters, g (g)}
				<!-- grupos são inline-flex: quebram linha entre si sem precisar de espaço -->
				<span
					class="inline-flex overflow-hidden pb-[0.08em] whitespace-nowrap {g < groups.length - 1
						? 'mr-[0.24em]'
						: ''}"
				>
					{#each letters as ch, c (c)}
						<span data-char class="inline-block">{ch}</span>
					{/each}
				</span>
			{/each}
		</span>
	{/each}
</span>
