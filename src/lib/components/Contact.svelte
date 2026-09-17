<script lang="ts">
	import Reveal from './Reveal.svelte';
</script>

<section id="contacto" class="border-t border-line px-6 py-32">
	<div class="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
		<Reveal>
			<div>
				<p class="mb-6 font-mono text-xs tracking-[0.22em] text-muted uppercase">05 — Contacto</p>
				<h2
					class="mb-6 font-[family-name:var(--font-display)] text-4xl leading-[1.05] font-medium tracking-[-0.04em] md:text-6xl"
				>
					Diga-nos o que precisa.
				</h2>
				<p class="max-w-sm leading-relaxed text-muted">
					Respondemos em 24 horas. Sem compromisso, sem discurso de vendas.
				</p>
				<div class="mt-10 space-y-3 text-sm">
					<p class="flex items-center gap-3">
						<span class="h-1.5 w-1.5 rounded-full bg-accent"></span> geral@vgt.pt
					</p>
					<p class="flex items-center gap-3">
						<span class="h-1.5 w-1.5 rounded-full bg-accent"></span> Portugal · Remoto
					</p>
				</div>
			</div>
		</Reveal>

		<Reveal>
			<form class="space-y-6" onsubmit={(e) => e.preventDefault()}>
				<input type="text" name="nome" placeholder="Nome" class="field" />
				<input type="email" name="email" placeholder="Email" class="field" />
				<input type="text" name="empresa" placeholder="Empresa" class="field" />
				<textarea
					name="mensagem"
					placeholder="Conte-nos sobre o projeto"
					rows="4"
					class="field resize-none"></textarea>
				<button
					type="submit"
					class="group flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-medium text-paper transition-colors hover:bg-accent"
				>
					Enviar mensagem
					<span class="transition-transform group-hover:translate-x-1">→</span>
				</button>
			</form>
		</Reveal>
	</div>
</section>
