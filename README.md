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

## Stack

| Camada           | Tecnologia                                                   |
| ---------------- | ------------------------------------------------------------ |
| Framework        | React 19                                                     |
| Build            | Vite 8                                                       |
| Linguagem        | TypeScript 6                                                 |
| UI Library       | Chakra UI v3                                                 |
| Design System    | Tokens centralizados (cores, tipografia, espaçamento em rem) |
| Roteamento       | React Router v7                                              |
| Ícones           | React Icons                                                  |
| Backend (futuro) | Supabase                                                     |
| Testes           | Vitest + React Testing Library                               |
| Cobertura        | v8 com threshold ≥ 80%                                       |
| Deploy           | Cloudflare Pages (Git integration)                           |
| CI               | GitHub Actions (lint + coverage + build)                     |
| Commits          | Husky + Commitlint + Commitizen                              |

## Estrutura do Projeto

```
src/
├── assets/                              # Imagens e SVGs
├── components/
│   ├── layout/
│   │   ├── navbar/                      # Navbar.tsx + Navbar.spec.tsx
│   │   ├── footer/                      # Footer.tsx + Footer.spec.tsx
│   │   └── index.ts
│   └── ui/
│       └── logo/                        # Logo.tsx + Logo.spec.tsx
├── features/
│   └── home/
│       ├── components/
│       │   ├── hero/                    # Hero.tsx + Hero.spec.tsx
│       │   ├── expertise/               # Expertise.tsx + Expertise.spec.tsx
│       │   ├── contato/                 # Contato.tsx + Contato.spec.tsx
│       │   └── index.ts
│       └── Home.tsx + Home.spec.tsx
├── hooks/
│   └── use-scroll-suave/                # useScrollSuave.ts + useScrollSuave.spec.tsx
├── lib/
│   ├── supabase.ts                      # Cliente singleton
│   └── tema/
│       ├── tokens.ts                    # Design System (fonte única de verdade)
│       ├── cores.ts                     # Chakra tokens (importa de tokens.ts)
│       ├── global.ts                    # Global CSS (importa de tokens.ts)
│       ├── index.ts                     # createSystem
│       └── tokens.spec.ts
├── pages/
│   ├── not-found/                       # NotFound.tsx + NotFound.spec.tsx
│   └── index.ts                         # Lazy exports
├── routes/                              # AppRoutes com Suspense
├── services/                            # Camada de API
├── tests/                               # Setup + helpers (renderComProviders)
└── types/                               # TypeScript global types
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

## Desenvolvimento

### Pré-requisitos

- Node.js 20+
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
| `npm run build`         | Type check + build de produção                    |
| `npm run preview`       | Preview local do build de produção                |
| `npm run lint`          | Lint com ESLint                                   |
| `npm run test`          | Testes unitários (single run)                     |
| `npm run test:watch`    | Testes em modo watch                              |
| `npm run test:coverage` | Testes com relatório de cobertura (threshold 80%) |
| `npm run commit`        | Commit interativo com Conventional Commits        |

## Testes

Cobertura com Vitest + React Testing Library + v8 provider.

```bash
npm run test:coverage
```

- **Threshold global:** 80% (statements, branches, functions, lines)
- **Padrão de arquivos:** `*.spec.tsx` colocado na mesma pasta do componente
- **Helper:** `renderComProviders` encapsula Router + ChakraProvider

## Quality Gates

| Camada             | Quando         | O que valida                 |
| ------------------ | -------------- | ---------------------------- |
| Husky `commit-msg` | Todo commit    | Formato Conventional Commits |
| Husky `pre-push`   | Antes de push  | Cobertura ≥ 80%              |
| GitHub Actions CI  | Pull Requests  | Lint → Coverage → Build      |
| Cloudflare Pages   | Push em `main` | Build de produção            |

## Deploy

O projeto é deployado automaticamente no **Cloudflare Pages** via Git integration.

- **Push em `main`** → deploy de produção
- **Pull Request** → preview deployment com URL única

### Variáveis de ambiente (Cloudflare)

| Variável                 | Descrição                                    |
| ------------------------ | -------------------------------------------- |
| `NODE_VERSION`           | `24` (recomendado)                           |
| `VITE_SUPABASE_URL`      | URL do projeto Supabase (opcional por agora) |
| `VITE_SUPABASE_ANON_KEY` | Chave anônima pública (opcional por agora)   |

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
- [x] Formulário de contato (UI + banner "em desenvolvimento")
- [x] Navbar responsiva com scroll suave e menu mobile
- [x] Componente Logo reutilizável (IMSANTT[icon]TECH)
- [x] Página 404
- [x] Design System com tokens centralizados em rem
- [x] Deploy Cloudflare Pages
- [x] SEO completo (Open Graph, JSON-LD, sitemap, robots.txt)
- [x] Testes unitários com cobertura ≥ 80%
- [x] Husky + Commitlint para padronização
- [ ] Seção Trajetória (timeline)
- [ ] Seção Projetos (portfolio)
- [ ] Seção Impacto Social (Potenc[IA], Guardiões Digitais)
- [ ] Integração Supabase para formulário de contato
- [ ] Painel Admin (/admin)
- [ ] Animações com Framer Motion

## Licença

Código-fonte privado. Todos os direitos reservados © Robert Santos.
