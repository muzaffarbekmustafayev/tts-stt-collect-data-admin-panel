import type {
  AdminUser,
  User,
  Sentence,
  Audio,
  CheckedAudio,
} from '@/types/user';
const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://asror-qobulov.jprq.site';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

class ApiService {
  private async request<T>( endpoint: string, options: RequestInit = {}, token: string | null = null ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}/`;

    const defaultHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.detail ||
            error.message ||
            'Something went wrong, status code: ' + response.status
        );
      }
      const data = await response.json();
      return {
        data: data,
        success: true,
      };
    } catch (error) {
      console.error('API request failed:', error); // TODO: remove this
      throw error;
    }
  }

  // Data fetching methods
  async getSentences() {
    return this.request<Sentence[]>('/sentences');
  }

  async getUsers() {
    return this.request<User[]>('/users');
  }

  async getAudios() {
    return this.request<Audio[]>('/audios');
  }

  async getCheckedAudios() {
    return this.request<CheckedAudio[]>('/checked-audios');
  }

  async getAdminUsers() {
    return this.request<AdminUser[]>('/admin-users');
  }

  async getAllData() {
    try {
      const [sentences, users, audios, checkedAudios, adminUsers] = await Promise.all([
        this.getSentences(),
        this.getUsers(),
        this.getAudios(),
        this.getCheckedAudios(),
        this.getAdminUsers(),
      ]);

      return {
        sentences: sentences.data,
        users: users.data,
        audios: audios.data,
        checked_audios: checkedAudios.data,
        admin_users: adminUsers.data,
      };
    } catch (error) {
      console.error('Failed to fetch all data:', error);
      throw error;
    }
  }

  async getMe(token: string) {
    return this.request<AdminUser>(
      '/auth/me',
      {
        method: 'GET',
      },
      token
    );
  }

  async authLogin(username: string, password: string) {
    return this.request<{
      token: string;
    }>('/auth/login', {
      method: 'POST',
      body: new URLSearchParams({ grant_type: 'password', username, password }),
    });
  }
}

export const apiService = new ApiService();
