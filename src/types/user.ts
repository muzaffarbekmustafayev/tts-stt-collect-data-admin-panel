export type AdminUser = {
  id: number;
  username: string;
  is_active: boolean;
  role: string;
  password?: string;
  created_at?: string;
}
export type CurrentAdmin = {
  username: string;
  role: string;
}

export type User = {
  id: number;
  telegram_id?: string;
  name: string;
  gender: string;
  age: number;
  info?: string;
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
  audio_id: number;
  is_correct: boolean;
  comment: string;
  status: string;
  checked_at: string;
}

export type Statistics = {
  users: number;
  sentences: number;
  audios: number;
  checked_audios: number;
  admins: number;
}
export type Stats = {
  statistics: Statistics;
  users: User[];
  admin_users: AdminUser[];
  audios: Audio[];
  checked_audios: CheckedAudio[];
  sentences: Sentence[];
  current_admin: CurrentAdmin;
}
