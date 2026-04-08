import type { DataProps } from "@/components/custom/CustomTable/interfaces";

export interface User extends DataProps {
  id: string;
  telegram_id?: string;
  name: string;
  gender: string;
  age: number;
  info?: string;
  created_at: string;
}

export interface UserStatistics extends DataProps {
  user_id: string;
  id: string;
  telegram_id?: string;
  name: string;
  info?: string;
  sent_audio_count: number;
  sent_audio_minutes: number;
  checked_audio_count: number;
  checked_audio_minutes: number;
  pending_audio_count: number;
  pending_checked_audio_count: number;
}

export interface AdminUser extends DataProps {
  id: string;
  username: string;
  is_active: boolean;
  role: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Sentence extends DataProps {
  id: string;
  text: string;
  language: string;
  created_at: string;
}

export interface UsersPageProps {
  users: User[];
  loading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  editingItem: User | null;
  setEditingItem: (item: User | null) => void;
  showAddForm: boolean;
  setShowAddForm: (show: boolean) => void;
  onAddUser: () => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (id: string) => void;
  onSearchUsers: (term: string) => void;
}

export interface SentencesPageProps {
  sentences: Sentence[];
  loading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  editingItem: Sentence | null;
  setEditingItem: (item: Sentence | null) => void;
  showAddForm: boolean;
  setShowAddForm: (show: boolean) => void;
  onAddSentence: () => void;
  onEditSentence: (sentence: Sentence) => void;
  onDeleteSentence: (id: string) => void;
  onSearchSentences: (term: string) => void;
}

export interface AdminUsersPageProps {
  adminUsers: AdminUser[];
  loading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  editingItem: AdminUser | null;
  setEditingItem: (item: AdminUser | null) => void;
  showAddForm: boolean;
  setShowAddForm: (show: boolean) => void;
  onAddAdminUser: () => void;
  onEditAdminUser: (adminUser: AdminUser) => void;
  onDeleteAdminUser: (id: string) => void;
  onSearchAdminUsers: (term: string) => void;
}

export interface GenericPageProps<T extends DataProps> {
  data: T[];
  loading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  editingItem: T | null;
  setEditingItem: (item: T | null) => void;
  showAddForm: boolean;
  setShowAddForm: (show: boolean) => void;
  onAdd: () => void;
  onEdit: (item: T) => void;
  onDelete: (id: string | number) => void;
  onSearch: (term: string) => void;
  title: string;
  addButtonText: string;
  searchPlaceholder: string;
}
