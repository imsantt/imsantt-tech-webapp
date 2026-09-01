import {
  FaCode,
  FaMicrochip,
  FaPeopleGroup,
  FaCloud,
  FaLaptopCode,
  FaCheckDouble,
  FaAws,
  FaCss3,
} from "react-icons/fa6";
import {
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiReact,
  SiNextdotjs,
  SiNestjs,
  SiFastify,
  SiAngular,
  SiHtml5,
  SiTailwindcss,
  SiChakraui,
  SiPhp,
  SiPython,
  SiTerraform,
  SiDocker,
  SiGithubactions,
  SiServerless,
  SiCloudflare,
  SiKubernetes,
  SiLangchain,
  SiPostgresql,
  SiRedis,
  SiSupabase,
  SiVitest,
  SiJest,
  SiTestinglibrary,
  SiCypress,
  SiGit,
  SiMongodb,
} from "react-icons/si";
import { TbLambda, TbPrompt, TbSql } from "react-icons/tb";
import { TiCloudStorage } from "react-icons/ti";
import { GrTest } from "react-icons/gr";
import { MdIntegrationInstructions } from "react-icons/md";
import { DiScrum } from "react-icons/di";
import { PiKanban } from "react-icons/pi";
import type { CategoriaHabilidade } from "@/types/habilidade";
import { cores } from "@/lib/tema/tokens";

export const STUB_HABILIDADES: CategoriaHabilidade[] = [
  {
    id: "arquitetura",
    titulo: "Arquitetura & Clean Code",
    descricao:
      "Microsserviços escaláveis, Hexagonal Architecture, NestJS, Node.js, Fastify e React.",
    cor: cores.category.violet.base,
    corFundo: cores.category.violet.bg,
    corBorda: cores.category.violet.border,
    corGlow: cores.category.violet.glow,
    icone: FaCode,
    iconeBg: cores.category.violet.bg,
    iconeColor: cores.category.violet.base,
    habilidades: [
      {
        nome: "Microsserviços",
        nivel: "especialista",
        descricao:
          "Decomposição de domínios em serviços independentes, com comunicação assíncrona e deploy isolado.",
      },
      {
        nome: "Hexagonal Architecture",
        nivel: "especialista",
        descricao:
          "Isolamento do domínio via ports & adapters, mantendo regras de negócio livres de detalhes de infra.",
      },
      {
        nome: "Clean Architecture",
        nivel: "especialista",
        descricao:
          "Camadas com dependências apontando para o domínio, garantindo testabilidade e independência de frameworks.",
      },
      {
        nome: "Domain-Driven Design",
        nivel: "avancado",
        descricao:
          "Modelagem estratégica e tática do negócio: bounded contexts, agregados e linguagem ubíqua.",
      },
      {
        nome: "Event-Driven Architecture",
        nivel: "avancado",
        descricao:
          "Fluxos reativos orientados a eventos, com desacoplamento temporal e escalabilidade horizontal.",
      },
      {
        nome: "CQRS",
        nivel: "avancado",
        descricao:
          "Separação de comandos e consultas para otimizar leitura, escrita e consistência conforme o caso de uso.",
      },
      {
        nome: "Design Patterns",
        nivel: "especialista",
        descricao:
          "Aplicação pragmática de padrões (Strategy, Factory, Adapter) para resolver problemas recorrentes.",
      },
      {
        nome: "SOLID",
        nivel: "especialista",
        descricao:
          "Princípios de design orientado a objetos que sustentam código coeso, desacoplado e evolutivo.",
      },
      {
        nome: "API REST",
        nivel: "especialista",
        descricao:
          "Design de APIs consistentes, versionadas e bem documentadas seguindo boas práticas HTTP.",
      },
      {
        nome: "GraphQL",
        nivel: "proficiente",
        descricao:
          "Esquemas tipados com resolvers eficientes, evitando over-fetching e under-fetching.",
      },
      {
        nome: "gRPC",
        nivel: "proficiente",
        descricao:
          "Comunicação binária de alta performance entre serviços via contratos Protobuf.",
      },
    ],
  },
  {
    id: "desenvolvimento",
    titulo: "Desenvolvimento",
    descricao:
      "Stack moderna com TypeScript, React, Node.js e ferramentas de alta produtividade.",
    cor: cores.category.emerald.base,
    corFundo: cores.category.emerald.bg,
    corBorda: cores.category.emerald.border,
    corGlow: cores.category.emerald.glow,
    icone: FaLaptopCode,
    iconeBg: cores.category.emerald.bg,
    iconeColor: cores.category.emerald.base,
    habilidades: [
      {
        nome: "TypeScript",
        icone: SiTypescript,
        nivel: "especialista",
        descricao:
          "Tipagem estática avançada, generics e inferência para APIs seguras e código autodocumentado.",
      },
      {
        nome: "JavaScript",
        icone: SiJavascript,
        nivel: "especialista",
        descricao:
          "Domínio de ES moderno, async/await, closures e o event loop no browser e no Node.",
      },
      {
        nome: "Node.js",
        icone: SiNodedotjs,
        nivel: "especialista",
        descricao:
          "Backends performáticos orientados a eventos, streams e I/O não bloqueante.",
      },
      {
        nome: "React",
        icone: SiReact,
        nivel: "especialista",
        descricao:
          "Interfaces declarativas com hooks, composição de componentes e renderização otimizada.",
      },
      {
        nome: "Next.js",
        icone: SiNextdotjs,
        nivel: "avancado",
        descricao:
          "SSR, SSG e App Router para aplicações React rápidas e amigáveis a SEO.",
      },
      {
        nome: "NestJS",
        icone: SiNestjs,
        nivel: "especialista",
        descricao:
          "Backend modular com injeção de dependências, ideal para arquiteturas limpas e escaláveis.",
      },
      {
        nome: "Fastify",
        icone: SiFastify,
        nivel: "avancado",
        descricao:
          "Framework HTTP de baixa sobrecarga com validação por schema e alta throughput.",
      },
      {
        nome: "Angular",
        icone: SiAngular,
        nivel: "proficiente",
        descricao:
          "SPAs corporativas com RxJS, injeção de dependências e arquitetura opinativa.",
      },
      {
        nome: "HTML5",
        icone: SiHtml5,
        nivel: "especialista",
        descricao:
          "Marcação semântica e acessível como base sólida para qualquer interface web.",
      },
      {
        nome: "CSS3",
        icone: FaCss3,
        nivel: "avancado",
        descricao:
          "Layouts responsivos com Flexbox, Grid e animações performáticas.",
      },
      {
        nome: "Tailwind CSS",
        icone: SiTailwindcss,
        nivel: "avancado",
        descricao:
          "Estilização utilitária consistente e rápida, com design system tokenizado.",
      },
      {
        nome: "Chakra UI",
        icone: SiChakraui,
        nivel: "avancado",
        descricao:
          "Componentes acessíveis e temáveis para construir interfaces com velocidade.",
      },
      {
        nome: "PHP",
        icone: SiPhp,
        nivel: "proficiente",
        descricao:
          "Manutenção e evolução de sistemas legados e APIs com foco em estabilidade.",
      },
      {
        nome: "Python",
        icone: SiPython,
        nivel: "proficiente",
        descricao:
          "Automação, scripts e integrações de dados/IA com bibliotecas do ecossistema.",
      },
    ],
  },
  {
    id: "cloud-devops",
    titulo: "Cloud & DevOps",
    descricao:
      "Ecossistemas nativos em nuvem (AWS Serverless, Terraform) com pipelines automatizados.",
    cor: cores.category.cyan.base,
    corFundo: cores.category.cyan.bg,
    corBorda: cores.category.cyan.border,
    corGlow: cores.category.cyan.glow,
    icone: FaCloud,
    iconeBg: cores.category.cyan.bg,
    iconeColor: cores.category.cyan.base,
    habilidades: [
      {
        nome: "AWS",
        icone: FaAws,
        nivel: "avancado",
        descricao:
          "Arquiteturas na nuvem com serviços gerenciados, foco em custo, segurança e resiliência.",
      },
      {
        nome: "Lambda",
        icone: TbLambda,
        nivel: "avancado",
        descricao:
          "Funções serverless orientadas a eventos, escalando automaticamente sob demanda.",
      },
      {
        nome: "S3",
        icone: TiCloudStorage,
        nivel: "avancado",
        descricao:
          "Armazenamento de objetos durável para assets, backups e hospedagem estática.",
      },
      {
        nome: "CloudFront",
        nivel: "proficiente",
        descricao:
          "CDN global para entrega de conteúdo com baixa latência e cache na borda.",
      },
      {
        nome: "Terraform",
        icone: SiTerraform,
        nivel: "avancado",
        descricao:
          "Infraestrutura como código versionada, reprodutível e multi-provedor.",
      },
      {
        nome: "Docker",
        icone: SiDocker,
        nivel: "especialista",
        descricao:
          "Containerização de aplicações para ambientes consistentes do dev à produção.",
      },
      {
        nome: "CI/CD",
        nivel: "avancado",
        descricao:
          "Pipelines de integração e entrega contínua para deploys frequentes e seguros.",
      },
      {
        nome: "GitHub Actions",
        icone: SiGithubactions,
        nivel: "avancado",
        descricao:
          "Automação de build, teste e deploy diretamente no fluxo do repositório.",
      },
      {
        nome: "Serverless",
        icone: SiServerless,
        nivel: "avancado",
        descricao:
          "Arquiteturas sem servidor que reduzem overhead operacional e escalam elasticamente.",
      },
      {
        nome: "Cloudflare",
        icone: SiCloudflare,
        nivel: "proficiente",
        descricao:
          "CDN, DNS e proteção na borda com Workers para lógica próxima ao usuário.",
      },
      {
        nome: "Kubernetes",
        icone: SiKubernetes,
        nivel: "proficiente",
        descricao:
          "Orquestração de containers com autoescala, self-healing e deploys declarativos.",
      },
    ],
  },
  {
    id: "ia-dados",
    titulo: "Estratégia de IA & Dados",
    descricao:
      "Inteligência artificial aplicada, automação com LLMs e bancos de dados de alta performance.",
    cor: cores.category.amber.base,
    corFundo: cores.category.amber.bg,
    corBorda: cores.category.amber.border,
    corGlow: cores.category.amber.glow,
    icone: FaMicrochip,
    iconeBg: cores.category.amber.bg,
    iconeColor: cores.category.amber.base,
    habilidades: [
      {
        nome: "LLMs",
        nivel: "avancado",
        descricao:
          "Integração de grandes modelos de linguagem em produtos, com foco em contexto e custo.",
      },
      {
        nome: "RAG",
        nivel: "avancado",
        descricao:
          "Geração aumentada por recuperação, combinando busca vetorial com LLMs para respostas fundamentadas.",
      },
      {
        nome: "Prompt Engineering",
        icone: TbPrompt,
        nivel: "avancado",
        descricao:
          "Desenho de prompts e guardrails para saídas confiáveis, consistentes e seguras.",
      },
      {
        nome: "LangChain",
        icone: SiLangchain,
        nivel: "proficiente",
        descricao:
          "Orquestração de cadeias, agentes e ferramentas para pipelines de IA compostos.",
      },
      {
        nome: "Embeddings",
        nivel: "avancado",
        descricao:
          "Representações vetoriais para busca semântica, similaridade e clustering.",
      },
      {
        nome: "Automação com IA",
        nivel: "avancado",
        descricao:
          "Fluxos que combinam IA e integrações para eliminar trabalho manual repetitivo.",
      },
      {
        nome: "SQL",
        icone: TbSql,
        nivel: "especialista",
        descricao:
          "Consultas otimizadas, modelagem relacional e tuning de performance.",
      },
      {
        nome: "MongoDB",
        icone: SiMongodb,
        nivel: "avancado",
        descricao:
          "Modelagem de documentos flexível para dados semiestruturados e alta escala.",
      },
      {
        nome: "PostgreSQL",
        icone: SiPostgresql,
        nivel: "especialista",
        descricao:
          "Banco relacional robusto com recursos avançados: JSONB, índices e extensões.",
      },
      {
        nome: "Redis",
        icone: SiRedis,
        nivel: "avancado",
        descricao:
          "Cache e estruturas em memória para baixa latência, filas e pub/sub.",
      },
      {
        nome: "Supabase",
        icone: SiSupabase,
        nivel: "avancado",
        descricao:
          "Backend gerenciado sobre Postgres com auth, storage e realtime prontos.",
      },
    ],
  },
  {
    id: "comunicacao-lideranca",
    titulo: "Liderança & Comunicação",
    descricao:
      "Desenvolvimento de pessoas, mentoria técnica e alinhamento entre engenharia e negócio.",
    cor: cores.category.gold.base,
    corFundo: cores.category.gold.bg,
    corBorda: cores.category.gold.border,
    corGlow: cores.category.gold.glow,
    icone: FaPeopleGroup,
    iconeBg: cores.category.gold.bg,
    iconeColor: cores.category.gold.base,
    habilidades: [
      {
        nome: "Mentoria Técnica",
        nivel: "especialista",
        descricao:
          "Acompanhamento individual para acelerar o crescimento técnico e de carreira do time.",
      },
      {
        nome: "Liderança de Squads",
        nivel: "avancado",
        descricao:
          "Condução de times de produto com foco em autonomia, clareza de metas e entrega.",
      },
      {
        nome: "Comunicação Assertiva",
        nivel: "especialista",
        descricao:
          "Traduzir complexidade técnica em decisões claras para stakeholders e negócio.",
      },
      {
        nome: "Code Review",
        nivel: "especialista",
        descricao:
          "Revisões construtivas que elevam a qualidade do código e disseminam conhecimento.",
      },
      {
        nome: "Pair Programming",
        nivel: "avancado",
        descricao:
          "Programação em par para compartilhar contexto e reduzir defeitos na origem.",
      },
      {
        nome: "Facilitação",
        nivel: "avancado",
        descricao:
          "Condução de cerimônias e discussões técnicas produtivas e inclusivas.",
      },
      {
        nome: "Gestão de Conhecimento",
        nivel: "avancado",
        descricao:
          "Documentação viva e práticas que preservam o conhecimento do time.",
      },
      {
        nome: "Tech Talks",
        nivel: "proficiente",
        descricao:
          "Palestras internas para difundir boas práticas e novas tecnologias.",
      },
    ],
  },
  {
    id: "qualidade",
    titulo: "Qualidade & Processos",
    descricao:
      "TDD, testes automatizados e processos ágeis para entregas confiáveis.",
    cor: cores.category.rose.base,
    corFundo: cores.category.rose.bg,
    corBorda: cores.category.rose.border,
    corGlow: cores.category.rose.glow,
    icone: FaCheckDouble,
    iconeBg: cores.category.rose.bg,
    iconeColor: cores.category.rose.base,
    habilidades: [
      {
        nome: "TDD",
        nivel: "especialista",
        descricao:
          "Desenvolvimento guiado por testes para design incremental e confiança nas mudanças.",
      },
      {
        nome: "Testes Unitários",
        icone: GrTest,
        nivel: "especialista",
        descricao:
          "Cobertura de regras de negócio isoladas, rápidas e determinísticas.",
      },
      {
        nome: "Testes de Integração",
        icone: MdIntegrationInstructions,
        nivel: "avancado",
        descricao:
          "Validação da colaboração entre módulos, banco e serviços externos.",
      },
      {
        nome: "Vitest",
        icone: SiVitest,
        nivel: "especialista",
        descricao:
          "Runner de testes rápido e moderno, nativo do ecossistema Vite.",
      },
      {
        nome: "Jest",
        icone: SiJest,
        nivel: "avancado",
        descricao:
          "Framework de testes maduro com mocks, snapshots e ampla adoção.",
      },
      {
        nome: "Testing Library",
        icone: SiTestinglibrary,
        nivel: "avancado",
        descricao:
          "Testes centrados no usuário, focados em comportamento e acessibilidade.",
      },
      {
        nome: "Cypress",
        icone: SiCypress,
        nivel: "proficiente",
        descricao:
          "Testes end-to-end confiáveis que validam jornadas reais no navegador.",
      },
      {
        nome: "Git Flow",
        icone: SiGit,
        nivel: "avancado",
        descricao:
          "Estratégia de branches organizada para colaboração e releases previsíveis.",
      },
      {
        nome: "Conventional Commits",
        nivel: "especialista",
        descricao:
          "Histórico padronizado que habilita versionamento e changelogs automáticos.",
      },
      {
        nome: "Scrum",
        icone: DiScrum,
        nivel: "avancado",
        descricao:
          "Framework ágil com sprints, cerimônias e melhoria contínua.",
      },
      {
        nome: "Kanban",
        icone: PiKanban,
        nivel: "avancado",
        descricao:
          "Fluxo contínuo com limite de WIP para maximizar previsibilidade e vazão.",
      },
    ],
  },
];
