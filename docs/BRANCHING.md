# Estratégia de Branches

## Ambientes

| Branch  | Ambiente              | URL                                   | Deploy                          |
| ------- | --------------------- | ------------------------------------- | ------------------------------- |
| `main`  | Produção (PRD)        | `imsantt.dev`                         | Automático via Cloudflare Pages |
| `stage` | Desenvolvimento (DEV) | `stage.imsantt-tech-webapp.pages.dev` | Automático via Cloudflare Pages |

## Fluxo de Trabalho

```
feature/minha-feature
        │
        ▼ (PR → stage)
      stage ──── CI: lint + audit + coverage + build
        │         Cloudflare: deploy preview em stage.*
        ▼ (PR → main)
       main ──── Cloudflare: deploy produção em imsantt.dev
```

### Regras

1. **Nunca commitar direto na `main`** — sempre via PR de `stage`
2. **Features** criam branch a partir de `stage` (`feature/nome-da-feature`)
3. **PRs para `stage`** rodam CI completo (lint, audit, testes, build)
4. **PRs de `stage` para `main`** são o "release" — rodam CI novamente
5. **Hotfixes** criam branch a partir de `main` (`hotfix/descricao`) e fazem PR direto para `main`, depois cherry-pick para `stage`

### Configuração no Cloudflare Pages

No painel do projeto:

1. **Settings → Builds & deployments → Branch deployments**
2. **Production branch:** `main`
3. **Preview branches:** `stage` (e qualquer outra)
4. **Branch aliases:** Configurar `stage` → `stage.imsantt-tech-webapp.pages.dev`

### Variáveis de ambiente por ambiente

| Variável                 | Stage                         | Production                     |
| ------------------------ | ----------------------------- | ------------------------------ |
| `VITE_SUPABASE_URL`      | URL do projeto Supabase (dev) | URL do projeto Supabase (prod) |
| `VITE_SUPABASE_ANON_KEY` | Anon key (dev)                | Anon key (prod)                |
| `NODE_VERSION`           | `24`                          | `24`                           |

No Cloudflare: Settings → Environment Variables → separar por **Production** e **Preview**.
