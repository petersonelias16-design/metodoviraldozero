export enum Tone {
  FUNNY = 'Engraçado',
  PROFESSIONAL = 'Profissional',
  INSPIRATIONAL = 'Inspirador',
  EDUCATIONAL = 'Educativo',
  CASUAL = 'Casual',
  CONTROVERSIAL = 'Polêmico/Debate'
}

export enum AudioVibe {
  TRENDING = 'Surpreenda-me (Tendência)',
  ENERGETIC = 'Energética / Motivacional',
  SUSPENSE = 'Suspense / Tensão / Mistério',
  CALM = 'Calma / Aesthetic / Lo-fi',
  FUNNY = 'Engraçada / Meme / Áudio Viral',
  TRANSITION = 'Batida Sincronizada / Transição'
}

export enum CtaGoal {
  SAVABLE = 'Salvamentos (Retenção)',
  ENGAGEMENT = 'Comentários (Discussão)',
  SHAREABLE = 'Compartilhamentos (Viralização)',
  FOLLOWERS = 'Seguidores (Crescimento)',
  SALES = 'Vendas / Link na Bio'
}

export interface InstagramContentOption {
  hook: string;
  caption: string;
  hashtags: string[];
  explanation: string; // Why this works
  audioSuggestion: string; // New field for audio recommendation
}

export interface GeneratedResponse {
  options: InstagramContentOption[];
}

export interface UserInput {
  description: string;
  tone: Tone;
  image: File | null;
}