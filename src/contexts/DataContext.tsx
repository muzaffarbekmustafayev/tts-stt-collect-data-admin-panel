import { createContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import type { AdminUser, Audio, CheckedAudio, Sentence, User, Stats } from '@/types/user';
import { apiService } from '@/services/api';

interface DataContextType {
  currentUser: User | null;
  usersData: User[];
  adminUsersData: AdminUser[];
  audiosData: Audio[];
  checkedAudiosData: CheckedAudio[];
  sentencesData: Sentence[];
  stats: Stats;
  loading: boolean;
  error: string | null;
  refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);


interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const { token } = useAuth();
  const [stats, setStats] = useState<Stats>({
    sentences: 0,
    users: 0,
    audios: 0,
    checked_audios: 0,
    admins: 0
  });
  const [usersData, setUsersData] = useState<User[]>([]);
  const [adminUsersData, setAdminUsersData] = useState<AdminUser[]>([]);
  const [audiosData, setAudiosData] = useState<Audio[]>([]);
  const [checkedAudiosData, setCheckedAudiosData] = useState<CheckedAudio[]>([]);
  const [sentencesData, setSentencesData] = useState<Sentence[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (token: string | null) => {
    if (!token) {
      setUsersData([]);
      setAudiosData([]);
      setCheckedAudiosData([]);
      setSentencesData([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await apiService.getAllData();
      setUsersData(data.users);
      setAdminUsersData(data.admin_users);
      setAudiosData(data.audios);
      setCheckedAudiosData(data.checked_audios);
      setSentencesData(data.sentences);
      setCurrentUser(data.users[0]);
      setStats({
        sentences: data.sentences.length,
        users: data.users.length,
        audios: data.audios.length,
        checked_audios: data.checked_audios.length,
        admins: data.admin_users.length
      });
    } catch (err) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshData = () => {
    if (token) {
      fetchData(token);
    }
  };

  useEffect(() => {
    if (token) {
      // fetchData(token);
    }
  }, [token, fetchData]);

  const value = {
    usersData,
    adminUsersData,
    audiosData,
    checkedAudiosData,
    sentencesData,
    loading,
    error,
    refreshData,
    currentUser,
    stats
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;