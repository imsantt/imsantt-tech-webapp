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

Aplicação web moderna construída com foco em performance, acessibilidade e experiência do desenvolvedor. Serve como ponto central de presença online, apresentando trajetória, expertise técnica, projetos e iniciativas de impacto social.

**Produção:** [imsantt.dev](https://imsantt.dev)

## Stack

| Camada           | Tecnologia                                                   |
| ---------------- | ------------------------------------------------------------ |
| Framework        | React 19                                                     |
| Build            | Vite 8                                                       |
| Linguagem        | TypeScript 6                                                 |
| UI Library       | Chakra UI v3 + Framer Motion                                 |
| Design System    | Tokens centralizados (cores, tipografia, espaçamento em rem) |
| Roteamento       | React Router v7                                              |
| Data Fetching    | SWR                                                          |
| Datas            | Luxon                                                        |
| Ícones           | React Icons                                                  |
| Backend (futuro) | Supabase                                                     |
| Testes           | Vitest + React Testing Library                               |
| Cobertura        | v8 com threshold ≥ 80%                                       |
| Deploy           | Cloudflare Pages (Git integration)                           |
| CI               | GitHub Actions (lint + audit + coverage + build)             |
| Commits          | Husky + Commitlint + Commitizen                              |

## Estrutura do Projeto

```
src/
├── assets/                              # Imagens otimizadas (WebP)
├── components/
│   ├── layout/
│   │   ├── navbar/                      # Navbar.tsx + Navbar.spec.tsx
│   │   ├── footer/                      # Footer.tsx + Footer.spec.tsx
│   │   └── index.ts
│   └── ui/
│       ├── card-experiencia/            # CardExperiencia (timeline card)
│       ├── card-skeleton/               # CardSkeleton (loading state)
│       ├── error-boundary/              # ErrorBoundary (fallback de erro)
│       └── logo/                        # Logo.tsx + Logo.spec.tsx
├── features/
│   └── home/
│       ├── components/
│       │   ├── hero/                    # Hero.tsx + Hero.spec.tsx
│       │   ├── expertise/               # Expertise.tsx + Expertise.spec.tsx
│       │   ├── trajetoria/              # Trajetoria.tsx + Trajetoria.spec.tsx
│       │   ├── contato/                 # Contato.tsx + Contato.spec.tsx
│       │   └── index.ts
│       ├── data/                        # Dados estáticos (experiências, hero)
│       └── Home.tsx + Home.spec.tsx
├── hooks/
│   ├── use-scroll-suave/                # Navegação interna suave
│   ├── use-experiencias/                # Hook SWR para experiências
│   └── use-expertises/                  # Hook SWR para expertises
├── lib/
│   ├── env.ts                           # Variáveis de ambiente centralizadas
│   ├── logger.ts                        # Logger estruturado (prod-aware)
│   ├── rate-limiter.ts                  # Rate limiting client-side
│   ├── validacao.ts                     # Validação e sanitização de inputs
│   ├── supabase.ts                      # Cliente Supabase singleton
│   └── tema/
│       ├── tokens.ts                    # Design System (fonte única de verdade)
│       ├── cores.ts                     # Chakra tokens (importa de tokens.ts)
│       ├── global.ts                    # Global CSS (importa de tokens.ts)
│       ├── index.ts                     # createSystem
│       └── tokens.spec.ts
├── pages/
│   ├── not-found/                       # NotFound.tsx + NotFound.spec.tsx
│   └── index.ts                         # Lazy exports
├── routes/                              # AppRoutes com Suspense + lazy loading
├── services/
│   ├── contato/                         # Serviço de envio de mensagem
│   ├── experiencia/                     # Serviço de experiências profissionais
│   └── expertise/                       # Serviço de expertises técnicas
├── tests/                               # Setup + helpers (renderComProviders)
└── types/                               # TypeScript interfaces
    ├── contato.ts
    ├── experiencia.ts
    ├── expertise.ts
    └── projeto.ts
```

## Design System

O DS é centralizado em `src/lib/tema/tokens.ts` com escalas em `rem`:

```typescript
import { cores, tipografia, espacamento, raio, sombras, transicao } from "@/lib/tema/tokens";

// Uso nos componentes:
bg={cores.bg.card}
color={cores.texto.titulo}
borderRadius={raio.xl}
padding={espacamento["6"]}
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
| `layout`      | maxWidth, navbarAltura                                              |
| `breakpoints` | sm, md, lg, xl, 2xl                                                 |

## Infraestrutura de Código

### Logger Estruturado (`src/lib/logger.ts`)

- Em produção: silencia `debug`/`info`, mantém `warn`/`error`
- Em desenvolvimento: exibe tudo com contexto formatado
- Preparado para integração com serviço externo (Sentry, DataDog)

```typescript
import { logger } from "@/lib/logger";
logger.info("Mensagem enviada", { email: "user@mail.com" });
logger.error("Falha ao enviar", { erro: err });
```

### Rate Limiter (`src/lib/rate-limiter.ts`)

- Rate limiting client-side para UX (evita spam acidental)
- Padrão para formulário de contato: 3 tentativas por 5 minutos
- Não substitui rate limiting server-side

### Validação e Sanitização (`src/lib/validacao.ts`)

- Sanitização de HTML/XSS (remove tags, event handlers, javascript: protocol)
- Validação de formulário de contato (nome, email, mensagem)
- Limites de caracteres configurados

### Variáveis de Ambiente (`src/lib/env.ts`)

- Fonte única de acesso às env vars — evita cast espalhado
- Expõe `isProd`, `isDev`, URLs do Supabase

## Desenvolvimento

### Pré-requisitos

- Node.js 24+
- npm 10+

### Setup

```bash
# Clone o repositório
git clone https://github.com/imsantt/imsantt-tech-webapp.git
cd imsantt-tech-webapp

# Instale as dependências
npm install

# Configure as variáveis de ambiente (opcional — app funciona sem)
cp .env.example .env

# Inicie o servidor de desenvolvimento
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
- **Cobertura atual:** ~99% statements, ~97% branches, ~93% functions
- **Padrão de arquivos:** `*.spec.tsx` colocado na mesma pasta do componente
- **Helper:** `renderComProviders` encapsula Router + ChakraProvider

## Quality Gates

| Camada             | Quando         | O que valida                    |
| ------------------ | -------------- | ------------------------------- |
| Husky `commit-msg` | Todo commit    | Formato Conventional Commits    |
| Husky `pre-push`   | Antes de push  | Cobertura ≥ 80%                 |
| GitHub Actions CI  | Pull Requests  | Lint → Audit → Coverage → Build |
| Cloudflare Pages   | Push em `main` | Build de produção               |

## Branching Strategy

```
feature/minha-feature
        │
        ▼ (PR → stage)
      stage ──── CI: lint + audit + coverage + build
        │         Cloudflare: deploy preview em stage.*
        ▼ (PR → main)
       main ──── Cloudflare: deploy produção em imsantt.dev
```

| Branch  | Ambiente | URL                                   |
| ------- | -------- | ------------------------------------- |
| `main`  | Produção | `imsantt.dev`                         |
| `stage` | Preview  | `stage.imsantt-tech-webapp.pages.dev` |

- Features criam branch a partir de `stage`
- PRs para `stage` rodam CI completo
- PRs de `stage` para `main` são o release
- Hotfixes: branch a partir de `main`, depois cherry-pick para `stage`

## Segurança

### Headers (Cloudflare `_headers`)

- Content-Security-Policy (CSP)
- Strict-Transport-Security (HSTS)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy restritivo

### Frontend

- Sanitização de inputs (anti-XSS)
- Validação de formulários com limites definidos
- Rate limiting client-side
- Logger estruturado (sem dados sensíveis em produção)
- Source maps ocultos (`sourcemap: "hidden"`)
- Nenhum uso de `dangerouslySetInnerHTML`, `eval` ou `innerHTML`

### CI/CD

- `npm audit --audit-level=high` no pipeline
- GitHub Actions pinadas por SHA
- Dependabot configurado
- Secrets fora do repositório

### Auditorias

Auditorias de segurança documentadas em `docs/seguranca/`. Nível geral de risco: **BAIXO**.

## Deploy

O projeto é deployado automaticamente no **Cloudflare Pages** via Git integration.

- **Push em `main`** → deploy de produção
- **Pull Request** → preview deployment com URL única

### Variáveis de ambiente (Cloudflare)

| Variável                 | Descrição                                    |
| ------------------------ | -------------------------------------------- |
| `NODE_VERSION`           | `24`                                         |
| `VITE_SUPABASE_URL`      | URL do projeto Supabase (opcional por agora) |
| `VITE_SUPABASE_ANON_KEY` | Chave anônima pública (opcional por agora)   |

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
- HTML semântico (`main`, `nav`, `section`, `header`)
- `aria-label` e `aria-labelledby` nos componentes
- Responsividade com breakpoints adaptativos
- Contraste adequado no design system

## Build Otimizado

- Code splitting via `manualChunks` (vendor-react, vendor-ui)
- Lazy loading de páginas com `React.lazy` + `Suspense`
- Imagem principal em formato WebP
- Target ES2022 para bundle moderno

## Convenção de Commits

Utilizamos [Conventional Commits](https://www.conventionalcommits.org/) via Commitizen + Commitlint:

```
tipo(escopo): descrição curta

Tipos permitidos:
feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert

Exemplos:
feat(home): adicionar seção de expertise com cards
fix(navbar): corrigir scroll suave em rotas internas
test(hero): cobrir handler de download do currículo
ci: configurar threshold de cobertura 80%
```

## Roadmap

- [x] Hero section com foto e download de currículo
- [x] Seção de Expertise com ícones e tags
- [x] Seção Trajetória (timeline de experiências profissionais)
- [x] Formulário de contato (UI + banner "em desenvolvimento")
- [x] Navbar responsiva com scroll suave e menu mobile
- [x] Componente Logo reutilizável (IMSANTT[icon]TECH)
- [x] Componentes UI reutilizáveis (CardExperiencia, CardSkeleton, ErrorBoundary)
- [x] Hooks customizados com SWR (useExperiencias, useExpertises)
- [x] Página 404
- [x] Design System com tokens centralizados em rem
- [x] Logger estruturado (produção-aware)
- [x] Rate limiter client-side
- [x] Validação e sanitização de inputs
- [x] Deploy Cloudflare Pages com branching strategy (stage → main)
- [x] SEO completo (Open Graph, JSON-LD, sitemap dinâmico, robots.txt)
- [x] Headers de segurança (CSP, HSTS, X-Frame-Options)
- [x] Testes unitários com cobertura ≥ 80% (~99% atual)
- [x] Husky + Commitlint para padronização
- [x] CI com lint + audit + coverage + build
- [x] Code splitting (vendor-react, vendor-ui)
- [x] Documentação técnica e auditorias de segurança
- [ ] Seção Projetos (portfolio)
- [ ] Seção Impacto Social (Potenc[IA], Guardiões Digitais)
- [ ] Integração Supabase para formulário de contato
- [ ] Painel Admin (/admin)
- [ ] Animações avançadas com Framer Motion

## Documentação

| Documento           | Descrição                                   |
| ------------------- | ------------------------------------------- |
| `docs/BRANCHING.md` | Estratégia de branches e ambientes          |
| `docs/seguranca/`   | Auditorias de segurança (14/08, 17/08/2026) |
| `docs/analises/`    | Avaliação técnica e roadmap do projeto      |
| `SECURITY.md`       | Política de reporte de vulnerabilidades     |

## Licença

Código-fonte privado. Todos os direitos reservados © Robert Santos.
