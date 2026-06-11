import { Estilo, EstiloTipo, Pergunta } from "../types";

// ─── Dados dos Estilos ────────────────────────────────────────────────────────

export const ESTILOS: Record<EstiloTipo, Estilo> = {
  minimalista: {
    label: "MINIMALISTA",
    descricao:
      "Você valoriza o essencial. Sua moda fala pelo silêncio das formas limpas e cores neutras — menos é sempre mais.",
    icone: "◻",
    imagem:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    origem:
      "O minimalismo na moda nasceu como resposta ao excesso visual das décadas anteriores, ganhando força com a estética escandinava e japonesa, onde forma segue função e cada peça tem um propósito claro no guarda-roupa.",
    ocasioes: ["Trabalho", "Reuniões", "Viagens", "Dia a dia"],
    dica: "Invista em tecidos de qualidade e corte impecável — sem estampas para distrair, é o caimento da peça que faz toda a diferença.",
    feminino: {
      acessorios: [
        "Brinco argola fina dourada",
        "Bolsa tote de couro bege",
        "Relógio minimalista",
      ],
      paleta: ["#F5F0EB", "#D4C5B0", "#8B7355", "#4A4A4A", "#1A1A1A"],
      nomesCores: ["Off-white", "Bege", "Caramelo", "Chumbo", "Preto"],
      tendencias: [
        "Quiet Luxury",
        "Capsule Wardrobe",
        "Monochromatic Dressing",
      ],
      pecasChave: [
        "Blazer oversized bege",
        "Calça pantalona white",
        "Camiseta branca premium",
        "Trench coat caramelo",
      ],
    },
    masculino: {
      acessorios: [
        "Relógio de couro marrom",
        "Carteira slim",
        "Óculos acetato preto",
      ],
      paleta: ["#F5F0EB", "#C8B89A", "#6B5B45", "#3D3D3D", "#0A0A0A"],
      nomesCores: ["Off-white", "Bege escuro", "Terra", "Grafite", "Preto"],
      tendencias: ["Quiet Luxury", "Essentialismo", "Tonal Dressing"],
      pecasChave: [
        "Blazer cinza estruturado",
        "Calça de alfaiataria bege",
        "Camisa branca de linho",
        "Casaco trench",
      ],
    },
  },
  streetwear: {
    label: "STREETWEAR",
    descricao:
      "Você vive a rua. Seu estilo é manifesto urbano — conforto, autenticidade e atitude que fala antes de você.",
    icone: "◈",
    imagem:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800&q=80",
    origem:
      "Surgiu nas ruas da Califórnia e Nova York entre as cenas de skate, surf e hip-hop dos anos 80/90, hoje incorporada por grandes marcas de luxo em colaborações que misturam alta-costura com cultura de rua.",
    ocasioes: ["Casual", "Encontros com amigos", "Shows", "Lazer"],
    dica: "Misture peças oversized com itens mais ajustados para criar contraste de silhueta — é isso que evita o visual 'largado demais'.",
    feminino: {
      acessorios: ["Tênis chunky branco", "Mochila técnica", "Bone snapback"],
      paleta: ["#FFFFFF", "#000000", "#FF3B3B", "#4A90D9", "#F5A623"],
      nomesCores: ["Branco", "Preto", "Vermelho", "Azul", "Laranja"],
      tendencias: ["Gorpcore", "Y2K Revival", "Techwear"],
      pecasChave: [
        "Moletom oversized",
        "Cargo pants",
        "Tênis plataforma",
        "Jaqueta bomber",
      ],
    },
    masculino: {
      acessorios: ["Tênis chunky", "Cap bordado", "Mochila streetwear"],
      paleta: ["#FFFFFF", "#000000", "#E63946", "#457B9D", "#E9C46A"],
      nomesCores: ["Branco", "Preto", "Vermelho", "Navy", "Amarelo"],
      tendencias: ["Gorpcore", "Techwear", "Skate Aesthetic"],
      pecasChave: [
        "Moletom graphic",
        "Cargo wide leg",
        "Tênis retro",
        "Jaqueta varsity",
      ],
    },
  },
  classico: {
    label: "CLÁSSICO",
    descricao:
      "Você é atemporal. Sua elegância não segue tendências — ela as transcende. Sofisticação com propósito.",
    icone: "◎",
    imagem:
      "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=80",
    origem:
      "Raízes na alfaiataria britânica e no guarda-roupa da aristocracia europeia, o estilo clássico atravessou décadas mantendo cortes estruturados e paleta sóbria como sinônimo de status discreto — hoje reinterpretado pela estética 'old money'.",
    ocasioes: ["Eventos formais", "Escritório", "Jantares", "Cerimônias"],
    dica: "Prefira peças em tecidos nobres (lã, seda, cashmere) e mantenha os acessórios discretos — a sofisticação está nos detalhes, não no excesso.",
    feminino: {
      acessorios: ["Colar de pérolas", "Bolsa estruturada", "Scarpin nude"],
      paleta: ["#FAFAFA", "#E8DDD0", "#C4A882", "#2C2C2C", "#000000"],
      nomesCores: ["Branco", "Champagne", "Camel", "Charcoal", "Preto"],
      tendencias: ["Old Money", "Power Dressing", "Quiet Luxury"],
      pecasChave: [
        "Tailleur clássico",
        "Camisa de seda branca",
        "Calça reta de alfaiataria",
        "Camisola cashmere",
      ],
    },
    masculino: {
      acessorios: ["Relógio clássico", "Cinto de couro", "Abotoaduras"],
      paleta: ["#F8F6F0", "#D4C4A8", "#8B6914", "#333333", "#000000"],
      nomesCores: ["Creme", "Bege", "Dourado", "Chumbo", "Preto"],
      tendencias: ["Old Money", "Ivy League", "Sartorial"],
      pecasChave: [
        "Terno de lã",
        "Oxford branco",
        "Calça de flanela",
        "Blazer navy",
      ],
    },
  },
  boho: {
    label: "BOHO",
    descricao:
      "Você é livre. Seu estilo é uma ode à natureza, às viagens e ao espírito criativo que não cabe em caixas.",
    icone: "❋",
    imagem:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
    origem:
      "Herdeiro do movimento hippie dos anos 60/70 e da estética cigana europeia, o boho mistura estampas étnicas, tecidos naturais e camadas — hoje renovado pelo cottagecore e pela valorização de peças artesanais e vintage.",
    ocasioes: ["Praia", "Festivais", "Viagens", "Encontros ao ar livre"],
    dica: "Aposte em camadas de texturas diferentes (linho, renda, tricô) e não tenha medo de misturar estampas — o segredo é manter a paleta de cores conectada.",
    feminino: {
      acessorios: ["Brincos étnicos", "Bolsa de palha", "Sandália rasteira"],
      paleta: ["#F4E4C1", "#D4956A", "#8B4513", "#6B8E23", "#8B7355"],
      nomesCores: ["Areia", "Terracota", "Marrom", "Oliva", "Bege"],
      tendencias: ["Cottagecore", "Earth Tones", "Vintage Revival"],
      pecasChave: [
        "Vestido floral longo",
        "Kimono bordado",
        "Saia midi assimétrica",
        "Top cropped de renda",
      ],
    },
    masculino: {
      acessorios: ["Colar de couro", "Anel de prata", "Chapéu de palha"],
      paleta: ["#F0E6D3", "#C4875A", "#7A5C35", "#5A7A35", "#6B5B45"],
      nomesCores: ["Creme", "Terracota", "Chocolate", "Verde musgo", "Bege"],
      tendencias: ["Earthcore", "Vintage", "Artisan"],
      pecasChave: [
        "Camisa de linho estampada",
        "Calça palazzo",
        "Colete jeans",
        "Short de sarja",
      ],
    },
  },
  avant: {
    label: "AVANT-GARDE",
    descricao:
      "Você é o futuro. Seu estilo desafia, questiona e redefine. A moda para você é arte e declaração.",
    icone: "◬",
    imagem:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
    origem:
      "Inspirado por estilistas vanguardistas que tratam a roupa como escultura e manifesto, o avant-garde rompe com convenções de silhueta e gênero, dialogando com o cyberpunk e a estética futurista de subculturas underground.",
    ocasioes: [
      "Eventos de moda",
      "Baladas",
      "Sessões de fotos",
      "Arte/performance",
    ],
    dica: "Escolha UMA peça de impacto (cor, forma ou material) como protagonista e equilibre o restante do look em tons neutros — isso evita um visual 'carnavalesco'.",
    feminino: {
      acessorios: ["Óculos futuristas", "Colar statement", "Botas plataforma"],
      paleta: ["#FFFFFF", "#000000", "#C0C0C0", "#800080", "#00FFFF"],
      nomesCores: ["Branco", "Preto", "Prata", "Roxo", "Ciano"],
      tendencias: ["Deconstructivism", "Gender Fluid", "Cyberpunk"],
      pecasChave: [
        "Casaco estruturado assimétrico",
        "Calça de vinil",
        "Top cut-out",
        "Jaqueta metálica",
      ],
    },
    masculino: {
      acessorios: ["Óculos shield", "Colar chunky", "Sapato de bico fino"],
      paleta: ["#F0F0F0", "#050505", "#A0A0A0", "#6A0DAD", "#00E5FF"],
      nomesCores: ["Branco", "Preto", "Prata", "Violeta", "Elétrico"],
      tendencias: ["Deconstructivism", "Fluid Fashion", "Futurism"],
      pecasChave: [
        "Casaco oversized estruturado",
        "Calça wide técnica",
        "Camisa assimétrica",
        "Colete metálico",
      ],
    },
  },
};

// ─── Perguntas do Quiz ────────────────────────────────────────────────────────

export const PERGUNTAS: Pergunta[] = [
  {
    q: "QUAL A SUA PRIORIDADE AO SE VESTIR?",
    opcoes: [
      { t: "ESSENCIALISMO E CORES NEUTRAS", tipo: "minimalista" },
      { t: "CONFORTO E EXPRESSÃO URBANA", tipo: "streetwear" },
      { t: "SOFISTICAÇÃO E CAIMENTO PERFEITO", tipo: "classico" },
      { t: "LIBERDADE E AUTENTICIDADE", tipo: "boho" },
      { t: "IMPACTO E VANGUARDA", tipo: "avant" },
    ],
  },
  {
    q: "QUAL AMBIENTE COMBINA MAIS COM VOCÊ?",
    opcoes: [
      { t: "GALERIA DE ARTE CONTEMPORÂNEA", tipo: "minimalista" },
      { t: "SHOW DE RAP NO CENTRO DA CIDADE", tipo: "streetwear" },
      { t: "JANTAR EM RESTAURANTE FINE DINING", tipo: "classico" },
      { t: "FESTIVAL DE MÚSICA AO AR LIVRE", tipo: "boho" },
      { t: "DESFILE DE MODA EXPERIMENTAL", tipo: "avant" },
    ],
  },
  {
    q: "QUE TIPO DE PEÇA NUNCA FALTA NO SEU GUARDA-ROUPA?",
    opcoes: [
      { t: "CAMISETA BRANCA BÁSICA PREMIUM", tipo: "minimalista" },
      { t: "MOLETOM OVERSIZED COM ESTAMPA", tipo: "streetwear" },
      { t: "BLAZER BEM ESTRUTURADO", tipo: "classico" },
      { t: "PEÇA FLUIDA OU ESTAMPADA", tipo: "boho" },
      { t: "ALGO QUE CHAMA ATENÇÃO", tipo: "avant" },
    ],
  },
];

// ─── Utilitários ──────────────────────────────────────────────────────────────

export function calcularEstilo(pontos: Record<EstiloTipo, number>): EstiloTipo {
  return (Object.keys(pontos) as EstiloTipo[]).reduce((a, b) =>
    pontos[a] >= pontos[b] ? a : b,
  );
}
