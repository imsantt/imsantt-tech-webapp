# Security Policy

## Postura de segurança de dados

Diretrizes que valem para a fonte de dados atual e para qualquer backend que
venha a ser plugado no futuro. São agnósticas de provedor — o "como" (SQL, RLS,
API) pertence ao repositório do backend/banco; aqui fica o "o quê".

- **Segurança mora no servidor, não no cliente.** A validação de schema no
  frontend (`src/schemas/**`) é defesa em profundidade e UX; nunca é a regra de
  acesso. Autenticação e autorização são responsabilidade do servidor.
- **Negar por padrão.** O acesso a dados deve partir de "tudo negado" e liberar
  explicitamente o que é público. Hoje o conteúdo é um portfolio: leitura
  pública, escrita restrita a um contexto administrativo confiável.
- **Chaves públicas não são autorização.** A chave anônima
  (`VITE_SUPABASE_ANON_KEY`) vai no bundle e é pública por natureza. Ela não
  autoriza nada por si só — a regra de acesso vive no servidor.
- **Segredos fora do repositório.** Credenciais de serviço, senha de banco e
  connection strings nunca entram no código nem em arquivos versionados. Apenas
  placeholders em `.env.example`; valores reais só em `.env` (ignorado pelo git).
- **Escrita sempre validada no servidor.** Toda mutação passa por validação e
  autorização no servidor, independentemente do que o cliente já validou.
- **Evolução para conteúdo privado.** Ao surgir área privada ou papéis, a
  autorização deve ser expressa em regras de servidor (policies/roles), nunca
  em checagens no cliente.

## Versões Suportadas

| Versão        | Suportada |
| ------------- | --------- |
| main (latest) | ✅        |

## Reportando uma Vulnerabilidade

Se você encontrou uma vulnerabilidade de segurança neste projeto, **NÃO** abra uma issue pública.

Entre em contato diretamente:

- **Email:** contato@imsantt.tech
- **Assunto:** [SECURITY] Descrição breve

### O que incluir no report:

1. Descrição da vulnerabilidade
2. Passos para reproduzir
3. Impacto potencial
4. Sugestão de correção (se tiver)

### Tempo de resposta esperado:

- Confirmação de recebimento: até 48h
- Avaliação inicial: até 7 dias
- Correção (se confirmada): até 30 dias

Vulnerabilidades confirmadas receberão crédito público (se desejado pelo reporter) após a correção ser deployada.
