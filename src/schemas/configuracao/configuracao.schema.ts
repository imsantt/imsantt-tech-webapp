import { z } from "zod";

/**
 * Schema de validação da configuração do site.
 *
 * Diferente dos demais domínios, a configuração é um OBJETO ÚNICO
 * (`supabase.from('configuracao_site').select('*').single()`) e já é
 * totalmente serializável — não há `IconType`, pois `redesSociais.icone`
 * é um identificador de string (resolvido para componente no cliente).
 */

export const ICONES_REDE_SOCIAL = [
  "github",
  "linkedin",
  "instagram",
] as const;

const linkNavegacaoSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const redeSocialSchema = z.object({
  label: z.string().min(1),
  href: z.string().url(),
  icone: z.enum(ICONES_REDE_SOCIAL),
});

const contatoSiteSchema = z.object({
  email: z.string().email(),
  // telefone pode vir vazio quando não divulgado
  telefone: z.string(),
});

export const configuracaoSiteSchema = z.object({
  contato: contatoSiteSchema,
  navegacao: z.array(linkNavegacaoSchema),
  linksAjuda: z.array(linkNavegacaoSchema),
  redesSociais: z.array(redeSocialSchema),
  nomeAutor: z.string().min(1),
  cargo: z.string().min(1),
  disponivel: z.boolean(),
});
