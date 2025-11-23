export enum Tone {
  FUNNY = 'Engraçado',
  PROFESSIONAL = 'Profissional',
  INSPIRATIONAL = 'Inspirador',
  EDUCATIONAL = 'Educativo',
  CASUAL = 'Casual',
  CONTROVERSIAL = 'Polêmico/Debate'
}

export interface InstagramContentOption {
  hook: string;
  caption: string;
  hashtags: string[];
  explanation: string; // Why this works
}

export interface GeneratedResponse {
  options: InstagramContentOption[];
}

export interface UserInput {
  description: string;
  tone: Tone;
  image: File | null;
}