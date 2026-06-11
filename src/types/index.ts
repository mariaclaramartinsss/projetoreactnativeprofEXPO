// ─── Estilos ────────────────────────────────────────────────────────────────

export type EstiloTipo =
  | "minimalista"
  | "streetwear"
  | "classico"
  | "boho"
  | "avant";

export interface EstiloVersao {
  acessorios: string[];
  paleta: string[];
  nomesCores: string[];
  tendencias: string[];
  pecasChave: string[];
}

export interface Estilo {
  label: string;
  descricao: string;
  icone: string;
  feminino: EstiloVersao;
  masculino: EstiloVersao;
}

// ─── Quiz ────────────────────────────────────────────────────────────────────

export interface OpcaoQuiz {
  t: string;
  tipo: EstiloTipo;
}

export interface Pergunta {
  q: string;
  opcoes: OpcaoQuiz[];
}

// ─── Feed ────────────────────────────────────────────────────────────────────

export interface Reaction {
  emoji: string;
  count: number;
}

export interface Post {
  id: string;
  username: string;
  style: string;
  description: string;
  likes: number;
  reactions: Reaction[];
  liked: boolean;
  timestamp: string;
  imageUri?: string;
}

// ─── Navegação ───────────────────────────────────────────────

export type RootTabParamList = {
  Tendencias: undefined;
  Quiz: undefined;
  Feed: undefined;
};

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Nutrition: undefined;
  GenerativeAI: undefined;
  RNFlutterCuriosities: undefined;
  TechMarket: undefined;
  Quiz: undefined;
  EnviarLook: undefined;
  GuardaRoupa: undefined;
  Moda: undefined;
};

export interface User {
  name: string;
  email: string;
}
