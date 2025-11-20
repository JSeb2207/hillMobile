import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



// Tipos
interface UserData {
  name: string;
  email: string;
  avatar?: string;
}

interface AppSettings {
  notificationsEnabled: boolean;
  darkMode: boolean;
  soundEnabled: boolean;
}

interface AppContextType {
  user: UserData;
  settings: AppSettings;
  updateUser: (userData: Partial<UserData>) => Promise<void>;
  updateSettings: (settings: Partial<AppSettings>) => Promise<void>;
  isLoading: boolean;
}

// Valores por defecto
const defaultUser: UserData = {
  name: 'Usuario',
  email: 'usuario@example.com',
};

const defaultSettings: AppSettings = {
  notificationsEnabled: true,
  darkMode: false,
  soundEnabled: true,
};

// Crear contexto
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData>(defaultUser);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar datos al iniciar
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userData, settingsData] = await Promise.all([
        AsyncStorage.getItem('user'),
        AsyncStorage.getItem('settings'),
      ]);

      if (userData) {
        setUser(JSON.parse(userData));
      }
      if (settingsData) {
        setSettings(JSON.parse(settingsData));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userData: Partial<UserData>) => {
    try {
      const newUser = { ...user, ...userData };
      setUser(newUser);
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const updateSettings = async (newSettings: Partial<AppSettings>) => {
    try {
      const updatedSettings = { ...settings, ...newSettings };
      setSettings(updatedSettings);
      await AsyncStorage.setItem('settings', JSON.stringify(updatedSettings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        settings,
        updateUser,
        updateSettings,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Hook para usar el contexto
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}