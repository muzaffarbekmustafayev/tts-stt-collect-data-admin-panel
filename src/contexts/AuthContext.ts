import { createContext } from "react";

type User = {
  name: string;
}

type ContextType = {
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<ContextType | null>(null);
