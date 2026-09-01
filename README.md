# IMSANTT.TECH

Portfolio pessoal e vitrine profissional de **Robert Santos** — Engenheiro de Software Sênior, Arquiteto de Sistemas e Estrategista em Tecnologia & IA.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Chakra UI](https://img.shields.io/badge/Chakra_UI-3-319795?logo=chakraui&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-3-6E9F18?logo=vitest&logoColor=white)
![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare_Pages-F38020?logo=cloudflare&logoColor=white)

---

## Visão Geral

Aplicação web moderna construída com foco em performance, acessibilidade e experiência do desenvolvedor. Serve como ponto central de presença online, apresentando trajetória, habilidades técnicas, projetos e iniciativas de impacto social.

**Produção:** [imsantt.tech](https://imsantt.tech)

## Stack

| Camada          | Tecnologia                                                   |
| --------------- | ------------------------------------------------------------ |
| Framework       | React 19                                                     |
| Build           | Vite 8                                                       |
| Linguagem       | TypeScript 6                                                 |
| UI Library      | Chakra UI v3 + Framer Motion                                 |
| Design System   | Tokens centralizados (cores, tipografia, espaçamento em rem) |
| Roteamento      | React Router v7                                              |
| Data Fetching   | SWR                                                          |
| Validação       | Zod (schema em runtime na borda dos services)                |
| Datas           | Luxon                                                        |
| Ícones          | React Icons (fa6, si, tb, ti, gr, md, di, pi, fi)            |
| Dados / Backend | Supabase (leitura de dados, com fallback para stub)          |
| Storage         | Cloudflare R2 (currículo PDF)                                |
| Observabilidade | Sentry (tracing, replay, logs, release tracking)             |
| Testes          | Vitest + React Testing Library                               |
| Cobertura       | v8 com threshold ≥ 80%                                       |
| Deploy          | Cloudflare Pages + headers de segurança                      |
| CI              | GitHub Actions (lint + audit + coverage + build)             |
| Commits         | Husky + Commitlint + Commitizen                              |

## Estrutura do Projeto

```
src/
├── assets/                              # Imagens otimizadas (WebP)
├── components/
│   ├── layout/
│   │   ├── navbar/                      # Navbar + NavbarSimples + specs
│   │   ├── footer/                      # Footer (redes sociais, status) + spec
│   │   └── index.ts
│   └── ui/
│       ├── card-experiencia/
│       │   ├── CardExperiencia.component.tsx + spec
│       │   ├── index.ts
│       │   └── fragments/
│       │       ├── card-experiencia-skeleton/   # Skeleton (loading state)
│       │       ├── card-experiencia-error/      # Error fallback
│       │       ├── card-experiencia-header/     # Header do card
│       │       └── card-experiencia-footer/     # Footer do card (tags + link)
│       ├── error-boundary/              # ErrorBoundary genérico
│       └── logo/                        # Logo.tsx + Logo.spec.tsx
├── instrument.ts                        # Inicialização do Sentry (tracing + replay + logs)
├── features/
│   ├── home/
│   │   ├── components/
│   │   │   ├── hero/
│   │   │   │   ├── Hero.tsx + spec
│   │   │   │   └── fragments/
│   │   │   │       ├── hero-skeleton/   # Skeleton do Hero
│   │   │   │       └── hero-error/      # Error fallback do Hero
│   │   │   ├── habilidades/
│   │   │   │   ├── HabilidadesSecao.tsx + spec
│   │   │   │   └── fragments/
│   │   │   │       ├── habilidades-skeleton/
│   │   │   │       └── habilidades-error/
│   │   │   ├── trajetoria/
│   │   │   │   ├── Trajetoria.tsx + spec
│   │   │   │   └── fragments/
│   │   │   │       ├── trajetoria-skeleton/
│   │   │   │       └── trajetoria-error/
│   │   │   ├── servicos/
│   │   │   │   ├── Servicos.tsx + spec
│   │   │   │   └── fragments/
│   │   │   │       ├── servicos-skeleton/
│   │   │   │       └── servicos-error/
│   │   │   ├── contato/
│   │   │   │   ├── Contato.tsx + spec
│   │   │   │   └── fragments/
│   │   │   │       ├── contato-skeleton/
│   │   │   │       └── contato-error/
│   │   │   └── index.ts                # Lazy exports (lazyComRetry)
│   │   ├── data/                        # Dados estáticos (hero)
│   │   └── Home.tsx + spec
│   ├── habilidades/
│   │   ├── Habilidades.tsx + spec       # Página /habilidades
│   │   └── fragments/
│   │       ├── habilidades-page-skeleton/
│   │       └── habilidades-page-error/
│   └── experiencias/                    # Página /experiencias (Trajetória & Formação)
│       ├── Experiencias.tsx + spec      # Navegação por abas (tablist acessível)
│       └── fragments/
│           ├── experiencias-timeline/   # Aba Experiência Profissional
│           ├── formacao-timeline/       # Aba Formação Acadêmica
│           ├── certificacoes-grid/      # Aba Cursos & Certificações
│           ├── item-timeline/           # Item da timeline de experiência
│           ├── item-formacao/           # Item da timeline de formação
│           ├── card-certificacao/       # Card de certificação
│           ├── chip-filtro/             # Chip de filtro
│           ├── meta-chip/               # Chip de metadados (local, modelo, tipo)
│           └── experiencias-page-skeleton/
├── hooks/
│   ├── use-acessar-link-externo/        # Hook para links externos (window.open)
│   ├── use-configuracao/                # Hook SWR para config do site
│   ├── use-experiencias/                # Hook SWR para experiências
│   ├── use-certificacoes/               # Hook SWR para certificações
│   ├── use-formacao/                    # Hook SWR para formação acadêmica
│   ├── use-habilidades/                 # Hook SWR para habilidades
│   └── use-scroll-suave/               # Navegação interna suave
├── lib/
│   ├── env.ts                           # Variáveis de ambiente centralizadas
│   ├── lazy-com-retry.ts                # React.lazy com retry em falha de chunk
│   ├── latencia.ts                      # simularLatencia (usada no fallback de stub)
│   ├── logger.ts                        # Logger estruturado (prod-aware)
│   ├── rate-limiter.ts                  # Rate limiting client-side
│   ├── validacao.ts                     # Validação e sanitização de inputs
│   ├── supabase.ts                      # Cliente Supabase singleton
│   └── tema/
│       ├── tokens.ts                    # Design System (fonte única de verdade)
│       ├── cores.ts                     # Chakra tokens
│       ├── global.ts                    # Global CSS
│       ├── index.ts                     # createSystem
│       └── tokens.spec.ts
├── pages/
│   ├── not-found/                       # NotFound.tsx + spec
│   └── index.ts                         # Lazy exports (React.lazy)
├── routes/                              # AppRoutes com Suspense + lazy loading
├── schemas/                             # Schemas Zod do formato bruto da fonte (validação na borda)
│   ├── experiencia/                     # experiencia.schema.ts + spec
│   ├── certificacao/                    # certificacao.schema.ts + spec
│   ├── formacao/                        # formacao.schema.ts + spec
│   ├── habilidade/                      # habilidade.schema.ts + spec (valida só campos serializáveis)
│   └── configuracao/                    # configuracao.schema.ts + spec
├── services/                            # fonte → validação (schema) → mapper → domínio
│   ├── configuracao/                    # Serviço de configuração do site
│   ├── contato/                         # Serviço de envio de mensagem
│   ├── experiencia/                     # experiencia.service.ts + experiencia.mapper.ts + specs
│   ├── certificacao/                    # certificacao.service.ts + certificacao.mapper.ts + specs
│   ├── formacao/                        # formacao.service.ts + formacao.mapper.ts + specs
│   └── habilidade/                      # Serviço de habilidades técnicas
├── stubs/
│   ├── configuracao.stub.ts             # Mock de configuração (redes sociais, cargo)
│   ├── experiencias.stub.ts             # Mock de experiências (formato bruto, snake_case)
│   ├── certificacoes.stub.ts            # Mock de certificações (formato bruto)
│   ├── formacao.stub.ts                 # Mock de formação acadêmica (formato bruto)
│   └── habilidades.stub.ts             # Mock de habilidades (6 categorias, com IconType do cliente)
├── tests/                               # Setup + helpers (renderComProviders)
└── types/
    ├── configuracao.ts                  # ConfiguracaoSite, RedeSocial
    ├── contato.ts
    ├── experiencia.ts
    ├── certificacao.ts                  # Certificacao, CategoriaCertificacao
    ├── formacao.ts                      # FormacaoAcademica, GrauFormacao
    └── habilidade.ts                    # CategoriaHabilidade, Habilidade
```

## Arquitetura de Componentes

### Lazy Loading & Code Splitting

Todas as páginas e seções da Home são carregadas com `React.lazy()`:

```
pages/index.ts          → lazy(() => import("Home")), lazy(() => import("Habilidades"))
components/index.ts     → lazy(() => import("Hero")), lazy(() => import("Trajetoria")), ...
```

Cada componente lazy é envolto com:

- **`<Suspense>`** — exibe skeleton enquanto carrega
- **`<ErrorBoundary>`** — exibe fallback de erro se quebrar

### Padrão de Fragments

```
<componente>/
  fragments/
    <componente>-<status>/
      <componente>-<status>.fragment.tsx
      <componente>-<status>.fragment.spec.tsx
```

Status possíveis: `skeleton`, `error`, ou partes composicionais (`header`, `footer`).

### Hooks

| Hook                    | Responsabilidade                                              |
| ----------------------- | ------------------------------------------------------------- |
| `useHabilidades`        | Busca categorias de habilidades via SWR                       |
| `useExperiencias`       | Busca experiências profissionais via SWR                      |
| `useCertificacoes`      | Busca cursos e certificações via SWR                          |
| `useFormacao`           | Busca formação acadêmica via SWR                              |
| `useConfiguracao`       | Busca configuração do site (redes, cargo, disponibilidade)    |
| `useAcessarLinkExterno` | Abre links externos com `window.open` + `noopener,noreferrer` |
| `useScrollSuave`        | Scroll suave para âncoras internas                            |

### Fonte de Dados e Contrato

O fluxo de dados é blindado por um contrato validado em runtime, o que mantém a
fronteira fina o suficiente para trocar de fonte (stub → Supabase → backend
próprio) sem tocar em hooks ou componentes:

- **Schemas** (`src/schemas/`): descrevem o formato **bruto** da fonte
  (snake_case, datas ISO), validado com Zod na borda do service. Dado
  malformado é logado e descartado — nunca chega à UI.
- **Mappers** (`services/<dominio>/<dominio>.mapper.ts`): ponto único de
  conversão fonte → domínio (snake_case/ISO → camelCase/`DateTime`). Isolar a
  conversão aqui evita que o formato bruto vaze para as camadas superiores.
- **Services**: buscam da fonte, validam pelo schema e mapeiam. A fonte é o
  **Supabase** quando as variáveis de ambiente estão configuradas, com
  **fallback sinalizado** (log) para o stub local quando não há configuração ou
  a consulta falha — sem fallback silencioso.
- **Stubs** (`src/stubs/`): dados no mesmo formato bruto do Supabase, usados
  como fallback e para desenvolvimento local.
- **Hooks**: consomem services via SWR (cache, revalidação, deduplicação).
- **Componentes**: consomem hooks — nunca importam stubs ou tocam na fonte.

> **Habilidades** permanece client-owned (stub): o tipo mistura dado com
> apresentação (`IconType` e tokens de cor, não serializáveis). O schema valida
> os campos serializáveis; a migração para dados remotos (com resolvedor de
> ícone/cor via allowlist) fica documentada no próprio service como evolução.

## Design System

O DS é centralizado em `src/lib/tema/tokens.ts` com escalas em `rem`:

```typescript
import { cores, tipografia, espacamento, raio, sombras, transicao } from "@/lib/tema/tokens";

// Uso nos componentes:
bg={cores.bg.card}
color={cores.texto.titulo}
borderRadius={raio.xl}
boxShadow={sombras.destaque}
transition={transicao.elevacao}
```

| Token         | Categorias                                                          |
| ------------- | ------------------------------------------------------------------- |
| `cores`       | primaria, secundaria, sucesso, erro, alerta, info, bg, texto, borda |
| `tipografia`  | familia, tamanho, peso, alturaLinha                                 |
| `espacamento` | 0.5 a 32 + xl-res a 4xl-res                                         |
| `raio`        | sm a full                                                           |
| `sombras`     | card, destaque, botao, input                                        |
| `transicao`   | rapida, padrao, lenta, elevacao                                     |
| `layout`      | maxWidth, maxWidthEstrito, navbarAltura                             |
| `componentes` | card (altura, maxTags, maxLinhas)                                   |
| `breakpoints` | sm, md, lg, xl, 2xl                                                 |

## Páginas

| Rota            | Componente   | Descrição                                                           |
| --------------- | ------------ | ------------------------------------------------------------------- |
| `/`             | Home         | Hero + Habilidades + Trajetória + Serviços + Contato                |
| `/habilidades`  | Habilidades  | Todas as 6 categorias com tags completas                            |
| `/experiencias` | Experiencias | Trajetória & Formação em abas: Experiência, Formação, Certificações |
| `*`             | NotFound     | Página 404                                                          |

### Navegação

- **Home** (`/`): Navbar completa com links de âncora + menu mobile
- **Páginas internas**: NavbarSimples com logo + botão "Voltar"

## Infraestrutura de Código

### Logger Estruturado (`src/lib/logger.ts`)

- Em produção: silencia `debug`/`info`, mantém `warn`/`error`
- Em desenvolvimento: exibe tudo com contexto formatado
- Preparado para integração com serviço externo (Sentry, DataDog)

### Observabilidade com Sentry (`src/instrument.ts`)

- Inicialização do Sentry no início da aplicação para capturar erros globais
- `browser tracing` com integração do React Router v7
- `Session Replay` apenas em erros em produção
- `logs estruturados` habilitados via `enableLogs: true`
- `release` baseado no versionamento do app (`__APP_VERSION__`)
- Configuração de amostragem: `tracesSampleRate` em produção e desenvolvimento
- `ignoreErrors` para reduzir ruído de erros do navegador e rede
- Upload de sourcemaps no build via `@sentry/vite-plugin`

### Rate Limiter (`src/lib/rate-limiter.ts`)

- Rate limiting client-side para UX (evita spam acidental)
- Padrão para formulário de contato: 3 tentativas por 5 minutos
- Não substitui rate limiting server-side

### Validação e Sanitização (`src/lib/validacao.ts`)

- Sanitização de HTML/XSS (remove tags, event handlers, javascript: protocol)
- Validação de formulário de contato (nome, email, mensagem)
- Limites de caracteres configurados

### Variáveis de Ambiente (`src/lib/env.ts`)

- Fonte única de acesso às env vars
- Expõe `isProd`, `isDev`, URLs do Supabase, URL pública do R2

### Currículo via Cloudflare R2

O PDF do currículo é servido via Cloudflare R2 (bucket público) ao invés de arquivo estático. A URL é configurada via `VITE_R2_PUBLIC_URL` no `.env`.

## Desenvolvimento

### Pré-requisitos

- Node.js 24+
- npm 10+

### Setup

```bash
git clone https://github.com/imsantt/imsantt-tech-webapp.git
cd imsantt-tech-webapp
npm install
cp .env.example .env
npm run dev
```

### Scripts disponíveis

| Comando                 | Descrição                                         |
| ----------------------- | ------------------------------------------------- |
| `npm run dev`           | Servidor de desenvolvimento com HMR               |
| `npm run build`         | Type check + build + atualização do sitemap       |
| `npm run preview`       | Preview local do build de produção                |
| `npm run lint`          | Lint com ESLint                                   |
| `npm run test`          | Testes unitários (single run)                     |
| `npm run test:watch`    | Testes em modo watch                              |
| `npm run test:coverage` | Testes com relatório de cobertura (threshold 80%) |
| `npm run commit`        | Commit interativo com Conventional Commits        |
| `npm run audit:fix`     | Corrige vulnerabilidades de dependências          |

## Testes

Cobertura com Vitest + React Testing Library + v8 provider.

```bash
npm run test:coverage
```

- **Threshold global:** 80% (statements, branches, functions, lines)
- **Padrão de arquivos:** `*.spec.tsx` / `*.spec.ts` colocado na mesma pasta do componente
- **Helper:** `renderComProviders` encapsula MemoryRouter + ChakraProvider
- **Mocks:** Services mockados via `vi.mock()` nos testes de hooks e componentes
- **Contrato e fonte:** schemas (válido/inválido), mappers (bruto → domínio) e
  services com o cliente Supabase mockado (sucesso remoto, erro → fallback,
  sem env → fallback, resposta malformada → descarte)

## Quality Gates

| Camada             | Quando         | O que valida                                  |
| ------------------ | -------------- | --------------------------------------------- |
| Husky `commit-msg` | Todo commit    | Formato Conventional Commits                  |
| Husky `pre-push`   | Antes de push  | Lint + Cobertura ≥ 80% + Build (espelha o CI) |
| GitHub Actions CI  | Pull Requests  | Lint → Audit → Coverage → Build               |
| Cloudflare Pages   | Push em `main` | Build de produção                             |

## Branching Strategy

```
feature/minha-feature
        │
        ▼ (PR → stage)
      stage ──── CI: lint + audit + coverage + build
        │         Cloudflare: deploy preview em stage.*
        ▼ (PR → main)
       main ──── Cloudflare: deploy produção em imsantt.tech
```

| Branch  | Ambiente | URL                                   |
| ------- | -------- | ------------------------------------- |
| `main`  | Produção | `imsantt.tech`                        |
| `stage` | Preview  | `stage.imsantt-tech-webapp.pages.dev` |

- Features criam branch a partir de `stage`
- PRs para `stage` rodam CI completo
- PRs de `stage` para `main` são o release
- Hotfixes: branch a partir de `main`, depois cherry-pick para `stage`

## Segurança

### Headers (Cloudflare `_headers`)

- Content-Security-Policy (CSP) com `self`, fontes do Google, imagens (R2/Supabase), `cloudflareinsights.com` e `sentry.io`
- `script-src` sem `'unsafe-inline'`: o único script inline (JSON-LD de SEO) é liberado por **hash SHA-256**. Ao alterar o bloco JSON-LD em `index.html`, recalcule o hash e atualize `public/_headers` (há aviso no próprio `index.html`)
- `require-trusted-types-for 'script'` para reforço adicional contra DOM XSS
- Strict-Transport-Security (HSTS)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy restritivo
- Cache de ativos em `/assets/*` com `immutable`
- `worker-src 'self' blob:` e `frame-ancestors 'none'` para reforço de segurança

### Observabilidade e deploy

- Sentry habilitado em produção para tracing, replays em erro e logs estruturados
- `@sentry/vite-plugin` coordena upload de sourcemaps no build do Vite
- `release` do app usa a versão do package para facilitar rastreio no Sentry
- Cloudflare Pages atua como camada de deploy, TLS e headers de segurança

### Frontend

> **Importante:** os controles abaixo são camadas de **UX e defesa em profundidade**, não a barreira de segurança principal. A aplicação de regras reais (validação de payload, anti-abuso, rate limit por IP) é responsabilidade do backend — ver "Contato".

- Sanitização de inputs (limpeza/UX; a proteção anti-XSS efetiva é o escape no ponto de renderização)
- Validação de formulários com limites definidos
- Rate limiting client-side (apenas evita envio acidental; contornável, não substitui limite server-side)
- Logger estruturado (sem dados sensíveis em produção; e-mails mascarados)
- Source maps ocultos (`sourcemap: "hidden"`)
- Links externos com `noopener,noreferrer` via hook centralizado
- Nenhum uso de `dangerouslySetInnerHTML`, `eval` ou `innerHTML`

### Contato (backend)

O formulário de contato envia os dados para a Supabase Edge Function `enviar-contato`
(`supabase.functions.invoke("enviar-contato", ...)` em `src/services/contato/contato.service.ts`).

As garantias de segurança **reais** do fluxo de contato ficam nessa função server-side, que deve:

- validar e sanitizar o payload novamente (nunca confiar no cliente);
- aplicar rate limiting por IP / anti-abuso (ex.: Cloudflare Turnstile ou WAF);
- impor os mesmos limites de tamanho de `nome` / `email` / `mensagem`;
- expor apenas erros genéricos ao cliente, sem vazar detalhes internos.

A postura de segurança de dados (RLS por padrão, leitura pública/escrita
restrita, chave anônima não é autorização, escrita validada no servidor) está
documentada em `SECURITY.md`. O DDL/RLS e o código da Edge Function pertencem ao
repositório de backend/banco quando existir — não ao repositório do frontend.

### CI/CD

- `npm audit --audit-level=high` no pipeline
- GitHub Actions pinadas por SHA
- Dependabot configurado
- Secrets fora do repositório (apenas `.env.example` versionado)

### Auditorias

Auditorias de segurança documentadas em `docs/seguranca/`. Nível geral de risco: **BAIXO**.

## Deploy

O projeto é deployado automaticamente no **Cloudflare Pages** via Git integration.

- **Push em `main`** → deploy de produção
- **Pull Request** → preview deployment com URL única

### Variáveis de ambiente (Cloudflare Pages)

| Variável                 | Descrição                                                       |
| ------------------------ | --------------------------------------------------------------- |
| `NODE_VERSION`           | `24`                                                            |
| `VITE_SUPABASE_URL`      | URL do projeto Supabase (opcional por agora)                    |
| `VITE_SUPABASE_ANON_KEY` | Chave anônima pública (opcional por agora)                      |
| `VITE_R2_PUBLIC_URL`     | URL pública do bucket R2 (currículo PDF)                        |
| `VITE_SENTRY_DSN`        | DSN do projeto Sentry para capturar erros e tracing             |
| `SENTRY_ORG`             | Organização Sentry usada no upload de sourcemaps no build       |
| `SENTRY_PROJECT`         | Projeto Sentry relacionado ao app                               |
| `SENTRY_AUTH_TOKEN`      | Token de autenticação para upload de sourcemaps via Vite plugin |

> A configuração do Cloudflare Pages também usa headers rígidos em `public/_headers`, com CSP, HSTS, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` e cache de assets.

## SEO

- Open Graph completo (Facebook, LinkedIn, WhatsApp)
- Twitter Card (summary_large_image)
- JSON-LD estruturado (Person schema)
- Sitemap XML com atualização automática no build
- robots.txt
- Canonical URL
- Meta tags semânticas

## Acessibilidade

- Skip link para conteúdo principal
- HTML semântico (`main`, `nav`, `section`, `header`, `footer`)
- `aria-label` e `aria-labelledby` nos componentes
- `role="status"` nos skeletons de carregamento
- Responsividade com breakpoints adaptativos
- Contraste adequado no design system

## Build Otimizado

- Code splitting via `manualChunks` (vendor-react, vendor-ui)
- Lazy loading de páginas com `React.lazy` + `Suspense`
- Lazy loading de seções da Home (carregamento independente)
- ErrorBoundary por seção e por card (isolamento de falhas)
- Imagem principal em formato WebP com `fetchPriority="high"`
- Target ES2022 para bundle moderno

## Convenção de Commits

Utilizamos [Conventional Commits](https://www.conventionalcommits.org/) via Commitizen + Commitlint:

```
tipo(escopo): descrição curta

Tipos permitidos:
feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert

Exemplos:
feat(home): adicionar seção de habilidades com cards
fix(navbar): corrigir scroll suave em rotas internas
test(hero): cobrir handler de download do currículo
ci: configurar threshold de cobertura 80%
```

## Roadmap

- [x] Hero section com foto e download de currículo (via Cloudflare R2)
- [x] Seção de Habilidades com ícones e tags (6 categorias, max 6 tags na Home)
- [x] Página /habilidades com todas as tags completas
- [x] Página /experiencias (Trajetória & Formação em abas: experiência, formação, certificações)
- [x] Seção Trajetória (timeline de experiências profissionais)
- [x] Formulário de contato (UI + banner "em desenvolvimento")
- [x] Navbar responsiva com scroll suave e menu mobile
- [x] NavbarSimples para páginas internas (logo + botão Voltar)
- [x] Footer premium (redes sociais, status de disponibilidade, cargo)
- [x] Componente Logo reutilizável (IMSANTT[icon]TECH)
- [x] Componentes UI reutilizáveis (CardExperiencia com fragments)
- [x] Hooks customizados com SWR (useHabilidades, useExperiencias, useConfiguracao)
- [x] Hook useAcessarLinkExterno para links externos seguros
- [x] Lazy loading por seção com Suspense + ErrorBoundary
- [x] Fragments de skeleton e error para todos os componentes
- [x] ErrorBoundary por card individual (isolamento de falhas)
- [x] Stubs centralizados em `src/stubs/` (fonte única de dados mock)
- [x] Configuração do site gerenciável (redes sociais, cargo, disponibilidade)
- [x] Página 404
- [x] Design System com tokens centralizados em rem
- [x] Logger estruturado (produção-aware)
- [x] Observabilidade com Sentry (tracing, replay, logs e release tracking)
- [x] Rate limiter client-side
- [x] Validação e sanitização de inputs
- [x] Deploy Cloudflare Pages com branching strategy (stage → main)
- [x] Headers e políticas de segurança no Cloudflare Pages
- [x] SEO completo (Open Graph, JSON-LD, sitemap dinâmico, robots.txt)
- [x] Headers de segurança (CSP, HSTS, X-Frame-Options)
- [x] Testes unitários com cobertura ≥ 80%
- [x] Husky + Commitlint + pre-push (coverage + build)
- [x] CI com lint + audit + coverage + build
- [x] Husky `pre-push` alinhado ao CI (lint + coverage + build)
- [x] Code splitting (vendor-react, vendor-ui)
- [x] Documentação técnica e auditorias de segurança
- [x] Contrato de dados validado em runtime com Zod na borda dos services
- [x] Mappers isolados (fonte bruta → domínio) por área
- [x] Integração Supabase para dados dinâmicos (experiências, certificações, formação, configuração) com fallback sinalizado para stub
- [x] Postura de segurança de dados documentada (RLS, deny-by-default, server-side)
- [ ] Seção Projetos (portfolio)
- [ ] Seção Impacto Social (Potenc[IA], Guardiões Digitais)
- [ ] Integração Supabase para formulário de contato
- [ ] Migração de Habilidades para dados remotos (resolvedor de ícone/cor via allowlist)
- [ ] Docker Compose para desenvolvimento local (MinIO + Supabase)
- [ ] Painel Admin (/admin)
- [ ] Animações avançadas com Framer Motion
- [ ] GitHub Actions: sync automático do stage após merge na main

## Documentação

| Documento           | Descrição                                                   |
| ------------------- | ----------------------------------------------------------- |
| `docs/BRANCHING.md` | Estratégia de branches e ambientes                          |
| `docs/seguranca/`   | Auditorias de segurança (14/08, 17/08/2026)                 |
| `docs/analises/`    | Avaliação técnica e roadmap do projeto                      |
| `SECURITY.md`       | Postura de segurança de dados + reporte de vulnerabilidades |

## Licença

Código-fonte privado. Todos os direitos reservados © Robert Santos.
