import { Post } from "../types";

export const MOCK_POSTS: Post[] = [
  {
    id: "1",
    username: "ana_minimalista",
    style: "MINIMALISTA",
    description: "Look total white para o trabalho. Menos é mais. 🤍",
    likes: 234,
    reactions: [
      { emoji: "🔥", count: 45 },
      { emoji: "✨", count: 28 },
      { emoji: "💯", count: 17 },
    ],
    liked: false,
    timestamp: "2h",
  },
  {
    id: "2",
    username: "pedro_streetwear",
    style: "STREETWEAR",
    description: "Novo drop finalmente chegou. Cargo + bomber = perfeito.",
    likes: 512,
    reactions: [
      { emoji: "🔥", count: 120 },
      { emoji: "👟", count: 89 },
    ],
    liked: false,
    timestamp: "5h",
  },
  {
    id: "3",
    username: "lucia_classica",
    style: "CLÁSSICO",
    description:
      "Alfaiataria italiana nunca erra. Tailleur para reunião importante.",
    likes: 178,
    reactions: [
      { emoji: "👏", count: 55 },
      { emoji: "✨", count: 40 },
    ],
    liked: false,
    timestamp: "8h",
  },
  {
    id: "4",
    username: "maya_boho",
    style: "BOHO",
    description: "Fim de semana no campo merece look especial 🌿",
    likes: 301,
    reactions: [
      { emoji: "🌿", count: 67 },
      { emoji: "❤️", count: 49 },
    ],
    liked: false,
    timestamp: "1d",
  },
];
