import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { sentences, users, audios, checked_audios } from '../mockData';

interface DataContextType {
  usersData: any[];
  audiosData: any[];
  checkedAudiosData: any[];
  sentencesData: any[];
  loading: boolean;
  error: string | null;
  refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const { user } = useAuth();
  const [usersData, setUsersData] = useState<any[]>([]);
  const [audiosData, setAudiosData] = useState<any[]>([]);
  const [checkedAudiosData, setCheckedAudiosData] = useState<any[]>([]);
  const [sentencesData, setSentencesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!user) {
      // Clear data when user is not authenticated
      setUsersData([]);
      setAudiosData([]);
      setCheckedAudiosData([]);
      setSentencesData([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUsersData(users);
      setAudiosData(audios);
      setCheckedAudiosData(checked_audios);
      setSentencesData(sentences);
    } catch (err) {
      setError('Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const value = {
    usersData,
    audiosData,
    checkedAudiosData,
    sentencesData,
    loading,
    error,
    refreshData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
