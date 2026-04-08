import { createContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import type { AdminUser, Audio, CheckedAudio, Sentence, User, Statistics } from '@/types/user';
import { apiService } from '@/services/api';
import type { UserStatistics } from '@/types/pageInterfaces';

interface DataContextType {
  currentUser: AdminUser | null;
  usersData: User[];
  adminUsersData: AdminUser[];
  audiosData: Audio[];
  checkedAudiosData: CheckedAudio[];
  sentencesData: Sentence[];
  userStatisticsData: UserStatistics[];
  stats: Statistics;
  loading: boolean;
  error: string | null;
  fetchUsers: (page: number, limit: number, token: string | null, findingValue: string | null) => Promise<void>;
  fetchAdminUsers: (page: number, limit: number, token: string | null) => Promise<void>;
  fetchStats: (token: string | null) => Promise<void>;
  fetchSentences: (page: number, limit: number, token: string | null, findingValue: string | null) => Promise<void>;
  fetchAudios: (page: number, limit: number, token: string | null) => Promise<void>;
  fetchCheckedAudios: (page: number, limit: number, token: string | null) => Promise<void>;
  fetchUserStatistics: (page: number, limit: number, token: string | null, findingValue: string | null) => Promise<void>;
  getUserStatisticsToDownload: () => Promise<UserStatistics[] | undefined>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);


interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const { token, logout } = useAuth();
  const [stats, setStats] = useState<Statistics>({
    sentences: 0,
    users: 0,
    audios: 0,
    checked_audios: 0,
    admins: 0,
    total_audio_duration: 0,
  });
  const [usersData, setUsersData] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [adminUsersData, setAdminUsersData] = useState<AdminUser[]>([]);
  const [audiosData, setAudiosData] = useState<Audio[]>([]);
  const [checkedAudiosData, setCheckedAudiosData] = useState<CheckedAudio[]>([]);
  const [sentencesData, setSentencesData] = useState<Sentence[]>([]);
  const [userStatisticsData, setUserStatisticsData] = useState<UserStatistics[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = useCallback(async (token: string | null) => {
    if (!token) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await apiService.getAllData(token);
      setUsersData(data.users || []);
      setAdminUsersData(data.admin_users || []);
      setAudiosData(data.audios || []);
      setCheckedAudiosData(data.checked_audios || []);
      setSentencesData(data.sentences || []);
      setStats({
        sentences: data.statistics?.sentences || 0,
        users: data.statistics?.users || 0,
        audios: data.statistics?.audios || 0,
        checked_audios: data.statistics?.checked_audios || 0,
        admins: data.statistics?.admins || 0,
        total_audio_duration: data.statistics?.total_audio_duration_minutes || data.statistics?.total_audio_duration || 0,
      });
      if (data.current_admin && data.admin_users) {
        const found = data.admin_users.find((admin: AdminUser) => admin.username === data.current_admin.username);
        if (found) setCurrentUser(found);
      }
    } catch (err) {
      if(err instanceof Error && err.cause === "Unauthorized") {
        logout();
      }
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }

  }, [logout]);

  const fetchStats = useCallback(async (token: string | null) => {
    if (!token) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await apiService.getStats(token);
      if (data.success) {
        setStats({
          sentences: data.data.statistics.sentences || 0,
          users: data.data.statistics.users || 0,
          audios: data.data.statistics.audios || 0,
          checked_audios: data.data.statistics.checked_audios || 0,
          admins: data.data.statistics.admins || 0,
          total_audio_duration: data.data.statistics.total_audio_duration_minutes || data.data.statistics.total_audio_duration || 0
        });
        // setUsersData(data.data.users);
        // setAdminUsersData(data.data.admin_users);
        // setAudiosData(data.data.audios);
        // setCheckedAudiosData(data.data.checked_audios);
        // setSentencesData(data.data.sentences);
      } else {
        if(data.status && data.status === 401) {
          logout();
        }
        setError(data.message || 'Failed to fetch data');
      }
    } catch (err) {
      if(err instanceof Error && err.cause === "Unauthorized") {
        logout();
      }
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, [logout]);

  const fetchUsers = useCallback(async (page: number = 1, limit: number = 10, token: string | null = null, findingValue: string | null = null) => {
    if (!token) {
      setUsersData([]);
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const data = await apiService.getUsers(page, limit, token, findingValue ? findingValue : null);
      if (data.success) {
        setUsersData(data.data);
      } else {
        if(data.status && data.status === 401) {
          logout();
        }
        setError(data.message || 'Failed to fetch data');
      }
    } catch (err) {
      if(err instanceof Error && err.cause === "Unauthorized") {
        logout();
      }
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    }

    setLoading(false);
    setError(null);
  }, [logout]);

  const fetchAdminUsers = useCallback(async (page: number = 1, limit: number = 10, token: string | null = null) => {
    if (!token) {
      setAdminUsersData([]);
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const data = await apiService.getAdminUsers(page, limit, token);
      if (data.success) {        
        setAdminUsersData(data.data);
      } else {
        if(data.status && data.status === 401) {
          logout();
        }
        setError(data.message || 'Failed to fetch data');
      }
    } catch (err) {
      if(err instanceof Error && err.cause === "Unauthorized") {
        logout();
      }
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    }

    setLoading(false);
    setError(null);
  }, [logout]);

  const fetchSentences = useCallback(async (page: number = 1, limit: number = 10, token: string | null = null, findingValue: string | null = null) => {
    if (!token) {
      setSentencesData([]);
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const data = await apiService.getSentences(page, limit, token, findingValue ? findingValue : null);
      if (data.success) {
        setSentencesData(data.data);
      } else {
        if(data.status && data.status === 401) {
          logout();
        }
        setError(data.message || 'Failed to fetch data');
      }
    } catch (err) {
      if(err instanceof Error && err.cause === "Unauthorized") {
        logout();
      }
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    }

    setLoading(false);
    setError(null);
  }, [logout]);

  const fetchAudios = useCallback(async (page: number = 1, limit: number = 10, token: string | null = null) => {
    if (!token) {
      setAudiosData([]);
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const data = await apiService.getAudios(page, limit, token);
      if (data.success) {
        // Backend returns {data: [...], total, page, limit, pages}
        setAudiosData(data.data.data ?? data.data as unknown as Audio[]);
      } else {
        if(data.status && data.status === 401) {
          logout();
        }
        setError(data.message || 'Failed to fetch data');
      }
    } catch (err) {
      if(err instanceof Error && err.cause === "Unauthorized") {
        logout();
      }
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    }

    setLoading(false);
    setError(null);
  }, [logout]);

  const fetchCheckedAudios = useCallback(async (page: number = 1, limit: number = 10, token: string | null = null) => {
    if (!token) {
      setCheckedAudiosData([]);
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const data = await apiService.getCheckedAudios(page, limit, token);
      if (data.success) {
        // Backend returns {data: [...], total, page, limit, pages}
        setCheckedAudiosData(data.data.data ?? data.data as unknown as CheckedAudio[]);
      } else {
        if(data.status && data.status === 401) {
          logout();
        }
        setError(data.message || 'Failed to fetch data');
      }
    } catch (err) {
      if(err instanceof Error && err.cause === "Unauthorized") {
        logout();
      }
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    }

    setLoading(false);
    setError(null);
  }, [logout]);

  const fetchUserStatistics = useCallback(async (page: number = 1, limit: number = 10, token: string | null = null, findingValue: string | null = null) => {
    if (!token) {
      setUserStatisticsData([]);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const data = await apiService.getUserStatistics(page, limit, token, findingValue ? findingValue : null);
      if (data.success) {
        setUserStatisticsData(data.data);
      } else {
        if(data.status && data.status === 401) {
          logout();
        }
        setError(data.message || 'Failed to fetch data');
      }
    } catch (err) {
      if(err instanceof Error && err.cause === "Unauthorized") {
        logout();
      }
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    }

    setLoading(false);
    setError(null);
  }, [logout]);

  const getUserStatisticsToDownload = useCallback(async () => {
    if (!token) {
      return;
    }
    try {
      
      const data = await apiService.getUserStatistics(1, 10000, token, null);
      if (data.success) {
        return data.data;
      } else {
        if(data.status && data.status === 401) {
          logout();
        }
        setError(data.message || 'Failed to fetch data');
      }
    } catch (err) {
      if(err instanceof Error && err.cause === "Unauthorized") {
        logout();
      }
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, [token, logout]);

  useEffect(() => {
    if (token) {
      fetchAllData(token);
    }
  }, [token, fetchAllData]);

  const value = {
    usersData,
    adminUsersData,
    audiosData,
    checkedAudiosData,
    sentencesData,
    userStatisticsData,
    loading,
    error,
    currentUser,
    stats,
    fetchUsers,
    fetchStats,
    fetchAdminUsers,
    fetchSentences,
    fetchAudios,
    fetchCheckedAudios,
    fetchUserStatistics,
    getUserStatisticsToDownload,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;