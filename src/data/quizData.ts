// src/data/quizData.ts

/**
 * Interface que define a estrutura de cada pergunta do Quiz.
 */
export interface Question {
  id: number;
  text: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  points: number;
}

/**
 * Interface que define a estrutura das conquistas (gamificação).
 */
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  requiredScore: number;
}

/**
 * Array de perguntas focadas na apresentação "Cloud Transition Navigator".
 * Cada pergunta vale 20 pontos, totalizando 100 pontos.
 */
export const questions: Question[] = [
  {
    id: 1,
    text: "QUAL É A NOSSA META DE REDUÇÃO NO CUSTO POR TRANSAÇÃO (KPI) EM 12 MESES APÓS A MIGRAÇÃO PARA A CLOUD?",
    options: [
      { label: "A", text: "10% de redução, mantendo parte no datacenter físico" },
      { label: "B", text: "25% de redução, adotando o modelo Replatform" },
      { label: "C", text: "40% de redução no TCO comparado ao datacenter atual" }, // Correta baseada nos KPIs
      { label: "D", text: "O custo se manterá igual, mas ganharemos em latência" },
    ],
    correctAnswer: "C",
    points: 20,
  },
  {
    id: 2,
    text: "QUAL PROVEDOR DE NUVEM FOI RECOMENDADO COMO PRIMÁRIO PARA NOSSA MIGRAÇÃO E POR QUAL MOTIVO?",
    options: [
      { label: "A", text: "Google Cloud (GCP) pelo seu foco exclusivo em Machine Learning" },
      { label: "B", text: "AWS, devido à maturidade em serviços financeiros e forte presença regional (São Paulo)" }, // Correta baseada nos slides de comparação
      { label: "C", text: "Azure, para priorizar a adoção de licenças da Microsoft" },
      { label: "D", text: "Manteremos 100% On-Premises por questões de segurança" },
    ],
    correctAnswer: "B",
    points: 20,
  },
  {
    id: 3,
    text: "A SEGURANÇA É INEGOCIÁVEL. COMO GARANTIREMOS A PROTEÇÃO DOS DADOS DE PAGAMENTO NA NUVEM?",
    options: [
      { label: "A", text: "Criptografia AES-256 em repouso, TLS 1.3 em trânsito e provedor certificado PCI-DSS" }, // Correta baseada no slide de Segurança
      { label: "B", text: "Transferindo a responsabilidade integral da segurança para a AWS" },
      { label: "C", text: "Usando criptografia apenas em dados arquivados para não impactar a latência" },
      { label: "D", text: "Mantendo os dados de cartão estritamente no nosso datacenter atual" },
    ],
    correctAnswer: "A",
    points: 20,
  },
  {
    id: 4,
    text: "O QUE SERÁ VALIDADO NA FASE 1 (PILOTO) DA NOSSA ESTRATÉGIA DE MIGRAÇÃO?",
    options: [
      { label: "A", text: "O descomissionamento completo dos 150 servidores atuais" },
      { label: "B", text: "A migração de todas as 4 ondas de sistemas secundários" },
      { label: "C", text: "A migração do gateway de pagamentos para validar latência < 50ms p95 e conformidade" }, // Correta baseada nas Fases de migração
      { label: "D", text: "A assinatura do contrato de conectividade dedicada (Direct Connect)" },
    ],
    correctAnswer: "C",
    points: 20,
  },
  {
    id: 5,
    text: "QUAL ESTRATÉGIA UTILIZAREMOS PARA MITIGAR O RISCO DE 'VENDOR LOCK-IN' (DEPENDÊNCIA DE UM ÚNICO PROVEDOR)?",
    options: [
      { label: "A", text: "Contratos curtos de 1 ano com os provedores de nuvem" },
      { label: "B", text: "Uso de containers (Kubernetes), APIs abertas e infraestrutura como código portátil (Terraform)" }, // Correta baseada nos Riscos
      { label: "C", text: "Utilização exclusiva de bancos de dados proprietários da nuvem" },
      { label: "D", text: "Recusa em utilizar serviços de nuvem pública" },
    ],
    correctAnswer: "B",
    points: 20,
  },
];

/**
 * Array de conquistas ajustado tematicamente para o seu projeto de migração.
 */
export const initialAchievements: Achievement[] = [
  {
    id: "level1",
    title: "PREPARAÇÃO CONCLUÍDA",
    description: "Acertou 1 pergunta. Você deu o primeiro passo na jornada para a nuvem!",
    icon: "🚀",
    unlocked: false,
    requiredScore: 20,
  },
  {
    id: "level2",
    title: "PILOTO VALIDADO",
    description: "Acertou 3 perguntas. A latência está ótima e o PCI-DSS aprovado!",
    icon: "🛡️",
    unlocked: false,
    requiredScore: 60,
  },
  {
    id: "master",
    title: "ARQUITETO CLOUD MASTER",
    description: "Acertou todas! O datacenter foi descomissionado com sucesso!",
    icon: "☁️",
    unlocked: false,
    requiredScore: 100,
  },
];