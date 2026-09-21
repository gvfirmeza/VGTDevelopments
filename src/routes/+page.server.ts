import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

const DEFAULT_TO = 'vgtdevelopments@gmail.com';
const DEFAULT_FROM = 'VGT Developments <onboarding@resend.dev>';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// remove quebras de linha para impedir injeção de cabeçalhos no assunto
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ');

export const actions: Actions = {
	contacto: async ({ request, fetch }) => {
		const data = await request.formData();
		const text = (key: string) => data.get(key)?.toString().trim() ?? '';

		// honeypot: bots preenchem, humanos não veem. Finge sucesso para não dar pistas
		if (text('website')) return { success: true };

		const nome = text('nome');
		const email = text('email');
		const empresa = text('empresa');
		const mensagem = text('mensagem');
		const values = { nome, email, empresa, mensagem };

		if (nome.length < 2) return fail(400, { error: 'Indique o seu nome.', values });
		if (!EMAIL_RE.test(email) || email.length > 254)
			return fail(400, { error: 'Indique um email válido.', values });
		if (mensagem.length < 10)
			return fail(400, { error: 'Conte-nos um pouco mais sobre o projeto.', values });
		if (nome.length > 100 || empresa.length > 100 || mensagem.length > 5000)
			return fail(400, { error: 'Algum campo excede o tamanho permitido.', values });

		if (!env.RESEND_API_KEY) {
			console.error('[contacto] RESEND_API_KEY em falta');
			return fail(500, {
				error: 'Envio indisponível de momento. Escreva-nos para vgtdevelopments@gmail.com.',
				values
			});
		}

		const res = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${env.RESEND_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from: env.CONTACT_FROM || DEFAULT_FROM,
				to: [env.CONTACT_TO || DEFAULT_TO],
				reply_to: email,
				subject: `Novo contacto: ${oneLine(nome)}${empresa ? ` (${oneLine(empresa)})` : ''}`,
				text: `Nome: ${nome}\nEmail: ${email}\nEmpresa: ${empresa || '—'}\n\n${mensagem}`,
				html: `<p><strong>Nome:</strong> ${escapeHtml(nome)}<br>
<strong>Email:</strong> ${escapeHtml(email)}<br>
<strong>Empresa:</strong> ${escapeHtml(empresa) || '—'}</p>
<p style="white-space:pre-wrap">${escapeHtml(mensagem)}</p>`
			})
		}).catch((err) => {
			console.error('[contacto] falha de rede', err);
			return null;
		});

		if (!res?.ok) {
			if (res) console.error('[contacto] Resend', res.status, await res.text());
			return fail(502, {
				error: 'Não foi possível enviar a mensagem. Tente de novo ou escreva-nos por email.',
				values
			});
		}

		return { success: true };
	}
};
