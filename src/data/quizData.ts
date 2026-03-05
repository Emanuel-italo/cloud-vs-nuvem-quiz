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

    text: "SEGUNDO O NIST, QUAL DAS ALTERNATIVAS REPRESENTA UMA CARACTERÍSTICA ESSENCIAL DA CLOUD COMPUTING?",

    options: [

      { label: "A", text: "Compra antecipada de servidores físicos" },

      { label: "B", text: "Elasticidade rápida e provisionamento sob demanda" },

      { label: "C", text: "Uso exclusivo de infraestrutura local" },

      { label: "D", text: "Capacidade fixa sem possibilidade de expansão" },

    ],

    correctAnswer: "B",

    points: 20,

  },

  {

    id: 2,

    text: "QUAL MODELO DE SERVIÇO PERMITE QUE O CLIENTE GERENCIE APENAS O CÓDIGO DA APLICAÇÃO, ENQUANTO O PROVEDOR GERENCIA A INFRAESTRUTURA?",

    options: [

      { label: "A", text: "IaaS (Infrastructure as a Service)" },

      { label: "B", text: "On-Premises" },

      { label: "C", text: "PaaS (Platform as a Service)" },

      { label: "D", text: "Colocation" },

    ],

    correctAnswer: "C",

    points: 20,

  },

  {

    id: 3,

    text: "QUAL É A PRINCIPAL DIFERENÇA ENTRE CAPEX E OPEX NO CONTEXTO DE CLOUD COMPUTING?",

    options: [

      { label: "A", text: "CAPEX é pagamento mensal por uso e OPEX é compra de hardware" },

      { label: "B", text: "CAPEX envolve alto investimento inicial em infraestrutura, enquanto OPEX é pagamento recorrente sob demanda" },

      { label: "C", text: "Não existe diferença entre CAPEX e OPEX" },

      { label: "D", text: "OPEX exige compra de datacenter próprio" },

    ],

    correctAnswer: "B",

    points: 20,

  },

  {

    id: 4,

    text: "EM UMA NUVEM PÚBLICA, O QUE SIGNIFICA O CONCEITO DE MULTI-TENANT?",

    options: [

      { label: "A", text: "Cada cliente possui um servidor físico exclusivo" },

      { label: "B", text: "Os recursos são compartilhados entre vários clientes com isolamento lógico de dados" },

      { label: "C", text: "A nuvem é usada apenas por órgãos governamentais" },

      { label: "D", text: "Não há separação de dados entre empresas" },

    ],

    correctAnswer: "B",

    points: 20,

  },

  {

    id: 5,

    text: "QUAL É A PRINCIPAL VANTAGEM DA NUVEM HÍBRIDA?",

    options: [

      { label: "A", text: "Eliminar totalmente o uso de nuvem pública" },

      { label: "B", text: "Combinar nuvem pública e privada para maior flexibilidade e segurança" },

      { label: "C", text: "Utilizar apenas servidores locais" },

      { label: "D", text: "Impedir escalabilidade sob demanda" },

    ],

    correctAnswer: "B",

    points: 20,

  },

];
 
export const initialAchievements: Achievement[] = [

  {

    id: "level1",

    title: "NÍVEL 1 ALCANÇADO",

    description: "Acerte 1 pergunta",

    icon: "🏆",

    unlocked: false,

    requiredScore: 20,

  },

  {

    id: "level2",

    title: "NÍVEL 2 ALCANÇADO",

    description: "Acerte 3 perguntas",

    icon: "⭐",

    unlocked: false,

    requiredScore: 60,

  },

  {

    id: "master",

    title: "MESTRE DA CLOUD",

    description: "Acerte todas as perguntas",

    icon: "👑",

    unlocked: false,

    requiredScore: 100,

  },

];
 