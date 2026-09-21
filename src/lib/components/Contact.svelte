<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import Reveal from './Reveal.svelte';

	let sending = $state(false);
	const form = $derived(page.form);
</script>

<section id="contacto" class="border-t border-line px-6 py-32">
	<div class="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
		<Reveal>
			<div>
				<p class="mb-6 font-mono text-xs tracking-[0.22em] text-muted uppercase">05 Contacto</p>
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
						<span class="h-1.5 w-1.5 rounded-full bg-accent"></span>
						<a href="mailto:vgtdevelopments@gmail.com" class="hover:text-accent"
							>vgtdevelopments@gmail.com</a
						>
					</p>
					<p class="flex items-center gap-3">
						<span class="h-1.5 w-1.5 rounded-full bg-accent"></span> Portugal · Remoto
					</p>
				</div>
			</div>
		</Reveal>

		<Reveal>
			{#if form?.success}
				<div class="space-y-3 border-t border-accent pt-6" role="status">
					<p class="font-[family-name:var(--font-display)] text-2xl font-medium">
						Mensagem enviada.
					</p>
					<p class="text-muted">Obrigado! Respondemos em 24 horas.</p>
				</div>
			{:else}
				<form
					method="POST"
					action="?/contacto"
					class="space-y-6"
					use:enhance={() => {
						sending = true;
						return async ({ update }) => {
							await update({ reset: false });
							sending = false;
						};
					}}
				>
					<input
						type="text"
						name="nome"
						placeholder="Nome"
						autocomplete="name"
						required
						maxlength="100"
						value={form?.values?.nome ?? ''}
						class="field"
					/>
					<input
						type="email"
						name="email"
						placeholder="Email"
						autocomplete="email"
						required
						maxlength="254"
						value={form?.values?.email ?? ''}
						class="field"
					/>
					<input
						type="text"
						name="empresa"
						placeholder="Empresa"
						autocomplete="organization"
						maxlength="100"
						value={form?.values?.empresa ?? ''}
						class="field"
					/>
					<textarea
						name="mensagem"
						placeholder="Conte-nos sobre o projeto"
						rows="4"
						required
						minlength="10"
						maxlength="5000"
						class="field resize-none">{form?.values?.mensagem ?? ''}</textarea
					>
					<!-- honeypot: escondido de humanos, bots preenchem -->
					<div class="absolute -left-[9999px]" aria-hidden="true">
						<input type="text" name="website" tabindex="-1" autocomplete="off" />
					</div>
					{#if form?.error}
						<p class="text-sm text-accent" role="alert">{form.error}</p>
					{/if}
					<button
						type="submit"
						disabled={sending}
						class="group flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-medium text-paper transition-colors hover:bg-accent disabled:opacity-60"
					>
						{sending ? 'A enviar…' : 'Enviar mensagem'}
						<span class="transition-transform group-hover:translate-x-1">→</span>
					</button>
				</form>
			{/if}
		</Reveal>
	</div>
</section>
