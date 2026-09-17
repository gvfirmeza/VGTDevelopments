<script lang="ts">
	let {
		words,
		typingSpeed = 70,
		deletingSpeed = 40,
		pause = 1600
	} = $props<{
		words: string[];
		typingSpeed?: number;
		deletingSpeed?: number;
		pause?: number;
	}>();

	let display = $state('');
	let wordIndex = $state(0);
	let charIndex = $state(0);
	let deleting = $state(false);

	$effect(() => {
		let timeout: ReturnType<typeof setTimeout>;

		const tick = () => {
			const current = words[wordIndex];
			if (!deleting) {
				display = current.slice(0, charIndex + 1);
				charIndex++;
				if (charIndex === current.length) {
					deleting = true;
					timeout = setTimeout(tick, pause);
					return;
				}
				timeout = setTimeout(tick, typingSpeed);
			} else {
				display = current.slice(0, charIndex - 1);
				charIndex--;
				if (charIndex === 0) {
					deleting = false;
					wordIndex = (wordIndex + 1) % words.length;
				}
				timeout = setTimeout(tick, deletingSpeed);
			}
		};

		timeout = setTimeout(tick, typingSpeed);
		return () => clearTimeout(timeout);
	});
</script>

<span class="text-accent">
	{display}<span
		class="ml-1 inline-block h-[0.85em] w-[3px] animate-pulse bg-accent align-[-0.05em]"
	></span>
</span>
