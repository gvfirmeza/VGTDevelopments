<script lang="ts">
	import Reveal from './Reveal.svelte';
	import Typewriter from './Typewriter.svelte';
	import PhoneMockup from './PhoneMockup.svelte';
</script>

<section class="relative flex min-h-screen items-center overflow-hidden px-6 pt-32 pb-20">
	<div class="dot-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true"></div>
	<div
		class="pointer-events-none absolute top-1/3 left-[5%] h-[500px] w-[500px] rounded-full bg-accent/10 blur-[120px]"
		aria-hidden="true"
	></div>

	<div class="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-12">
		<!-- esquerda: texto -->
		<div class="lg:col-span-7">
			<Reveal>
				<div class="mb-8 flex items-center gap-3">
					<span class="h-2 w-2 animate-pulse rounded-full bg-accent"></span>
					<p class="font-mono text-xs tracking-[0.22em] text-muted uppercase">
						Estúdio digital · Porto · Remoto
					</p>
				</div>
			</Reveal>

			<Reveal>
				<h1
					class="font-[family-name:var(--font-display)] text-[2.75rem] leading-[0.95] font-medium tracking-[-0.04em] md:text-[4.5rem] lg:text-[5.25rem]"
				>
					Criamos<br />
					<Typewriter
						words={[
							'websites.',
							'plataformas web.',
							'aplicações à medida.',
							'interfaces.',
							'produtos digitais.'
						]}
					/>
				</h1>
			</Reveal>

			<Reveal>
				<p class="mt-8 max-w-lg text-lg leading-relaxed text-muted">
					A VGT concebe websites e plataformas web para empresas portuguesas, do primeiro esboço à
					entrega em produção. Sediados no Porto, a trabalhar remotamente com todo o país.
				</p>
			</Reveal>

			<Reveal>
				<div class="mt-10 flex flex-wrap items-center gap-5">
					<a
						href="#contacto"
						class="group flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-medium text-paper transition-colors hover:bg-accent"
					>
						Começar projeto
						<span class="transition-transform group-hover:translate-x-1">→</span>
					</a>
					<a
						href="#projetos"
						class="text-sm underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
					>
						Ver projetos
					</a>
				</div>
			</Reveal>

			<Reveal>
				<div class="mt-24 grid grid-cols-2 gap-8 border-t border-line pt-8 md:grid-cols-4">
					<div>
						<p class="text-3xl font-medium tracking-tight">Porto</p>
						<p class="mt-2 font-mono text-[10px] tracking-widest text-muted uppercase">
							Base de operações
						</p>
					</div>
					<div>
						<p class="text-3xl font-medium tracking-tight">Remoto</p>
						<p class="mt-2 font-mono text-[10px] tracking-widest text-muted uppercase">
							Como trabalhamos
						</p>
					</div>
					<div>
						<p class="text-3xl font-medium tracking-tight">24h</p>
						<p class="mt-2 font-mono text-[10px] tracking-widest text-muted uppercase">
							Tempo de resposta
						</p>
					</div>
					<div>
						<p class="text-3xl font-medium tracking-tight">Full</p>
						<p class="mt-2 font-mono text-[10px] tracking-widest text-muted uppercase">
							Stack frontend a backend
						</p>
					</div>
				</div>
			</Reveal>
		</div>

		<!-- direita: phone -->
		<div class="hidden lg:col-span-5 lg:block">
			<Reveal>
				<PhoneMockup />
			</Reveal>
		</div>
	</div>
</section>
