export type AdminUser = {
  id: number;
  username: string;
  is_active: boolean;
  role: string;
  created_at: string;
}

export type User = {
  id: number;
  telegram_id: string;
  name: string;
  gender: string;
  age: number;
  phone: string;
  info: string;
  created_at: string;
}

export type Sentence = {
  id: number;
  text: string;
  language: string;
  created_at: string;
}

export type Audio = {
  id: number;
  user_id: number;
  sentence_id: number;
  audio_path: string;
  sentence: string;
  status: string;
  created_at: string;
}

export type CheckedAudio = {
  id: number;
  checked_by: number;
  sentence_id: number;
  is_correct: boolean;
  comment: string;
  status: string;
  checked_at: string;
}

export type Stats = {
  users: number;
  sentences: number;
  audios: number;
  checked_audios: number;
  admins: number;
}
