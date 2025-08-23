import { createContext } from "react";

type ContextType = {
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  token: string | null;
}

export const AuthContext = createContext<ContextType | null>(null);
