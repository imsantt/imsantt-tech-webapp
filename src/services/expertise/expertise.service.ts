import { FaCode, FaMicrochip, FaPeopleGroup } from "react-icons/fa6";
import type { Expertise } from "@/types/expertise";
import { cores } from "@/lib/tema/tokens";

/**
 * Service de expertises/competências.
 * Atualmente retorna dados mock.
 * Futuramente: supabase.from('expertises').select('*').order('ordem')
 */

const MOCK_EXPERTISES: Expertise[] = [
  {
    id: "arquitetura",
    icone: FaCode,
    iconeBg: cores.secundaria.sutil,
    iconeColor: cores.secundaria.DEFAULT,
    titulo: "Arquitetura & Clean Code",
    descricao:
      "Microsserviços escaláveis, Hexagonal Architecture, NestJS, Node.js, Fastify e React.",
    tecnologias: ["NestJS", "Node.js", "Fastify", "React", "Hexagonal Arch"],
  },
  {
    id: "ia-cloud",
    icone: FaMicrochip,
    iconeBg: "rgba(168, 85, 247, 0.2)",
    iconeColor: "#c084fc",
    titulo: "Estratégia de IA & Cloud",
    descricao:
      "Ecossistemas nativos em nuvem (AWS Serverless, Terraform) integrados a inteligência artificial.",
    tecnologias: ["AWS Lambda", "Terraform", "Serverless", "LLMs", "RAG"],
  },
  {
    id: "lideranca",
    icone: FaPeopleGroup,
    iconeBg: cores.sucesso.sutil,
    iconeColor: cores.sucesso.claro,
    titulo: "Liderança Inclusiva",
    descricao:
      "Co-idealizador das iniciativas Pret[IA] e Guardiões Digitais para democratização da tecnologia.",
    tecnologias: ["Mentoria", "Pret[IA]", "Guardiões Digitais", "EDI"],
  },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function listarExpertises(): Promise<Expertise[]> {
  await delay(200);
  return MOCK_EXPERTISES;
}
