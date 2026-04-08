export type AdminUser = {
  id: string;
  username: string;
  is_active: boolean;
  role: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
}

export type CurrentAdmin = {
  id: string;
  username: string;
  role: string;
  is_active: boolean;
}

export type User = {
  id: string;
  telegram_id?: string;
  name: string;
  gender: string;
  age: number;
  info?: string;
  created_at: string;
}

export type Sentence = {
  id: string;
  text: string;
  language: string;
  created_at: string;
}

export type Audio = {
  id: string;
  user_id: string;
  user_name?: string;
  user_telegram_id?: string;
  user_gender?: string;
  user_age?: number;
  sentence_id: string;
  sentence?: string;
  audio_path: string;
  duration?: number;
  status: string;
  created_at: string;
}

export type CheckedAudio = {
  id: string;
  audio_id: string;
  checked_by: string;
  checked_by_name?: string | null;
  is_correct: boolean;
  comment?: string | null;
  status: string;
  checked_at?: string | null;
  audio_path?: string | null;
  audio_duration?: number | null;
  sentence?: string | null;
  sentence_id?: string | null;
  user_name?: string | null;
  user_id?: string | null;
  second_checker_id?: string | null;
  second_checker_name?: string | null;
  second_check_result?: boolean | null;
  second_checked_at?: string | null;
}

export type Statistics = {
  users: number;
  sentences: number;
  audios: number;
  approved_audios?: number;
  pending_audios?: number;
  checked_audios: number;
  admins: number;
  total_audio_duration: number;
  total_audio_duration_minutes?: number;
  total_audio_duration_hours?: number;
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
