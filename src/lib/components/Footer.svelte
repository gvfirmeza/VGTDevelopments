<script lang="ts">
	import Logo from './Logo.svelte';

	const links = [
		{ href: '#projetos', label: 'Projetos' },
		{ href: '#servicos', label: 'Serviços' },
		{ href: '#processo', label: 'Processo' },
		{ href: '#sobre', label: 'Sobre' },
		{ href: '#contacto', label: 'Contacto' }
	];
</script>

<footer
	data-nav="dark"
	class="relative overflow-hidden border-t border-paper/10 bg-ink px-6 pt-20 text-paper"
>
	<div class="relative mx-auto max-w-7xl">
		<div class="grid gap-12 md:grid-cols-12">
			<div class="md:col-span-5">
				<Logo size={18} />
				<p class="mt-6 max-w-xs text-sm leading-relaxed text-paper/50">
					Estúdio digital no Porto. Websites e plataformas web para empresas que valorizam execução.
				</p>
			</div>
			<nav class="md:col-span-3" aria-label="Rodapé">
				<p class="mb-5 font-mono text-[10px] tracking-[0.22em] text-paper/40 uppercase">Navegar</p>
				<ul class="space-y-2 text-sm">
					{#each links as l (l.href)}
						<li>
							<a href={l.href} class="text-paper/70 transition-colors hover:text-accent"
								>{l.label}</a
							>
						</li>
					{/each}
				</ul>
			</nav>
			<div class="md:col-span-4">
				<p class="mb-5 font-mono text-[10px] tracking-[0.22em] text-paper/40 uppercase">Contacto</p>
				<ul class="space-y-2 text-sm">
					<li>
						<a
							href="mailto:vgtdevelopments@gmail.com"
							class="text-paper/70 transition-colors hover:text-accent">vgtdevelopments@gmail.com</a
						>
					</li>
					<li>
						<a
							href="https://wa.me/message/ZESMBW2I7ENSO1"
							target="_blank"
							rel="noopener noreferrer"
							class="text-paper/70 transition-colors hover:text-accent">WhatsApp ↗</a
						>
					</li>
					<li class="text-paper/50">Porto, Portugal · Remoto</li>
				</ul>
			</div>
		</div>

		<!-- assinatura gigante -->
		<div
			class="mt-24 mb-6 flex items-end gap-[2vw] [mask-image:linear-gradient(to_bottom,#000_35%,transparent)] select-none"
			aria-hidden="true"
		>
			<svg viewBox="0 0 110 40" class="w-[22vw] max-w-[300px] shrink-0 overflow-visible">
				<path d="M0 38 L18 2 L36 38 Z" fill="currentColor" />
				<circle cx="50" cy="20" r="18" fill="var(--color-accent)" />
				<rect x="74" y="2" width="36" height="36" fill="currentColor" />
			</svg>
			<p
				class="font-[family-name:var(--font-display)] text-[17vw] leading-[0.75] font-medium tracking-[-0.07em] text-paper xl:text-[15rem]"
			>
				VGT
			</p>
		</div>

		<div
			class="flex flex-col items-start justify-between gap-4 border-t border-paper/10 py-8 text-xs text-paper/40 md:flex-row md:items-center"
		>
			<p>© {new Date().getFullYear()} VGT Developments · Porto, Portugal</p>
			<a href="#topo" class="group flex items-center gap-2 hover:text-accent">
				Voltar ao topo
				<span class="transition-transform duration-500 group-hover:-translate-y-1">↑</span>
			</a>
		</div>
	</div>
</footer>
