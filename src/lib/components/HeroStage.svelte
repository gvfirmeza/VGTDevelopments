<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap, ScrollTrigger, registerGsap, canHover, prefersReducedMotion } from '$lib/motion';
	import { intro } from '$lib/intro.svelte';

	let { class: className = '' } = $props<{ class?: string }>();

	let stage = $state<HTMLElement>();
	let ready = false;

	onMount(() => {
		registerGsap();
		if (!stage) return;
		const q = gsap.utils.selector(stage);
		const reduced = prefersReducedMotion();
		const ctx = gsap.context(() => {}, stage);
		const cleanups: (() => void)[] = [];

		if (!reduced) {
			ctx.add(() => {
				// parallax de scroll: cada forma foge a uma velocidade diferente
				const scrub = {
					trigger: stage!.closest('section'),
					start: 'top top',
					end: 'bottom top',
					scrub: 0.6
				};
				gsap.to(q('[data-s="orb"]'), { y: 140, scale: 0.88, ease: 'none', scrollTrigger: scrub });
				gsap.to(q('[data-s="tri"]'), { y: -180, rotate: -45, ease: 'none', scrollTrigger: scrub });
				gsap.to(q('[data-s="sq"]'), { y: -300, rotate: 60, ease: 'none', scrollTrigger: scrub });
				gsap.to(q('[data-s="rings"]'), { rotate: 35, ease: 'none', scrollTrigger: scrub });
				gsap.to(q('[data-s="bits"]'), { y: -420, ease: 'none', scrollTrigger: scrub });
			});

			// parallax do rato: profundidade por camada
			if (canHover()) {
				const layers = q('[data-depth]').map((el) => ({
					depth: Number((el as HTMLElement).dataset.depth),
					x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3.out' }),
					y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3.out' })
				}));
				const move = (e: PointerEvent) => {
					const nx = e.clientX / window.innerWidth - 0.5;
					const ny = e.clientY / window.innerHeight - 0.5;
					for (const l of layers) {
						l.x(nx * 60 * l.depth);
						l.y(ny * 60 * l.depth);
					}
				};
				window.addEventListener('pointermove', move, { passive: true });
				cleanups.push(() => window.removeEventListener('pointermove', move));
			}
		}

		return () => {
			ctx.revert();
			cleanups.forEach((fn) => fn());
		};
	});

	// entrada: só depois de a intro sair
	$effect(() => {
		if (!intro.done || !stage || ready) return;
		ready = true;
		const q = gsap.utils.selector(stage);
		gsap.set(stage, { opacity: 1 });
		if (prefersReducedMotion()) return;

		const tl = gsap.timeline({ delay: 0.15 });
		tl.from(q('[data-in="orb"]'), { scale: 0, duration: 1.6, ease: 'elastic.out(1, 0.6)' })
			.from(
				q('[data-in="ring"]'),
				{ strokeDashoffset: 1600, duration: 2, ease: 'expo.out', stagger: 0.15 },
				0.1
			)
			.from(
				q('[data-in="tri"]'),
				{ yPercent: -80, rotate: -90, opacity: 0, duration: 1.4, ease: 'expo.out' },
				0.25
			)
			.from(
				q('[data-in="sq"]'),
				{ yPercent: 80, rotate: 90, opacity: 0, duration: 1.4, ease: 'expo.out' },
				0.35
			)
			.from(
				q('[data-in="bit"]'),
				{ scale: 0, opacity: 0, duration: 0.8, ease: 'back.out(3)', stagger: 0.06 },
				0.6
			)
			.from(
				q('[data-in="note"]'),
				{ opacity: 0, x: -12, duration: 0.8, ease: 'expo.out', stagger: 0.1 },
				0.9
			);
		ScrollTrigger.refresh();
	});
</script>

<div
	bind:this={stage}
	class="hero-stage pointer-events-none aspect-square {className}"
	aria-hidden="true"
>
	<!-- órbitas -->
	<div data-s="rings" class="absolute inset-0">
		<div data-depth="0.25" class="absolute inset-0">
			<svg viewBox="0 0 600 600" class="spin-slow absolute inset-0 h-full w-full overflow-visible">
				<ellipse
					data-in="ring"
					cx="320"
					cy="300"
					rx="270"
					ry="120"
					transform="rotate(-24 320 300)"
					fill="none"
					stroke="currentColor"
					stroke-opacity="0.16"
					stroke-dasharray="1600"
				/>
				<circle
					cx="590"
					cy="300"
					r="6"
					fill="var(--color-accent)"
					transform="rotate(-24 320 300)"
				/>
			</svg>
			<svg
				viewBox="0 0 600 600"
				class="spin-slower absolute inset-0 h-full w-full overflow-visible"
			>
				<ellipse
					data-in="ring"
					cx="320"
					cy="300"
					rx="230"
					ry="230"
					fill="none"
					stroke="currentColor"
					stroke-opacity="0.1"
					stroke-dasharray="4 8"
				/>
				<circle cx="320" cy="70" r="4" fill="currentColor" />
			</svg>
		</div>
	</div>

	<!-- esfera (o círculo do logo) -->
	<div data-s="orb" class="absolute top-[24%] left-[30%] w-[50%]">
		<div data-depth="0.5">
			<div class="float-slow">
				<div data-in="orb" class="relative aspect-square">
					<div class="orb orb-deep absolute -inset-[35%]"></div>
					<div class="sphere absolute inset-0"></div>
				</div>
			</div>
		</div>
	</div>

	<!-- triângulo -->
	<div data-s="tri" class="absolute top-[6%] left-[2%] w-[36%]">
		<div data-depth="1">
			<div class="float" style="animation-delay: -2s">
				<div data-in="tri" class="relative">
					<svg
						viewBox="0 0 100 90"
						class="absolute inset-0 translate-x-[9%] translate-y-[7%] overflow-visible text-ink/25"
					>
						<path
							d="M50 2 L98 88 L2 88 Z"
							fill="none"
							stroke="currentColor"
							vector-effect="non-scaling-stroke"
						/>
					</svg>
					<svg
						viewBox="0 0 100 90"
						class="relative -rotate-[10deg] overflow-visible drop-shadow-[0_30px_40px_rgba(17,18,20,.28)]"
					>
						<defs>
							<linearGradient id="tri-g" x1="0" y1="0" x2="1" y2="1">
								<stop offset="0" stop-color="#2a2c31" />
								<stop offset="1" stop-color="#0b0c0e" />
							</linearGradient>
						</defs>
						<path d="M50 2 L98 88 L2 88 Z" fill="url(#tri-g)" />
					</svg>
				</div>
			</div>
		</div>
	</div>

	<!-- quadrado -->
	<div data-s="sq" class="absolute right-[2%] bottom-[8%] w-[27%]">
		<div data-depth="1.35">
			<div class="float" style="animation-delay: -4.5s">
				<div data-in="sq" class="relative aspect-square">
					<div
						class="absolute inset-0 translate-x-[-12%] translate-y-[12%] rotate-[14deg] border border-ink/25"
					></div>
					<div
						class="absolute inset-0 rotate-[14deg] bg-[linear-gradient(135deg,#2a2c31,#0b0c0e)] shadow-[0_30px_50px_-10px_rgba(17,18,20,.35)]"
					></div>
				</div>
			</div>
		</div>
	</div>

	<!-- detalhes soltos (profundidade extra) -->
	<div data-s="bits" class="absolute inset-0">
		<div data-depth="1.9" class="absolute inset-0">
			<span data-in="bit" class="absolute top-[14%] right-[18%] h-3 w-3 rounded-full bg-accent"
			></span>
			<span
				data-in="bit"
				class="absolute bottom-[30%] left-[10%] h-4 w-4 rotate-12 border border-ink/50"
			></span>
			<span data-in="bit" class="absolute right-[34%] bottom-[10%] h-2 w-2 rounded-full bg-ink"
			></span>
			<svg data-in="bit" viewBox="0 0 20 18" class="absolute top-[56%] right-[6%] w-5 text-accent">
				<path d="M10 1 L19 17 L1 17 Z" fill="none" stroke="currentColor" />
			</svg>
		</div>
	</div>

	<!-- anotações: as três formas = as três fases -->
	<div
		class="absolute inset-0 hidden font-mono text-[10px] tracking-[0.2em] text-muted uppercase xl:block"
	>
		<p data-in="note" class="absolute top-[8%] left-[40%] flex items-center gap-2">
			<span class="h-px w-8 bg-ink/30"></span>01 Design
		</p>
		<p data-in="note" class="absolute top-[78%] left-[22%] flex items-center gap-2">
			<span class="h-px w-8 bg-ink/30"></span>02 Código
		</p>
		<p data-in="note" class="absolute right-[0%] bottom-[2%] flex items-center gap-2">
			<span class="h-px w-8 bg-ink/30"></span>03 Deploy
		</p>
	</div>
</div>
