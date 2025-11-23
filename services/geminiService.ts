import { InstagramContentOption, Tone } from "../types";

// Listas de Templates para o Gerador Local
const HOOK_TEMPLATES = [
  "Esse é o jeito mais preguiçoso de [NICHO]",
  "Esses são os segredos do [NICHO]",
  "Isso vai mudar a forma como você vê [IDEIA]",
  "Se você está com problemas em [NICHO] escute isso",
  "A razão número um pra você não ter sucesso no [NICHO] é...",
  "Você já parou pra pensar nisso sobre [IDEIA]?",
  "Ninguém te conta isso sobre [NICHO], mas...",
  "É assim que você muda o jogo no [NICHO].",
  "Fica até o final, porque [IDEIA] vai te ajudar.",
  "Isso aqui é pra você que tá cansado de falhar no [NICHO]",
  "Se eu soubesse disso antes sobre [IDEIA], teria economizado tempo.",
  "10 curiosidades proibidas sobre [NICHO]",
  "25 sinais proibidos que você ignora no [NICHO]",
  "Eu tentei de tudo no [NICHO]... até descobrir isso",
  "Parece bobo, mas [IDEIA] mudou tudo pra mim."
];

// Modificadores de Tom para a Intro
const TONE_INTRO_MODIFIERS: Record<Tone, string[]> = {
  [Tone.FUNNY]: ["Olha, eu não queria rir, mas...", "Parece piada, mas é sério: ", "Se você rir, já sabe: "],
  [Tone.PROFESSIONAL]: ["Do ponto de vista estratégico: ", "Analisando os dados do mercado: ", "Profissionalmente falando: "],
  [Tone.INSPIRATIONAL]: ["Imagine onde você pode chegar. ", "Sua jornada começa agora. ", "Não desista antes de ver isso. "],
  [Tone.EDUCATIONAL]: ["Pegue papel e caneta. ", "Aula rápida de hoje: ", "O conceito por trás disso é simples: "],
  [Tone.CASUAL]: ["Papo reto aqui: ", "Senta que lá vem história: ", "Só entre nós: "],
  [Tone.CONTROVERSIAL]: ["Muitos vão discordar, mas... ", "A verdade que dói: ", "Cancelem se quiserem, mas: "]
};

const CAPTION_BODY_TEMPLATES = [
  "A verdade é que [IDEIA] é a chave para destravar seus resultados no universo de [NICHO].\n\nQuando você aplica essa estratégia, tudo muda.",
  "O segredo está na simplicidade. Focar em [IDEIA] vai te trazer muito mais retorno do que tentar inventar a roda dentro de [NICHO].",
  "Existe um padrão oculto: quem domina [IDEIA] sai na frente. Não é mágica, é método aplicado ao [NICHO].",
  "Se você continuar ignorando [IDEIA], vai continuar patinando. É uma verdade difícil, mas necessária para quem quer crescer em [NICHO]."
];

const CTA_TEMPLATES = [
  "👇 Comenta 'EU QUERO' que eu te envio o mapa completo no direct.",
  "💾 Salva esse post para aplicar quando estiver precisando de inspiração.",
  "🚀 Siga o perfil para não cometer mais esse erro.",
  "🔥 Compartilha com aquele amigo que precisa ouvir essa verdade.",
  "💬 Deixa sua opinião: você concorda ou discorda?"
];

const EXPLANATION_TEMPLATES = [
  "Usa o gatilho da 'Informação Privilegiada' para gerar curiosidade imediata.",
  "Apela para o desejo humano de obter máximo resultado com mínimo esforço.",
  "Gera autoridade ao mostrar que você sabe algo que a maioria ignora.",
  "Cria conexão através da dor comum do nicho.",
  "Utiliza a quebra de padrão para prender a atenção nos primeiros segundos."
];

// Função auxiliar para substituir placeholders
const fillTemplate = (template: string, niche: string, idea: string): string => {
  let text = template;
  // Limpa o nicho e ideia para encaixar melhor
  const cleanNiche = niche.trim();
  const cleanIdea = idea.trim() || niche.trim();

  text = text.replace(/\[NICHO\]/g, cleanNiche);
  text = text.replace(/\[IDEIA\]/g, cleanIdea);
  text = text.replace(/\[assunto\]/g, cleanNiche);
  text = text.replace(/\[problema\]/g, "dificuldades");
  text = text.replace(/\[objetivo do nicho\]/g, "sucesso");
  
  return text;
};

const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Função para gerar hashtags baseadas em keywords
const generateHashtags = (niche: string, keywords: string): string[] => {
  const baseHashtags = ["#viral", "#explore", `#${niche.replace(/\s/g, '')}`, "#reels"];
  
  if (!keywords) return [...baseHashtags, "#dicas", "#sucesso"];

  const keywordTags = keywords
    .split(',')
    .map(k => k.trim())
    .filter(k => k.length > 0)
    .map(k => `#${k.replace(/\s/g, '')}`);

  return [...baseHashtags, ...keywordTags];
};

export const generateInstagramContent = async (
  niche: string,
  videoIdea: string,
  tone: Tone,
  imageFile: File | null,
  customHook?: string,
  keywords: string = ""
): Promise<InstagramContentOption[]> => {
  
  // Simula tempo de processamento para "parecer" IA
  await new Promise(resolve => setTimeout(resolve, 2000));

  const options: InstagramContentOption[] = [];
  const toneIntro = getRandomItem(TONE_INTRO_MODIFIERS[tone] || TONE_INTRO_MODIFIERS[Tone.CASUAL]);
  const specificHashtags = generateHashtags(niche, keywords);

  // Keyword integration text
  const keywordFocusText = keywords 
    ? `\n\nPrincipalmente se você busca ${keywords.split(',')[0] || 'resultados'}.` 
    : "";

  // --- Opção 1: Focada no Gancho (ou Customizado) + Tom ---
  let hook1 = customHook 
    ? customHook 
    : fillTemplate(getRandomItem(HOOK_TEMPLATES), niche, videoIdea);
  
  options.push({
    hook: hook1,
    caption: `${toneIntro} Você já percebeu isso?\n\n${fillTemplate(getRandomItem(CAPTION_BODY_TEMPLATES), niche, videoIdea)}${keywordFocusText}\n\n${getRandomItem(CTA_TEMPLATES)}`,
    hashtags: specificHashtags,
    explanation: `Focada em gerar curiosidade imediata com tom ${tone}.`
  });

  // --- Opção 2: Focada em Dor/Solução ---
  const hook2 = fillTemplate(getRandomItem(HOOK_TEMPLATES.filter(h => h !== hook1)), niche, videoIdea);
  options.push({
    hook: hook2,
    caption: `Muitas pessoas em ${niche} sofrem com isso.\n\n${fillTemplate("A solução para [IDEIA] não é difícil, mas exige constância.", niche, videoIdea)}\n\n${getRandomItem(CTA_TEMPLATES)}`,
    hashtags: [...specificHashtags, "#solução", "#metodo"],
    explanation: getRandomItem(EXPLANATION_TEMPLATES)
  });

  // --- Opção 3: Focada em Lista/Segredo ---
  const hook3 = fillTemplate(getRandomItem(HOOK_TEMPLATES.filter(h => h !== hook1 && h !== hook2)), niche, videoIdea);
  options.push({
    hook: hook3,
    caption: `3 Segredos sobre ${niche} que ninguém conta:\n\n1. O básico funciona.\n2. ${videoIdea} é essencial.\n3. A constância vence o talento.\n\nQual desses você mais precisa melhorar?\n\n${getRandomItem(CTA_TEMPLATES)}`,
    hashtags: [...specificHashtags, "#segredos", "#bastidores"],
    explanation: "Listas numeradas retêm a atenção até o final do vídeo."
  });

  return options;
};

export const getMockInstagramContent = generateInstagramContent;