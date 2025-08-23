import { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { apiService } from "@/services/api";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token') || null);

  const login = async (username: string, password: string) => {
    const result = await apiService.authLogin(username, password);
    if (!result.success) throw new Error("Login failed");
    setToken(result.data.token);
    localStorage.setItem('auth_token', result.data.token);
  };

  const logout = async () => {
    setToken(null);
    localStorage.removeItem('auth_token');
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
}
