import type {
  AdminUser,
  User,
  Sentence,
  Audio,
  CheckedAudio,
  Stats,
} from '@/types/user';
const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://asror-qobulov.jprq.site';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  status?: number;
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
        if(response.status === 401) {
          throw new Error("401", { cause: "Unauthorized" });
        }
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
        status: response.status,
      };
    } catch (error) {
      console.error('API request failed:', error); // TODO: remove this
      throw error;
    }
  }

  // Data fetching methods
  async getSentences(page: number = 1, limit: number = 10, token: string | null = null) {
    return this.request<Sentence[]>(`/admin/sentences?page=${page}&limit=${limit}`, {
      method: 'GET',
    }, token);
  }

  async getUsers(page: number = 1, limit: number = 10, token: string | null = null) {
    return this.request<User[]>(`/admin/users?page=${page}&limit=${limit}`, {
      method: 'GET',
    }, token);
  }

  async getAudios(page: number = 1, limit: number = 10, token: string | null = null) {
    return this.request<Audio[]>(`/admin/audios?page=${page}&limit=${limit}`, {
      method: 'GET',
    }, token);
  }

  async getCheckedAudios(page: number = 1, limit: number = 10, token: string | null = null) {
    return this.request<CheckedAudio[]>(`/admin/checked-audios?page=${page}&limit=${limit}`, {
      method: 'GET',
    }, token);
  }

  async getAdminUsers(page: number = 1, limit: number = 10, token: string | null = null) {
    return this.request<AdminUser[]>(`/admin/admin-users?page=${page}&limit=${limit}`, {
      method: 'GET',
    }, token);
  }

  async getAllData(token: string) {
    try {
      const [sentences, users, audios, checkedAudios, adminUsers, currentUser] = await Promise.all([
        this.getSentences(1, 10, token),
        this.getUsers(1, 10, token),
        this.getAudios(1, 10, token),
        this.getCheckedAudios(1, 10, token),
        this.getAdminUsers(1, 10, token),
        this.getMe(token),
      ]);

      return {
        sentences: sentences.data,
        users: users.data,
        audios: audios.data,
        checked_audios: checkedAudios.data,
        admin_users: adminUsers.data,
        current_user: currentUser.data,
      };
    } catch (error) {
      console.error('Failed to fetch all data:', error);
      throw error;
    }
  }

  // Stats methods
  async getStats(token: string) {
    return this.request<Stats>('/admin/statistics', {
      method: 'GET',
    }, token);
  }


  // Auth methods
  async getMe(token: string | null = null) {
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
