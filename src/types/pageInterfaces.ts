import type { DataProps } from "@/components/custom/CustomTable/interfaces";

// User interface - using existing User type from user.ts
export interface User extends DataProps {
  id: number;
  telegram_id?: string;
  name: string;
  gender: string;
  age: number;
  // phone: string;
  info?: string;
  created_at: string;
}

// AdminUser interface
export interface AdminUser extends DataProps {
  id: number;
  username: string;
  is_active: boolean;
  role: string;
  created_at: string;
}

// Sentence interface
export interface Sentence extends DataProps {
  id: number;
  text: string;
  language: string;
  created_at: string;
}

// Users page specific interface
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

// Sentences page specific interface
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
  onDeleteSentence: (id: number) => void;
  onSearchSentences: (term: string) => void;
}

// AdminUsers page specific interface
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

// Generic page interface for any data type
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
