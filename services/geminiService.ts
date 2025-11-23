import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedResponse, InstagramContentOption, Tone } from "../types";

// Helper to convert File to Base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

const VIRAL_HOOKS_LIST = `
"Esse é o jeito mais preguiçoso de [assunto]"
"Esses são os [assunto]"
"Isso vai mudar a forma como você [assunto]"
"Se você está com [problema] escute isso atenciosamente"
"A razão número um pra você não estar no [objetivo do nicho] é..."
"Você já parou pra pensar nisso?"
"Ninguém te conta isso, mas..."
"É assim que você muda o jogo."
"Fica até o final, porque isso pode te ajudar de verdade."
"Isso aqui é pra você que tá cansado de..."
"Se eu soubesse disso antes, teria economizado muito tempo."
"Você também sente isso ou é só comigo?"
"Isso aqui pode parecer simples, mas faz toda a diferença."
"Talvez isso mude a forma como você vê as coisas."
"O que ninguém vê por trás das câmeras é isso aqui:"
"Esse é o tipo de coisa que ninguém fala por medo de julgamento."
"Uma verdade difícil de engolir, mas necessária."
"Se você vive isso, então presta atenção aqui:"
"Salva isso porque você vai precisar um dia."
"Aprendi isso do jeito mais difícil."
"Essa dica vale ouro e quase ninguém aplica."
"Você vai me agradecer depois por ter visto isso."
"Parece bobo, mas mudou tudo pra mim."
"Já errei muito até entender isso aqui."
"Essa é pra quem pensa em desistir."
"Se você trabalha com isso, escuta o que eu vou te dizer:"
"Esse é o tipo de coisa que pode mudar seu resultado."
"Me disseram isso uma vez e nunca mais esqueci."
"Só quem já passou por isso vai entender."
"Se eu pudesse voltar no tempo, faria isso diferente."
"Se eu soubesse disso antes..."
"Você não tinha que passar por isso..."
"10 curiosidades proibidas sobre [assunto]"
"25 sinais proibidos que você [ignora/tem]"
"10 hábitos inofensivos que [te prejudicam]"
"Eu tentei de tudo... até descobrir isso"
`;

const VIRAL_KEYWORDS = "Proibidas, preguiçosos, silenciosos, secretos, oculto, revelado, bastidores, mentira, verdade, dinheiro, rápido, fácil, sinais, curiosidades, inofensivos";

export const getMockInstagramContent = async (): Promise<InstagramContentOption[]> => {
  // Simulates network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  return [
    {
      hook: "O segredo PROIBIDO que os gurus não te contam...",
      caption: "Você já parou pra pensar por que alguns perfis crescem rápido e o seu não?\n\nA verdade é que existe um padrão oculto nos algoritmos que 99% das pessoas ignoram.\n\nEu descobri isso da pior forma, mas você não precisa passar por isso.\n\n👇 Comenta 'SEGREDO' que eu te envio o mapa completo no direct.",
      hashtags: ["#marketingdigital", "#segredosdonicho", "#crescimentoviral", "#dicasdeinstagram"],
      explanation: "Usa o gatilho da 'Informação Privilegiada/Proibida' para gerar curiosidade imediata."
    },
    {
      hook: "Esse é o jeito mais PREGUIÇOSO de ter resultados",
      caption: "Pare de trabalhar duro e comece a trabalhar inteligente.\n\nDescobri um método que economiza 10h da minha semana e ainda dobra os resultados.\n\nIsso muda o jogo para quem não tem tempo a perder.\n\n💾 Salva esse post para aplicar quando estiver com preguiça (mas querendo resultados).",
      hashtags: ["#produtividade", "#hacks", "#preguiçainteligente", "#lifestyle"],
      explanation: "Apela para o desejo humano de obter máximo resultado com mínimo esforço (Lei do Menor Esforço)."
    },
    {
      hook: "10 sinais inofensivos que você está perdendo dinheiro",
      caption: "Você acha que está tudo bem, mas esses pequenos hábitos estão drenando seu potencial.\n\n1. Procrastinação disfarçada de planejamento.\n2. Medo de vender.\n3. Ignorar os dados...\n\n(A lista continua no vídeo)\n\n🚀 Siga o perfil para não cometer o erro número 11.",
      hashtags: ["#dinheiro", "#sucesso", "#erroscomuns", "#empreendedorismo"],
      explanation: "Listas numeradas com viés negativo ('perder dinheiro') geram altíssima retenção por medo de perda (FOMO)."
    }
  ];
};

export const generateInstagramContent = async (
  niche: string,
  videoIdea: string,
  tone: Tone,
  imageFile: File | null,
  customHook?: string
): Promise<InstagramContentOption[]> => {
  
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const schema = {
    type: Type.OBJECT,
    properties: {
      options: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            hook: {
              type: Type.STRING,
              description: "O TEXTO NA TELA (Headline) que ficará visível durante o vídeo. Deve usar um dos ganchos virais fornecidos.",
            },
            caption: {
              type: Type.STRING,
              description: "A legenda do post. Deve ter 3 partes: Contexto/Dor, Conteúdo de Valor e CTA específico.",
            },
            hashtags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "5-10 hashtags misturando nicho e virais.",
            },
            explanation: {
              type: Type.STRING,
              description: "Explicação curta de qual gatilho mental foi usado.",
            }
          },
          required: ["hook", "caption", "hashtags", "explanation"],
        },
      },
    },
    required: ["options"],
  };

  const parts: any[] = [];

  if (imageFile) {
    const base64Data = await fileToBase64(imageFile);
    parts.push({
      inlineData: {
        mimeType: imageFile.type,
        data: base64Data,
      },
    });
  }

  let promptText = `
    Você é um Arquiteto de Virais para Instagram Reels.
    
    ESTRUTURA OBRIGATÓRIA:
    1. O usuário fornecerá um NICHO e uma IDEIA DE VÍDEO.
    2. Você DEVE escolher um gancho da LISTA DE GANCHOS VIRAIS abaixo e adaptá-lo para o nicho.
    3. O 'hook' (Título na Tela) deve conter palavras de poder como: ${VIRAL_KEYWORDS}.
    4. A 'caption' (Legenda) deve ser estruturada em blocos:
       - Primeira linha: Gancho de atenção (relacionado ao título).
       - Meio: Conteúdo denso, educativo ou inspirador (O "Ouro").
       - Final: Chamada para Ação (CTA) estratégica para gerar engajamento ou salvamentos.
    
    ENTRADAS DO USUÁRIO:
    Nicho: "${niche}"
    Ideia do Vídeo/Contexto: "${videoIdea}"
    Tom de Voz: ${tone}
  `;

  if (customHook) {
    promptText += `
    ATENÇÃO - SOLICITAÇÃO PERSONALIZADA:
    O usuário inseriu um gancho manual específico: "${customHook}".
    - A Opção 1 DEVE usar exatamente este gancho ou uma adaptação muito leve.
    `;
  }

  promptText += `
    LISTA DE GANCHOS VIRAIS:
    ${VIRAL_HOOKS_LIST}
    
    REQUISITOS DE SAÍDA:
    - Gere 3 opções distintas.
    - Opção 1: Foco em curiosidade/segredo.
    - Opção 2: Foco em facilidade/preguiça/atalho.
    - Opção 3: Foco em dor/identificação.
    
    Retorne APENAS JSON.
  `;

  parts.push({ text: promptText });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts: parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.85, 
      },
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response text received from Gemini.");

    const parsedResponse = JSON.parse(jsonText) as GeneratedResponse;
    return parsedResponse.options;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};