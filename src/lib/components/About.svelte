<script lang="ts">
	import { parallax, scrubWords } from '$lib/motion';
	import Reveal from './Reveal.svelte';
	import Shape from './Shape.svelte';
</script>

<section id="sobre" class="relative overflow-hidden px-6 py-32 md:py-48">
	<!-- formas a flutuar em parallax -->
	<div class="pointer-events-none absolute inset-0" aria-hidden="true">
		<div use:parallax={{ y: 140, rotate: 40 }} class="absolute top-[12%] left-[4%] text-ink/90">
			<Shape kind="triangle" size={72} />
		</div>
		<div use:parallax={{ y: -180 }} class="absolute top-[6%] right-[3%]">
			<div class="sphere h-20 w-20 md:h-36 md:w-36"></div>
		</div>
		<div
			use:parallax={{ y: 220, rotate: -60 }}
			class="absolute bottom-[10%] left-[18%] text-ink/20"
		>
			<Shape kind="square" size={56} outline />
		</div>
		<div use:parallax={{ y: -90, rotate: 30 }} class="absolute right-[22%] bottom-[14%] text-ink">
			<Shape kind="square" size={28} />
		</div>
	</div>

	<div class="relative mx-auto max-w-5xl">
		<Reveal>
			<p class="mb-12 font-mono text-xs tracking-[0.22em] text-muted uppercase">04 Sobre</p>
		</Reveal>
		<p
			use:scrubWords
			class="font-[family-name:var(--font-display)] text-3xl leading-[1.12] font-medium tracking-[-0.03em] md:text-6xl"
		>
			A VGT Developments é um estúdio de desenvolvimento digital sediado em Portugal. Trabalhamos
			com empresas que precisam de tecnologia <span class="text-accent">fiável</span>, bem executada
			e entregue dentro do prazo.
		</p>
		<Reveal>
			<div class="mt-14 flex items-center gap-5">
				<span class="h-px w-16 bg-accent"></span>
				<p class="max-w-xl text-lg text-muted">
					Preferimos poucos projetos bem feitos a muitos projetos corridos.
				</p>
			</div>
		</Reveal>
	</div>
</section>
