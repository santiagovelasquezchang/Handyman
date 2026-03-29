// ─────────────────────────────────────────────────────────────────────────────
//  src/context/AuthContext.js  –  Auth state (in-memory mock)
// ─────────────────────────────────────────────────────────────────────────────

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData ?? { name: 'Wilmer', email: 'wilmer@handyman.com', phone: '+58 412 555 0199' });
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
