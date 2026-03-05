export interface Question {
  id: number;
  text: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  points: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  requiredScore: number;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "QUAL É A PRINCIPAL VANTAGEM DA CLOUD COMPUTING SOBRE UM SERVIDOR LOCAL (NUVEM) EM TERMOS DE ESCALABILIDADE?",
    options: [
      { label: "A", text: "Servidores locais escalam mais rápido que a cloud" },
      { label: "B", text: "A cloud permite escalar recursos sob demanda, sem necessidade de comprar hardware" },
      { label: "C", text: "Não há diferença de escalabilidade entre cloud e servidor local" },
      { label: "D", text: "Servidores locais oferecem escalabilidade infinita" },
    ],
    correctAnswer: "B",
    points: 20,
  },
  {
    id: 2,
    text: "POR QUE A CLOUD É CONSIDERADA MAIS ECONÔMICA QUE MANTER UM DATACENTER LOCAL?",
    options: [
      { label: "A", text: "Porque a cloud é sempre gratuita" },
      { label: "B", text: "Porque elimina custos de manutenção física, energia e equipe dedicada de infraestrutura" },
      { label: "C", text: "Porque servidores locais não consomem energia" },
      { label: "D", text: "Porque datacenters locais não precisam de segurança" },
    ],
    correctAnswer: "B",
    points: 20,
  },
  {
    id: 3,
    text: "QUAL MODELO DE SERVIÇO CLOUD PERMITE QUE A EMPRESA FOQUE APENAS NO CÓDIGO DA APLICAÇÃO?",
    options: [
      { label: "A", text: "IaaS (Infrastructure as a Service)" },
      { label: "B", text: "Datacenter On-Premises" },
      { label: "C", text: "PaaS (Platform as a Service)" },
      { label: "D", text: "Colocation" },
    ],
    correctAnswer: "C",
    points: 20,
  },
  {
    id: 4,
    text: "EM TERMOS DE DISASTER RECOVERY, QUAL É A VANTAGEM DA CLOUD SOBRE UM SERVIDOR LOCAL?",
    options: [
      { label: "A", text: "Servidores locais possuem backup automático em múltiplas regiões" },
      { label: "B", text: "A cloud oferece replicação geográfica automática e RPO/RTO muito menores" },
      { label: "C", text: "Não há diferença em disaster recovery" },
      { label: "D", text: "Servidores locais são imunes a desastres" },
    ],
    correctAnswer: "B",
    points: 20,
  },
  {
    id: 5,
    text: "POR QUE GRANDES EMPRESAS ESTÃO MIGRANDO DE DATACENTERS LOCAIS PARA A CLOUD?",
    options: [
      { label: "A", text: "Apenas por tendência de mercado, sem benefícios reais" },
      { label: "B", text: "Para reduzir custos, aumentar agilidade, melhorar segurança e acessar inovações como IA e ML" },
      { label: "C", text: "Porque servidores locais são mais modernos" },
      { label: "D", text: "Porque a cloud não possui custos" },
    ],
    correctAnswer: "B",
    points: 20,
  },
];

export const initialAchievements: Achievement[] = [
  { id: "level1", title: "NÍVEL 1 ALCANÇADO", description: "Acerte 1 pergunta", icon: "🏆", unlocked: false, requiredScore: 20 },
  { id: "level2", title: "NÍVEL 2 ALCANÇADO", description: "Acerte 3 perguntas", icon: "⭐", unlocked: false, requiredScore: 60 },
  { id: "master", title: "MESTRE DA CLOUD", description: "Acerte todas as perguntas", icon: "👑", unlocked: false, requiredScore: 100 },
];
