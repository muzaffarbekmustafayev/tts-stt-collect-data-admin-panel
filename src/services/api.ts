// API service for backend communication
// Replace these with your actual backend endpoints

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      // Add authentication header if needed
      // 'Authorization': `Bearer ${token}`,
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Data fetching methods
  async getSentences() {
    return this.request<any[]>('/sentences');
  }

  async getUsers() {
    return this.request<any[]>('/users');
  }

  async getAudios() {
    return this.request<any[]>('/audios');
  }

  async getCheckedAudios() {
    return this.request<any[]>('/checked-audios');
  }

  // Example of how to fetch all data at once
  async getAllData() {
    try {
      const [sentences, users, audios, checkedAudios] = await Promise.all([
        this.getSentences(),
        this.getUsers(),
        this.getAudios(),
        this.getCheckedAudios(),
      ]);

      return {
        sentences: sentences.data,
        users: users.data,
        audios: audios.data,
        checked_audios: checkedAudios.data,
      };
    } catch (error) {
      console.error('Failed to fetch all data:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
