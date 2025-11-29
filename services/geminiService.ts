import { InstagramContentOption, Tone } from "../types";

// --- BANCO DE DADOS DE GANCHOS VIRAIS (GOD MODE v4 - DEEP PSYCHOLOGY) ---
// Refined for maximum click-through rate with specific psychological triggers.

const HOOKS_DATABASE = {
  CURIOSITY: [
    "A indústria de [NICHO] reza para você não descobrir isso",
    "Fiz o teste: 30 dias aplicando [IDEIA] e o resultado assustou",
    "O 'Efeito [PALAVRA_CHAVE]' que está deixando todo mundo rico (menos você)",
    "Apague tudo o que te ensinaram sobre [NICHO]. Comece aqui.",
    "Isso não é um conselho, é um aviso sobre [IDEIA].",
    "O detalhe invisível em [NICHO] que separa os amadores da elite",
    "Parece ilegal (mas não é): O hack de [IDEIA] revelado",
    "Você está sentado em uma mina de ouro com [NICHO] e não vê",
    "A verdade nojenta sobre [NICHO] que ninguém tem coragem de falar",
    "O paradoxo de [NICHO]: Por que fazer menos gera mais [PALAVRA_CHAVE]?",
    "Você está fazendo [IDEIA] errado (e eu posso provar em 10 segundos)"
  ],
  PAIN: [
    "Pare de passar vergonha tentando fazer [IDEIA] assim",
    "O erro de principiante em [NICHO] que está drenando sua energia",
    "Dói ouvir, mas você nunca terá [PALAVRA_CHAVE] se continuar fazendo isso",
    "Você está matando seu progresso em [NICHO] cometendo esse vacilo",
    "Se você sente inveja de quem domina [NICHO], o problema é esse:",
    "A dura realidade: Por que 99% desiste de [IDEIA] no primeiro mês?",
    "3 hábitos tóxicos que te impedem de ter [PALAVRA_CHAVE] hoje",
    "Seu [NICHO] está estagnado? A culpa é exclusivamente disso aqui:",
    "Pare de ignorar os sinais: Seu método de [IDEIA] já morreu"
  ],
  SHORTCUT: [
    "Modo Preguiça Ativado: Como hackear [NICHO] sem esforço nenhum",
    "O 'Cheat Code' para dominar [IDEIA] enquanto seus concorrentes dormem",
    "Como ter [PALAVRA_CHAVE] em tempo recorde (Método Anti-Guru)",
    "A estratégia de 5 minutos para resolver [IDEIA] de vez",
    "Copie e cole: Minha rotina exata para explodir em [NICHO]",
    "Se eu tivesse que começar do zero em [NICHO] hoje, faria SÓ isso:",
    "Transforme horas de trabalho em [NICHO] em minutos com essa ferramenta",
    "O roteiro à prova de falhas para [PALAVRA_CHAVE] (Testado)",
    "A forma mais preguiçosa (e lucrativa) de lidar com [NICHO]"
  ],
  SOCIAL_PROOF: [
    "Minha DM explodiu perguntando sobre [IDEIA], então decidi revelar:",
    "Por que todo mundo no [NICHO] está abandonando o jeito velho por isso?",
    "Vi 3 grandes players de [NICHO] fazendo isso essa semana (não é coincidência)",
    "O método de [IDEIA] que virou febre nos EUA e chegou agora no Brasil",
    "Testei o 'Hype' do [PALAVRA_CHAVE] e a verdade chocante é essa:",
    "Se você viu todo mundo postando sobre [IDEIA], é por causa disso aqui:",
    "Analisei 100 perfis de sucesso em [NICHO] e o padrão é bizarro",
    "Perguntei para um milionário de [NICHO] qual o segredo e ele disse:",
    "A estratégia de [IDEIA] que gerou resultados absurdos essa semana",
    "Não é sorte: Como eles dominam [NICHO] tão fácil usando [PALAVRA_CHAVE]",
    "Todo mundo no [NICHO] está falando disso (e você precisa saber porquê)"
  ],
  SCARCITY: [
    "Vou apagar esse vídeo: O segredo final sobre [IDEIA]",
    "Última chamada para quem quer [PALAVRA_CHAVE] antes que o mercado mude",
    "Essa brecha em [NICHO] vai fechar rápido. Aproveite agora.",
    "Salve isso antes que o algoritmo derrube meu vídeo sobre [IDEIA]",
    "Ninguém vai te entregar esse ouro sobre [NICHO] de graça de novo",
    "Aproveite enquanto [IDEIA] ainda é um oceano azul",
    "Você tem exatamente 3 segundos para entender isso sobre [PALAVRA_CHAVE]",
    "O algoritmo odeia que eu te conte isso sobre [NICHO]..."
  ],
  CONTROVERSY: [
    "Opinião Impopular: [IDEIA] é perda de tempo (faça isso em vez disso)",
    "Pare de romantizar [NICHO]. A realidade é brutal.",
    "Desculpe, mas seu 'guru' de [NICHO] está mentindo pra você",
    "Por que eu parei de seguir as regras 'padrão' de [IDEIA]",
    "A mentira confortável que te contam sobre ter [PALAVRA_CHAVE]",
    "Você não precisa de mais curso de [NICHO], você precisa acordar pra isso:",
    "O mercado de [NICHO] é uma farsa se você não souber disso aqui",
    "Parem de normalizar o fracasso em [NICHO]. A culpa é do método."
  ],
  GOSSIP: [
    "Prints vazados: O que realmente acontece no mundo de [NICHO]",
    "Eu jurei não contar, mas a fofoca sobre [IDEIA] é real...",
    "Finge que não fui eu, mas descobriram o segredo de [PALAVRA_CHAVE]...",
    "O que eu ouvi num jantar com experts de [NICHO] me chocou...",
    "Isso vai dar processo: A verdade sobre [IDEIA] apareceu",
    "Só entre nós: O motivo real de fulano ter sucesso em [NICHO]",
    "A polêmica que ninguém quer assumir sobre [PALAVRA_CHAVE]",
    "Vou me arrepender de postar isso, mas você precisa saber sobre [NICHO]",
    "Eu nem deveria estar falando isso sobre [NICHO]...",
    "Finge que não fui eu que te contei esse segredo de [IDEIA]...",
    "Não espalha, mas o que descobriram sobre [NICHO] muda tudo...",
    "Se alguém perguntar, você não ouviu isso de mim sobre [PALAVRA_CHAVE]...",
    "Vazou: A conversa proibida sobre [IDEIA] que ninguém queria que você visse"
  ],
  LISTS: [
    "7 regras de ouro para sobreviver (e lucrar) em [NICHO]",
    "Top 5 mentiras que te contam sobre [IDEIA] todos os dias",
    "3 sinais claros de que você nasceu para liderar em [NICHO]",
    "O checklist definitivo para [IDEIA] viralizar hoje",
    "5 ferramentas proibidas que turbinam seu [NICHO] com [PALAVRA_CHAVE]",
    "10 mandamentos de quem tem sucesso real em [NICHO]",
    "4 coisas que eu faria diferente se buscasse [PALAVRA_CHAVE] hoje",
    "O passo a passo (que ninguém dá) para dominar [NICHO]"
  ],
  AUTHORITY: [
    "O método oficial (aprovado pela ciência) para [IDEIA]",
    "O que os manuais de [NICHO] não te contam sobre [PALAVRA_CHAVE]",
    "Como especialista em [NICHO], eu proíbo você de fazer isso:",
    "A técnica de [IDEIA] usada pelas maiores referências mundiais",
    "Baseado em 10 anos de estudo em [NICHO], essa é a verdade:",
    "Pare de ouvir amadores. A forma profissional de fazer [IDEIA] é essa:",
    "O protocolo definitivo de [NICHO] para quem quer ser elite",
    "Eu desafio qualquer guru de [NICHO] a refutar esse método"
  ],
  NOVELTY: [
    "Acabou de sair: A nova tendência de [NICHO] para 2025",
    "O futuro do [NICHO] chegou e vai eliminar quem não souber disso",
    "Esqueça tudo o que você sabia sobre [IDEIA]. Isso mudou hoje.",
    "A atualização do algoritmo mudou as regras para [NICHO]. Veja:",
    "Nova descoberta sobre [IDEIA] está chocando a internet",
    "Seja o primeiro a usar esse hack de [PALAVRA_CHAVE] no Brasil",
    "Isso acabou de chegar no mundo de [NICHO] e ninguém tá falando",
    "Adeus jeito velho. Essa é a nova era de [IDEIA]"
  ],
  BELONGING: [
    "Só quem vive de verdade o [NICHO] vai entender essa dor",
    "Se você faz parte do clube dos que buscam [PALAVRA_CHAVE], entre aqui",
    "Para você que se sente um peixe fora d'água em [NICHO]...",
    "Bem-vindo à tribo de quem não aceita o básico em [IDEIA]",
    "Um recado para os verdadeiros guerreiros do [NICHO]:",
    "Você não está louco, o mercado de [NICHO] que está difícil. Entenda:",
    "Se você ama [IDEIA], esse vídeo é uma carta de amor pra você",
    "Junte-se aos 1% que realmente levam [NICHO] a sério"
  ],
  RECIPROCITY: [
    "Preparei esse presente de [NICHO] pra você (sem cobrar nada)",
    "Não me deve nada, mas aqui está o mapa para [IDEIA] de graça",
    "Vou te economizar R$ 5.000 em cursos de [NICHO] com esse vídeo",
    "Tome: A minha planilha secreta de [IDEIA] liberada pra você",
    "Eu deveria cobrar por isso, mas quero te ver crescer em [NICHO]",
    "Meu presente de agradecimento: O guia de [PALAVRA_CHAVE] revelado",
    "Estou te entregando o ouro de [NICHO] de bandeja hoje",
    "Salve seu tempo e dinheiro com essa dica gratuita de [IDEIA]"
  ]
};

// --- INTELLIGENT CONTEXT ANALYSIS ---

// Maps niche keywords to specific emoji sets
const EMOJI_MAP: Record<string, string[]> = {
  money: ["💰", "💸", "🚀", "📈", "🤑", "💎", "🏦", "💵", "📊"],
  health: ["💪", "🥗", "🏋️‍♂️", "🍎", "🔥", "🧠", "⚡", "🥦", "🥑"],
  love: ["❤️", "😍", "💔", "🌹", "💍", "🥰", "💏", "💌", "💘"],
  tech: ["💻", "📱", "🤖", "⚡", "🔋", "💾", "📡", "⌨️", "🖥️"],
  marketing: ["🚀", "📱", "🔥", "💡", "📢", "🎯", "📈", "📣", "👁️"],
  beauty: ["💄", "💅", "✨", "🌸", "🧖‍♀️", "💇‍♀️", "👑", "💋", "🧴"],
  mindset: ["🧠", "🦁", "🔥", "💭", "🎯", "🧘‍♂️", "📚", "💡", "⚡"],
  general: ["✨", "🔥", "🚀", "💡", "👀", "🚨", "👇", "💥", "😱"]
};

// Maps Tones to specific hashtag strategies
const TONE_HASHTAGS: Record<string, string[]> = {
  [Tone.FUNNY]: ["#humor", "#meme", "#engraçado", "#comedia", "#rir"],
  [Tone.PROFESSIONAL]: ["#negocios", "#carreira", "#sucesso", "#profissional", "#business"],
  [Tone.INSPIRATIONAL]: ["#motivação", "#inspiração", "#foco", "#mindset", "#superação"],
  [Tone.EDUCATIONAL]: ["#aprender", "#dicas", "#educação", "#tutorial", "#comofazer"],
  [Tone.CONTROVERSIAL]: ["#polemica", "#opinião", "#debate", "#viral", "#fofoca"],
  [Tone.SURPRISING]: ["#incrivel", "#bizarro", "#curiosidades", "#wow", "#choque"],
  [Tone.ASSERTIVE]: ["#liderança", "#verdade", "#fatos", "#sucesso", "#metas"],
  [Tone.PROVOCATIVE]: ["#desafio", "#quebradepadrao", "#mentira", "#acorde", "#realidade"]
};

// --- HELPER FUNCTIONS ---

const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Detects the category of the niche to supply better emojis
const detectContext = (niche: string, keywords: string): string[] => {
  const combined = (niche + " " + keywords).toLowerCase();
  
  if (combined.match(/dinheiro|rico|venda|lucro|investimento|marketing|negócio/)) return EMOJI_MAP.money;
  if (combined.match(/saúde|dieta|treino|emagrecer|corpo|fit/)) return EMOJI_MAP.health;
  if (combined.match(/amor|casal|relacionamento|conquista|ex/)) return EMOJI_MAP.love;
  if (combined.match(/tech|celular|app|site|ia|computador/)) return EMOJI_MAP.tech;
  if (combined.match(/beleza|pele|cabelo|maquiagem|look/)) return EMOJI_MAP.beauty;
  if (combined.match(/mente|psicologia|foco|produtividade/)) return EMOJI_MAP.mindset;
  
  return EMOJI_MAP.general;
};

// Advanced string replacement that handles Portuguese articles intelligently
const fillTemplate = (template: string, niche: string, idea: string, keywords: string = ""): string => {
  let text = template;
  
  const cleanNiche = capitalizeFirst(niche.trim());
  const cleanKeywords = keywords.split(',')[0].trim();
  const displayKeyword = cleanKeywords ? capitalizeFirst(cleanKeywords) : "Resultados Reais";
  const cleanIdea = idea.trim() ? idea.trim() : cleanNiche;

  text = text.replace(/\[NICHO\]/g, cleanNiche);
  text = text.replace(/\[IDEIA\]/g, cleanIdea);
  text = text.replace(/\[assunto\]/g, cleanNiche);
  text = text.replace(/\[PALAVRA_CHAVE\]/g, displayKeyword);
  
  // Advanced Grammar Fixer (Heuristics)
  text = text.replace(/\s+(do|da|de|em|no|na)\s+(o|a|os|as)\s+/gi, " $1 "); 
  text = text.replace(/\s+(o|a)\s+(o|a)\s+/gi, " $1 ");
  
  // Normalize spaces
  text = text.replace(/\s\s+/g, " "); 

  return text.trim();
};

const generateSmartHashtags = (niche: string, keywords: string, tone: Tone): string[] => {
  const baseTags = ["#viral", "#explore", "#reels", "#fyp"];
  const nicheTag = `#${niche.replace(/\s/g, '').toLowerCase()}`;
  
  // 1. Keyword Tags
  const keywordTags = keywords
    .split(',')
    .map(k => k.trim())
    .filter(k => k.length > 0)
    .map(k => `#${k.replace(/\s/g, '').toLowerCase()}`);

  // 2. Tone Specific Tags
  const toneTags = TONE_HASHTAGS[tone] || [];
    
  // Combine, shuffle slightly, and dedup
  const allTags = Array.from(new Set([...baseTags, nicheTag, ...toneTags, ...keywordTags]));
  return allTags.slice(0, 20); // Limit to 20 tags
};

// --- MAIN GENERATOR FUNCTION ---

export const generateInstagramContent = async (
  niche: string,
  videoIdea: string,
  tone: Tone,
  imageFile: File | null,
  customHook?: string,
  keywords: string = ""
): Promise<InstagramContentOption[]> => {
  
  // Simulate AI Processing time for UX realism
  await new Promise(resolve => setTimeout(resolve, 1500));

  const options: InstagramContentOption[] = [];
  const contextEmojis = detectContext(niche, keywords);
  
  // Define Hook Strategy based on Tone - Enhanced Logic with New Triggers
  let strategies: (keyof typeof HOOKS_DATABASE)[] = [];
  
  switch(tone) {
    case Tone.CONTROVERSIAL:
    case Tone.PROVOCATIVE:
      // Debate, Choque e Verdade
      strategies = ['CONTROVERSY', 'PAIN', 'AUTHORITY'];
      break;
    case Tone.FUNNY:
    case Tone.CASUAL:
      // Leveza, Fofoca e Novidade
      strategies = ['GOSSIP', 'SHORTCUT', 'NOVELTY'];
      break;
    case Tone.EDUCATIONAL:
    case Tone.PROFESSIONAL:
    case Tone.ASSERTIVE:
      // Valor, Prova e Reciprocidade
      strategies = ['AUTHORITY', 'SOCIAL_PROOF', 'LISTS'];
      break;
    case Tone.INSPIRATIONAL:
      // Conexão, Pertencimento e Transformação
      strategies = ['BELONGING', 'PAIN', 'SOCIAL_PROOF'];
      break;
    case Tone.SURPRISING:
      // Novidade, Escassez e Segredo
      strategies = ['NOVELTY', 'SCARCITY', 'GOSSIP'];
      break;
    default:
      // Mix equilibrado para padrão
      strategies = ['CURIOSITY', 'BELONGING', 'SHORTCUT'];
  }
  
  for (let i = 0; i < 3; i++) {
    const strategy = strategies[i] || 'CURIOSITY';
    const hookTemplate = (i === 0 && customHook) ? customHook : getRandomItem(HOOKS_DATABASE[strategy]);
    const finalHook = (i === 0 && customHook) ? customHook : fillTemplate(hookTemplate, niche, videoIdea, keywords);
    
    // Select relevant emojis
    const em1 = getRandomItem(contextEmojis);
    const em2 = getRandomItem(contextEmojis);
    const em3 = getRandomItem(contextEmojis);

    // Prompt Engineering v2.0 - More specific instructions
    const keywordContext = keywords ? `\n\nPALAVRAS-CHAVE OBRIGATÓRIAS NO TEXTO: ${keywords}` : "";
    
    const captionPrompt = `🤖 COMANDO PARA IA (Copie e Cole):\n\n"Você é um Copywriter Especialista em Redes Sociais. Escreva uma legenda para um Reels sobre '${niche}'.\n\nTÍTULO DO VÍDEO: '${finalHook}'\nCONTEXTO: ${videoIdea}\n\nSUA MISSÃO:\n1. Use uma linguagem natural, humana e com o tom: ${tone}.\n2. Comece com uma frase curta que complemente o título.\n3. Entregue 3 pontos de valor real (dicas ou insights).\n4. Use estes emojis: ${em1} ${em2} ${em3}\n5. Finalize perguntando: 'Você concorda?' para gerar comentários.${keywordContext}\n\n(Não coloque aspas na resposta final, apenas o texto pronto para postar)"`;
    
    // Explicação Psicológica Expandida
    let explanation = "";
    if (strategy === 'CURIOSITY') explanation = "Gap de Curiosidade: O cérebro cria uma coceira mental que só o clique resolve.";
    if (strategy === 'PAIN') explanation = "Aversão à Perda: Destacar o erro dói mais do que destacar o acerto (gera ação).";
    if (strategy === 'SHORTCUT') explanation = "Lei do Menor Esforço: Promessa de resultado alto com energia baixa.";
    if (strategy === 'SOCIAL_PROOF') explanation = "Validação Social: 'Se todo mundo está fazendo/falando, deve ser bom'.";
    if (strategy === 'SCARCITY') explanation = "Urgência/FOMO: A ideia de que a informação vai sumir força a ação imediata.";
    if (strategy === 'CONTROVERSY') explanation = "Quebra de Padrão: Opiniões contrárias param o scroll por choque.";
    if (strategy === 'GOSSIP') explanation = "Efeito Confidencial: Cria intimidade parassocial imediata.";
    if (strategy === 'LISTS') explanation = "Estrutura Cognitiva: O cérebro adora previsibilidade e organização.";
    if (strategy === 'AUTHORITY') explanation = "Gatilho de Autoridade: Posiciona o conteúdo como verdade absoluta ou 'oficial'.";
    if (strategy === 'NOVELTY') explanation = "Viés da Novidade: O cérebro libera dopamina ao encontrar informações novas e desconhecidas.";
    if (strategy === 'BELONGING') explanation = "Gatilho de Pertencimento: Cria conexão tribal ('nós contra eles' ou 'nossa comunidade').";
    if (strategy === 'RECIPROCITY') explanation = "Reciprocidade: Entregar valor gratuito gera uma dívida psicológica de gratidão.";

    options.push({
      hook: finalHook,
      caption: captionPrompt,
      hashtags: generateSmartHashtags(niche, keywords, tone),
      explanation: `🔥 Estratégia: ${strategy}. ${explanation}`
    });
  }

  return options;
};

export const getMockInstagramContent = generateInstagramContent;