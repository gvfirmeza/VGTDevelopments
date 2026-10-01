import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

let registered = false;
let lenis: Lenis | null = null;

export { gsap, ScrollTrigger, SplitText };

export const prefersReducedMotion = () =>
	typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const canHover = () =>
	typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export function registerGsap() {
	if (registered || typeof window === 'undefined') return;
	gsap.registerPlugin(ScrollTrigger, SplitText);
	registered = true;
}

export const getLenis = () => lenis;

/** Smooth scroll (Lenis) sincronizado com o ScrollTrigger. Devolve a função de limpeza. */
export function initSmoothScroll() {
	registerGsap();
	if (prefersReducedMotion()) return () => {};

	lenis = new Lenis({ lerp: 0.1, anchors: { offset: -16 }, autoRaf: false });
	lenis.on('scroll', ScrollTrigger.update);
	const tick = (time: number) => lenis?.raf(time * 1000);
	gsap.ticker.add(tick);
	gsap.ticker.lagSmoothing(0);

	// recalcula posições quando as fontes terminam de carregar
	document.fonts?.ready.then(() => ScrollTrigger.refresh());

	return () => {
		gsap.ticker.remove(tick);
		lenis?.destroy();
		lenis = null;
	};
}

/* ------------------------------------------------------------------ */
/* actions                                                             */
/* ------------------------------------------------------------------ */

type SplitOpts = { delay?: number; stagger?: number; start?: string };

/** Títulos que sobem linha a linha por trás de uma máscara ao entrar no ecrã. */
export function splitReveal(node: HTMLElement, opts: SplitOpts = {}) {
	registerGsap();
	if (prefersReducedMotion()) return;

	const split = SplitText.create(node, {
		type: 'lines',
		mask: 'lines',
		autoSplit: true,
		onSplit: (self) => {
			// a máscara corta descendentes (g, p, q): dá-lhe folga sem mexer no layout
			gsap.set(self.masks, { paddingBottom: '0.14em', marginBottom: '-0.14em' });
			return gsap.from(self.lines, {
				yPercent: 110,
				rotate: 2,
				duration: 1.2,
				ease: 'expo.out',
				stagger: opts.stagger ?? 0.09,
				delay: opts.delay ?? 0,
				scrollTrigger: { trigger: node, start: opts.start ?? 'top 88%', once: true }
			});
		}
	});

	return { destroy: () => split.revert() };
}

/** Texto que "acende" palavra a palavra com o scroll. */
export function scrubWords(node: HTMLElement) {
	registerGsap();
	if (prefersReducedMotion()) return;

	const split = SplitText.create(node, { type: 'words' });
	const tween = gsap.fromTo(
		split.words,
		{ opacity: 0.14 },
		{
			opacity: 1,
			ease: 'none',
			stagger: 0.1,
			scrollTrigger: { trigger: node, start: 'top 80%', end: 'bottom 45%', scrub: true }
		}
	);

	return {
		destroy: () => {
			tween.scrollTrigger?.kill();
			tween.kill();
			split.revert();
		}
	};
}

type ParallaxOpts = { y?: number; rotate?: number; scale?: number; trigger?: string };

/** Parallax ligado ao scroll: desloca o elemento enquanto o trigger atravessa o ecrã. */
export function parallax(node: HTMLElement, opts: ParallaxOpts = {}) {
	registerGsap();
	if (prefersReducedMotion()) return;

	const trigger = (opts.trigger && node.closest(opts.trigger)) || node;
	const tween = gsap.fromTo(
		node,
		{ y: -(opts.y ?? 80), rotate: -(opts.rotate ?? 0), scale: 1 },
		{
			y: opts.y ?? 80,
			rotate: opts.rotate ?? 0,
			scale: opts.scale ?? 1,
			ease: 'none',
			scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: true }
		}
	);

	return {
		destroy: () => {
			tween.scrollTrigger?.kill();
			tween.kill();
		}
	};
}

/** Botão magnético: segue ligeiramente o cursor quando está por perto. */
export function magnetic(node: HTMLElement, strength = 0.35) {
	if (!canHover() || prefersReducedMotion()) return;

	const xTo = gsap.quickTo(node, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
	const yTo = gsap.quickTo(node, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });

	const move = (e: PointerEvent) => {
		const r = node.getBoundingClientRect();
		xTo((e.clientX - (r.left + r.width / 2)) * strength);
		yTo((e.clientY - (r.top + r.height / 2)) * strength);
	};
	const leave = () => {
		xTo(0);
		yTo(0);
	};

	node.addEventListener('pointermove', move);
	node.addEventListener('pointerleave', leave);
	return {
		destroy: () => {
			node.removeEventListener('pointermove', move);
			node.removeEventListener('pointerleave', leave);
		}
	};
}

/** Cartão com inclinação 3D e foco de luz que segue o cursor (vars --mx / --my). */
export function tilt(node: HTMLElement, max = 6) {
	if (!canHover() || prefersReducedMotion()) return;

	gsap.set(node, { transformPerspective: 900 });
	const rx = gsap.quickTo(node, 'rotationX', { duration: 0.5, ease: 'power3.out' });
	const ry = gsap.quickTo(node, 'rotationY', { duration: 0.5, ease: 'power3.out' });

	const move = (e: PointerEvent) => {
		const r = node.getBoundingClientRect();
		const px = (e.clientX - r.left) / r.width;
		const py = (e.clientY - r.top) / r.height;
		node.style.setProperty('--mx', `${px * 100}%`);
		node.style.setProperty('--my', `${py * 100}%`);
		ry((px - 0.5) * max * 2);
		rx(-(py - 0.5) * max * 2);
	};
	const leave = () => {
		rx(0);
		ry(0);
	};

	node.addEventListener('pointermove', move);
	node.addEventListener('pointerleave', leave);
	return {
		destroy: () => {
			node.removeEventListener('pointermove', move);
			node.removeEventListener('pointerleave', leave);
		}
	};
}
