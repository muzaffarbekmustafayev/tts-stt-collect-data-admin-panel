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
  user_id: string;
  user_name?: string;
  user_telegram_id?: string;
  user_gender?: string;
  user_age?: number;
  sentence_id: string;
  audio_path: string;
  sentence: string;
  duration?: number;
  status: string;
  created_at: string;
}

export type CheckedAudio = {
  id: number;
<<<<<<< main
  checked_by: number;
  audio_id: number;
=======
  audio_id: string;
  checked_by: string;
  checked_by_name?: string | null;
>>>>>>> local
  is_correct: boolean;
  comment: string;
  status: string;
<<<<<<< main
  checked_at: string;
=======
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
>>>>>>> local
}

export type Statistics = {
  users: number;
  sentences: number;
  audios: number;
  checked_audios: number;
  admins: number;
  total_audio_duration: number;
}
export type Stats = {
  statistics: Statistics;
  users: User[];
  admin_users: AdminUser[];
  audios: Audio[];
  checked_audios: CheckedAudio[];
  sentences: Sentence[];
  current_admin: CurrentAdmin;
  total_audio_duration: number;
}
