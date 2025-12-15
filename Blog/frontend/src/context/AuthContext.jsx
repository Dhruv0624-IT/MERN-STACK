import { createContext, useState, useEffect, useMemo } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem("user");
    }
  }, []);

  const login = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
