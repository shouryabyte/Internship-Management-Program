import React, { createContext, useContext, useState } from "react";
import { User, UserRole } from "@/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("demoUser");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string, role: UserRole) => {
    // DEMO PASSWORD
    if (password !== "demo123") return false;

    const demoUser: User = {
      id: Date.now().toString(),
      email,
      name: role === "admin" ? "Demo Admin" : "Demo Student",
      role,
    };

    setUser(demoUser);
    localStorage.setItem("demoUser", JSON.stringify(demoUser));
    localStorage.setItem("demoToken", "demo-token");

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("demoUser");
    localStorage.removeItem("demoToken");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
