import { InstagramContentOption, Tone } from "../types";

// --- BANCO DE DADOS DE GANCHOS VIRAIS (GOD MODE v2) ---
// Refined for maximum click-through rate and psychological impact.

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
    "A verdade nojenta sobre [NICHO] que ninguém tem coragem de falar"
  ],
  PAIN: [
    "Pare de passar vergonha tentando fazer [IDEIA] assim",
    "O erro de principiante em [NICHO] que está drenando sua energia",
    "Dói ouvir, mas você nunca terá [PALAVRA_CHAVE] se continuar fazendo isso",
    "Você está matando seu progresso em [NICHO] cometendo esse vacilo",
    "Se você sente inveja de quem domina [NICHO], o problema é esse:",
    "A dura realidade: Por que 99% desiste de [IDEIA] no primeiro mês?",
    "3 hábitos tóxicos que te impedem de ter [PALAVRA_CHAVE] hoje",
    "Seu [NICHO] está estagnado? A culpa é exclusivamente disso aqui:"
  ],
  SHORTCUT: [
    "Modo Preguiça Ativado: Como hackear [NICHO] sem esforço nenhum",
    "O 'Cheat Code' para dominar [IDEIA] enquanto seus concorrentes dormem",
    "Como ter [PALAVRA_CHAVE] em tempo recorde (Método Anti-Guru)",
    "A estratégia de 5 minutos para resolver [IDEIA] de vez",
    "Copie e cole: Minha rotina exata para explodir em [NICHO]",
    "Se eu tivesse que começar do zero em [NICHO] hoje, faria SÓ isso:",
    "Transforme horas de trabalho em [NICHO] em minutos com essa ferramenta",
    "O roteiro à prova de falhas para [PALAVRA_CHAVE] (Testado)"
  ],
  SOCIAL_PROOF: [
    "O segredo que os Top 1% de [NICHO] usam nos bastidores",
    "Analisei 100 perfis de sucesso em [NICHO] e o padrão é bizarro",
    "Perguntei para um milionário de [NICHO] qual o segredo e ele disse:",
    "Por que todo mundo que tem [PALAVRA_CHAVE] faz exatamente isso?",
    "A estratégia de [IDEIA] que gerou resultados absurdos essa semana",
    "Não é sorte, é método: Como eles dominam [NICHO] tão fácil",
    "O que os gurus de [NICHO] cobram R$ 2.000 pra ensinar (de graça aqui)"
  ],
  SCARCITY: [
    "Vou apagar esse vídeo: O segredo final sobre [IDEIA]",
    "Última chamada para quem quer [PALAVRA_CHAVE] antes que o mercado mude",
    "Essa brecha em [NICHO] vai fechar rápido. Aproveite agora.",
    "Salve isso antes que o algoritmo derrube meu vídeo sobre [IDEIA]",
    "Ninguém vai te entregar esse ouro sobre [NICHO] de graça de novo",
    "Aproveite enquanto [IDEIA] ainda é um oceano azul",
    "Você tem exatamente 3 segundos para entender isso sobre [PALAVRA_CHAVE]"
  ],
  CONTROVERSY: [
    "Opinião Impopular: [IDEIA] é perda de tempo (faça isso em vez disso)",
    "Pare de romantizar [NICHO]. A realidade é brutal.",
    "Desculpe, mas seu 'guru' de [NICHO] está mentindo pra você",
    "Por que eu parei de seguir as regras 'padrão' de [IDEIA]",
    "A mentira confortável que te contam sobre ter [PALAVRA_CHAVE]",
    "Você não precisa de mais curso de [NICHO], você precisa acordar pra isso:",
    "O mercado de [NICHO] é uma farsa se você não souber disso aqui"
  ],
  GOSSIP: [
    "Prints vazados: O que realmente acontece no mundo de [NICHO]",
    "Eu jurei não contar, mas a fofoca sobre [IDEIA] é real...",
    "Finge que não fui eu, mas descobriram o segredo de [PALAVRA_CHAVE]...",
    "O que eu ouvi num jantar com experts de [NICHO] me chocou...",
    "Isso vai dar processo: A verdade sobre [IDEIA] apareceu",
    "Só entre nós: O motivo real de fulano ter sucesso em [NICHO]",
    "A polêmica que ninguém quer assumir sobre [PALAVRA_CHAVE]"
  ],
  LISTS: [
    "7 regras de ouro para sobreviver (e lucrar) em [NICHO]",
    "Top 5 mentiras que te contam sobre [IDEIA] todos os dias",
    "3 sinais claros de que você nasceu para liderar em [NICHO]",
    "O checklist definitivo para [IDEIA] viralizar hoje",
    "5 ferramentas proibidas que turbinam seu [NICHO] com [PALAVRA_CHAVE]",
    "10 mandamentos de quem tem sucesso real em [NICHO]",
    "4 coisas que eu faria diferente se buscasse [PALAVRA_CHAVE] hoje"
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
  [Tone.SURPRISING]: ["#incrivel", "#bizarro", "#curiosidades", "#wow", "#choque"]
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
  // Fixes: "do O Marketing" -> "do Marketing", "em A Vendas" -> "em Vendas"
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
  
  // Define Hook Strategy based on Tone
  let strategies: (keyof typeof HOOKS_DATABASE)[] = [];
  
  switch(tone) {
    case Tone.CONTROVERSIAL:
    case Tone.PROVOCATIVE:
      strategies = ['CONTROVERSY', 'PAIN', 'SCARCITY'];
      break;
    case Tone.FUNNY:
    case Tone.CASUAL:
      strategies = ['GOSSIP', 'SHORTCUT', 'CURIOSITY'];
      break;
    case Tone.EDUCATIONAL:
    case Tone.PROFESSIONAL:
    case Tone.ASSERTIVE:
      strategies = ['SOCIAL_PROOF', 'LISTS', 'PAIN'];
      break;
    case Tone.INSPIRATIONAL:
      strategies = ['PAIN', 'SOCIAL_PROOF', 'CURIOSITY'];
      break;
    case Tone.SURPRISING:
      strategies = ['SCARCITY', 'CONTROVERSY', 'GOSSIP'];
      break;
    default:
      strategies = ['CURIOSITY', 'PAIN', 'SHORTCUT'];
  }
  
  for (let i = 3; i < 3; i++) { // Fixed loop initialization
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
    
    // Explicação Psicológica
    let explanation = "";
    if (strategy === 'CURIOSITY') explanation = "Gap de Curiosidade: O cérebro cria uma coceira mental que só o clique resolve.";
    if (strategy === 'PAIN') explanation = "Aversão à Perda: Destacar o erro dói mais do que destacar o acerto (gera ação).";
    if (strategy === 'SHORTCUT') explanation = "Lei do Menor Esforço: Promessa de resultado alto com energia baixa.";
    if (strategy === 'SOCIAL_PROOF') explanation = "Validação Social: 'O segredo dos experts' transfere autoridade para você.";
    if (strategy === 'SCARCITY') explanation = "Urgência/FOMO: A ideia de que a informação vai sumir força o salvamento.";
    if (strategy === 'CONTROVERSY') explanation = "Quebra de Padrão: Opiniões contrárias param o scroll por choque.";
    if (strategy === 'GOSSIP') explanation = "Efeito Confidencial: Cria intimidade parassocial imediata.";
    if (strategy === 'LISTS') explanation = "Estrutura Cognitiva: O cérebro adora previsibilidade e organização.";

    options.push({
      hook: finalHook,
      caption: captionPrompt,
      hashtags: generateSmartHashtags(niche, keywords, tone),
      explanation: `🔥 Estratégia: ${strategy}. ${explanation}`
    });
  }
  
  // Re-inserting original loop logic that seemed to have been corrupted in my manual check above
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
    
    // Explicação Psicológica
    let explanation = "";
    if (strategy === 'CURIOSITY') explanation = "Gap de Curiosidade: O cérebro cria uma coceira mental que só o clique resolve.";
    if (strategy === 'PAIN') explanation = "Aversão à Perda: Destacar o erro dói mais do que destacar o acerto (gera ação).";
    if (strategy === 'SHORTCUT') explanation = "Lei do Menor Esforço: Promessa de resultado alto com energia baixa.";
    if (strategy === 'SOCIAL_PROOF') explanation = "Validação Social: 'O segredo dos experts' transfere autoridade para você.";
    if (strategy === 'SCARCITY') explanation = "Urgência/FOMO: A ideia de que a informação vai sumir força o salvamento.";
    if (strategy === 'CONTROVERSY') explanation = "Quebra de Padrão: Opiniões contrárias param o scroll por choque.";
    if (strategy === 'GOSSIP') explanation = "Efeito Confidencial: Cria intimidade parassocial imediata.";
    if (strategy === 'LISTS') explanation = "Estrutura Cognitiva: O cérebro adora previsibilidade e organização.";

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