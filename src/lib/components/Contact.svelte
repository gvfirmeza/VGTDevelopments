<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { magnetic, parallax, splitReveal } from '$lib/motion';
	import Reveal from './Reveal.svelte';

	let sending = $state(false);
	const form = $derived(page.form);
</script>

<section
	id="contacto"
	data-nav="dark"
	class="relative overflow-hidden bg-ink px-6 pt-32 pb-24 text-paper md:pt-44"
>
	<div
		class="dot-grid pointer-events-none absolute inset-0 opacity-[0.06]"
		aria-hidden="true"
	></div>
	<!-- sol laranja a nascer por trás -->
	<div
		use:parallax={{ y: 120, scale: 1.15 }}
		class="pointer-events-none absolute -bottom-[45%] left-1/2 -ml-[450px] h-[900px] w-[900px]"
		aria-hidden="true"
	>
		<div class="orb orb-deep drift-b absolute -inset-[25%]"></div>
		<div class="sphere absolute inset-[18%] opacity-25"></div>
	</div>

	<div class="relative mx-auto max-w-7xl">
		<Reveal>
			<p class="mb-8 font-mono text-xs tracking-[0.22em] text-accent uppercase">05 Contacto</p>
		</Reveal>
		<h2
			use:splitReveal
			class="max-w-5xl font-[family-name:var(--font-display)] text-[clamp(3rem,9vw,9rem)] leading-[0.9] font-medium tracking-[-0.055em]"
		>
			Diga-nos o que <span class="text-accent">precisa.</span>
		</h2>

		<div class="mt-20 grid gap-16 md:mt-28 md:grid-cols-12">
			<div class="md:col-span-4">
				<Reveal>
					<p class="max-w-sm text-lg leading-relaxed text-paper/60">
						Respondemos em 24 horas. Sem compromisso, sem discurso de vendas.
					</p>
					<div class="mt-10 space-y-4">
						<a
							href="mailto:vgtdevelopments@gmail.com"
							class="group flex items-center gap-3 text-paper transition-colors hover:text-accent"
						>
							<span class="h-1.5 w-1.5 rounded-full bg-accent"></span>
							vgtdevelopments@gmail.com
							<span class="transition-transform duration-500 group-hover:-rotate-45">→</span>
						</a>
						<p class="flex items-center gap-3 text-paper/60">
							<span class="h-1.5 w-1.5 rounded-full bg-accent"></span> Portugal · Remoto
						</p>
					</div>
				</Reveal>
			</div>

			<div class="md:col-span-7 md:col-start-6">
				<Reveal>
					{#if form?.success}
						<div
							class="rounded-3xl border border-accent/40 bg-accent/10 p-10 backdrop-blur-sm"
							role="status"
						>
							<p class="mb-3 font-[family-name:var(--font-display)] text-3xl font-medium">
								Mensagem enviada.
							</p>
							<p class="text-paper/60">Obrigado! Respondemos em 24 horas.</p>
						</div>
					{:else}
						<form
							method="POST"
							action="?/contacto"
							class="rounded-3xl border border-paper/10 bg-paper/[0.03] p-6 backdrop-blur-md md:p-10"
							use:enhance={() => {
								sending = true;
								return async ({ update }) => {
									await update({ reset: false });
									sending = false;
								};
							}}
						>
							<div class="grid gap-x-8 gap-y-2 md:grid-cols-2">
								<label class="block">
									<span class="font-mono text-[10px] tracking-[0.22em] text-paper/40 uppercase"
										>01 Nome</span
									>
									<input
										type="text"
										name="nome"
										placeholder="O seu nome"
										autocomplete="name"
										required
										maxlength="100"
										value={form?.values?.nome ?? ''}
										class="field"
									/>
								</label>
								<label class="block">
									<span class="font-mono text-[10px] tracking-[0.22em] text-paper/40 uppercase"
										>02 Email</span
									>
									<input
										type="email"
										name="email"
										placeholder="nome@empresa.pt"
										autocomplete="email"
										required
										maxlength="254"
										value={form?.values?.email ?? ''}
										class="field"
									/>
								</label>
							</div>
							<label class="mt-6 block">
								<span class="font-mono text-[10px] tracking-[0.22em] text-paper/40 uppercase"
									>03 Empresa</span
								>
								<input
									type="text"
									name="empresa"
									placeholder="Opcional"
									autocomplete="organization"
									maxlength="100"
									value={form?.values?.empresa ?? ''}
									class="field"
								/>
							</label>
							<label class="mt-6 block">
								<span class="font-mono text-[10px] tracking-[0.22em] text-paper/40 uppercase"
									>04 Projeto</span
								>
								<textarea
									name="mensagem"
									placeholder="Conte-nos sobre o projeto"
									rows="4"
									required
									minlength="10"
									maxlength="5000"
									class="field resize-none"
									data-lenis-prevent>{form?.values?.mensagem ?? ''}</textarea
								>
							</label>
							<!-- honeypot: escondido de humanos, bots preenchem -->
							<div class="absolute -left-[9999px]" aria-hidden="true">
								<input type="text" name="website" tabindex="-1" autocomplete="off" />
							</div>
							{#if form?.error}
								<p class="mt-6 text-sm text-accent" role="alert">{form.error}</p>
							{/if}
							<div class="mt-10 flex flex-wrap items-center justify-between gap-6">
								<p class="text-xs text-paper/40">Campos 01, 02 e 04 obrigatórios.</p>
								<button
									type="submit"
									disabled={sending}
									use:magnetic
									class="group relative flex items-center gap-3 overflow-hidden rounded-full bg-accent py-2 pr-2 pl-7 text-sm font-medium text-ink disabled:opacity-60"
								>
									<span
										class="absolute inset-0 translate-y-full rounded-full bg-paper transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0"
									></span>
									<span class="relative">{sending ? 'A enviar…' : 'Enviar mensagem'}</span>
									<span
										class="relative flex h-10 w-10 items-center justify-center rounded-full bg-ink text-paper"
									>
										<span class="transition-transform duration-500 group-hover:-rotate-45">→</span>
									</span>
								</button>
							</div>
						</form>
					{/if}
				</Reveal>
			</div>
		</div>
	</div>
</section>
