# IMSANTT.DEV

Portfolio pessoal e vitrine profissional de **Robert Santos** — Engenheiro de Software Sênior, Arquiteto e Estrategista em Tecnologia & IA.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Chakra UI](https://img.shields.io/badge/Chakra_UI-3-319795?logo=chakraui&logoColor=white)
![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare_Pages-F38020?logo=cloudflare&logoColor=white)

---

## Visão Geral

Aplicação web moderna construída com foco em performance, acessibilidade e experiência do desenvolvedor. Serve como ponto central de presença online, apresentando trajetória, expertise técnica, projetos e iniciativas de impacto social.

## Stack

| Camada           | Tecnologia                          |
| ---------------- | ----------------------------------- |
| Framework        | React 19                            |
| Build            | Vite 8                              |
| Linguagem        | TypeScript 6                        |
| UI Library       | Chakra UI v3                        |
| Roteamento       | React Router v7                     |
| Ícones           | React Icons                         |
| Backend (futuro) | Supabase                            |
| Deploy           | Cloudflare Pages                    |
| CI/CD            | GitHub Actions                      |
| Commits          | Commitizen + Conventional Changelog |

## Estrutura do Projeto

```
src/
├── assets/              # Imagens e SVGs
├── components/
│   └── layout/          # Navbar, Footer (globais)
├── features/
│   └── home/            # Feature-by-folder
│       ├── components/  # Hero, Expertise, Contato
│       └── Home.tsx     # Composição da feature
├── hooks/               # Custom hooks (useScrollSuave)
├── lib/
│   ├── supabase.ts      # Cliente singleton
│   └── tema/            # Chakra UI theme (tokens, globalCss)
├── pages/               # Lazy page exports + 404
├── routes/              # AppRoutes com Suspense
├── services/            # Camada de API
├── types/               # TypeScript global types
├── App.tsx
└── main.tsx
```

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

# Configure as variáveis de ambiente
cp .env.example .env
# Edite .env com suas chaves do Supabase

# Inicie o servidor de desenvolvimento
npm run dev
```

### Scripts disponíveis

| Comando           | Descrição                                  |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Servidor de desenvolvimento com HMR        |
| `npm run build`   | Type check + build de produção             |
| `npm run preview` | Preview local do build de produção         |
| `npm run lint`    | Lint com ESLint                            |
| `npm run commit`  | Commit interativo com Conventional Commits |

## Deploy

O projeto é deployado automaticamente no **Cloudflare Pages** via GitHub Actions.

- **Push em `main`** → deploy de produção
- **Pull Request** → preview deployment com URL única

### Variáveis necessárias (GitHub Secrets)

| Secret                   | Descrição                         |
| ------------------------ | --------------------------------- |
| `CLOUDFLARE_API_TOKEN`   | Token de API do Cloudflare        |
| `CLOUDFLARE_ACCOUNT_ID`  | ID da conta Cloudflare            |
| `VITE_SUPABASE_URL`      | URL do projeto Supabase           |
| `VITE_SUPABASE_ANON_KEY` | Chave anônima pública do Supabase |

## Convenção de Commits

Utilizamos [Conventional Commits](https://www.conventionalcommits.org/) via Commitizen:

```
tipo(escopo): descrição curta

Exemplos:
feat(home): adicionar seção de expertise com cards
fix(navbar): corrigir scroll suave em rotas internas
docs: atualizar README com instruções de deploy
chore: configurar workflow do Cloudflare Pages
```

## Roadmap

- [x] Hero section com foto e CTAs
- [x] Seção de Expertise com cards e ícones
- [x] Formulário de contato (UI)
- [x] Navbar responsiva com scroll suave
- [x] Página 404
- [x] Tema Chakra UI customizado (dark)
- [x] Deploy Cloudflare Pages
- [ ] Seção Trajetória (timeline)
- [ ] Seção Projetos (portfolio)
- [ ] Seção Impacto Social (Potenc[IA], Guardiões Digitais)
- [ ] Integração Supabase para formulário de contato
- [ ] Painel Admin (/admin)
- [ ] Animações com Framer Motion
- [ ] SEO e Open Graph tags

## Licença

Código-fonte privado. Todos os direitos reservados © Robert Santos.
