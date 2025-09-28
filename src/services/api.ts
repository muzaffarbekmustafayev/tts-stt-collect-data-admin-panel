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
  private async request<T>( endpoint: string, options: RequestInit = {}, token: string | null = null, contentType: string = 'application/x-www-form-urlencoded' ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;

    // 'Content-Type': 'application/x-www-form-urlencoded',
    const defaultHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': contentType,
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
        console.log(error);
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
      const resData = await this.getStats(token);
      if (!resData.success) {
        throw new Error(resData.message || 'Failed to fetch statistics');
      }
      return resData.data;
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


  //============ users methods ============
  async addUser(user: User, token: string,) {
    return this.request<User>(`/users`, {
      method: 'POST',
      body: JSON.stringify(
        {telegram_id: user.telegram_id || '', name: user.name.trim(), age: user.age, gender: user.gender, info: user.info || ''}
      ),
      headers: {'accept': 'application/json',},
    }, token, 'application/json');
  }
  
  async updateUser(user: User, token: string) {
    return this.request<User>(`/admin/users/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify(
        {telegram_id: user.telegram_id || '', name: user.name.trim(), age: user.age, gender: user.gender, info: user.info || ''}
      ),
      headers: {'accept': 'application/json'}
    }, token, 'application/json');
  }

  async deleteUser(id: string | number, token: string) {
    return this.request<User>(`/admin/users/${id}`, {
      method: 'DELETE',
    }, token);
  }


  //============ sentences methods ============
  async addSentence(sentence: Sentence, token: string) {
    return this.request<Sentence>(`/sentences`, {
      method: 'POST',
      body: JSON.stringify(sentence),
      headers: {'accept': 'application/json',},
    }, token, 'application/json');
  }
  
  async updateSentence(sentence: Sentence, token: string) {
    return this.request<Sentence>(`/sentences/${sentence.id}`, {
      method: 'PUT',
      body: JSON.stringify({text: sentence.text, language: sentence?.language}),
      headers: {'accept': 'application/json',},
    }, token, 'application/json');
  }
  
  async deleteSentence(id: string | number, token: string) {
    return this.request<Sentence>(`/sentences/${id}`, {
      method: 'DELETE',
    }, token, 'application/json');
  }

  //============ AdminUser methods ============
  async addAdminUser(adminUser: AdminUser, token: string) {
    return this.request<AdminUser>(`/admin`, {
      method: 'POST',
      body: JSON.stringify(adminUser),
      headers: {'accept': 'application/json',},
    }, token, 'application/json');
  }
  
  async updateAdminUser(adminUser: AdminUser, token: string) {
    return this.request<AdminUser>(`/admin/${adminUser.id}`, {
      method: 'PUT',
      body: JSON.stringify({username: adminUser.username, is_active: adminUser.is_active, role: adminUser.role, password: adminUser.password}),
      headers: {'accept': 'application/json',},
    }, token, 'application/json');
  }
  
  async deleteAdminUser(id: string | number, token: string) {
    return this.request<AdminUser>(`/admin/${id}`, {
      method: 'DELETE',
    }, token, 'application/json');
  }

  //============ audios methods ============
  // async addAudio(audio: Audio, token: string,) {
  //   return this.request<Audio>(`/audios`, {
  //     method: 'POST',
  //     body: JSON.stringify(
  //       {user_id: audio.user_id || '', sentence_id: audio.sentence_id || '', audio_path: audio.audio_path || ''}
  //     ),
  //     headers: {'accept': 'application/json',},
  //   }, token, 'application/json');
  // }
  
  // async updateAudio(audio: Audio, token: string) {
  //   return this.request<Audio>(`/admin/audios/${audio.id}`, {
  //     method: 'PUT',
  //     body: JSON.stringify(
  //       {user_id: audio.user_id || '', sentence_id: audio.sentence_id || '', audio_path: audio.audio_path || ''}
  //     ),
  //     headers: {'accept': 'application/json'}
  //   }, token, 'application/json');
  // }

  async deleteAudio(id: string | number, token: string) {
    return this.request<Audio>(`/received-audio/${id}`, {
      method: 'DELETE',
    }, token);
  }
  

  //============ checked audios methods ============
  // async addCheckedAudio(checkedAudio: CheckedAudio, token: string,) {
  //   return this.request<CheckedAudio>(`/checked-audios`, {
  //     method: 'POST',
  //     body: JSON.stringify(
  //       {audio_id: checkedAudio?.audio_id || '', checked_by: checkedAudio.checked_by || '', comment: checkedAudio.comment || '', is_correct: checkedAudio.is_correct || ''}
  //     ),
  //     headers: {'accept': 'application/json',},
  //   }, token, 'application/json');
  // }
  
  // async updateCheckedAudio(checkedAudio: CheckedAudio, token: string) {
  //   return this.request<CheckedAudio>(`/admin/checked-audios/${checkedAudio.id}`, {
  //     method: 'PUT',
  //     body: JSON.stringify(
  //       {audio_id: checkedAudio?.audio_id || '', checked_by: checkedAudio.checked_by || '', comment: checkedAudio.comment || '', is_correct: checkedAudio.is_correct || ''}
  //     ),
  //     headers: {'accept': 'application/json'}
  //   }, token, 'application/json');
  // }

  async deleteCheckedAudio(id: string | number, token: string) {
    return this.request<CheckedAudio>(`/checked-audio/${id}`, {
      method: 'DELETE',
    }, token);
  }



  //============ reference User methods ============
  async getReferenceUser(id: string | number, token: string) {
    return this.request<User>(`/users/by-id/${id}`, {
      method: 'GET',
    }, token);
  }

  async getReferenceSentence(id: string | number, token: string) {
    return this.request<Sentence>(`/sentences/by-id/${id}`, {
      method: 'GET',
    }, token);
  }

  async getReferenceAudio(id: string | number, token: string) {
    return this.request<Audio>(`/received-audio/by-id/${id}`, {
      method: 'GET',
    }, token);
  }

}

export const apiService = new ApiService();
