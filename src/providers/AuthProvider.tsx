import { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { apiService } from "@/services/api";
import { storageNames } from "@/services/staticNames";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem(storageNames.token) || null);

  const login = async (username: string, password: string) => {
    const result = await apiService.authLogin(username, password);
    if (!result.success) throw new Error("Login failed");
    setToken(result.data.token);
    localStorage.setItem(storageNames.token, result.data.token);
  };

  const logout = async () => {
    setToken(null);
    localStorage.removeItem(storageNames.token);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
}
