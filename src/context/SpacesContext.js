// ─────────────────────────────────────────────────────────────────────────────
//  src/context/SpacesContext.js
//  Holds the user's spaces list as live React state so any screen that adds
//  or removes a space causes HomeScreen (and others) to re-render.
// ─────────────────────────────────────────────────────────────────────────────

import React, { createContext, useContext, useState } from 'react';
import { MY_SPACES } from '../../mockData';

const SpacesContext = createContext(null);

export function SpacesProvider({ children }) {
  const [spaces, setSpaces] = useState(MY_SPACES);

  const addSpace = (space) => {
    const newSpace = {
      ...space,
      id: `s_${Date.now()}`,
      activeRecurring: 0,
      upcomingCount: 0,
      upcomingService: null,
      healthLabel: 'No services yet',
      healthColor: '#BCBCBC',
    };
    setSpaces((prev) => [...prev, newSpace]);
  };

  const removeSpace = (id) => {
    setSpaces((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <SpacesContext.Provider value={{ spaces, addSpace, removeSpace }}>
      {children}
    </SpacesContext.Provider>
  );
}

export function useSpaces() {
  const ctx = useContext(SpacesContext);
  if (!ctx) throw new Error('useSpaces must be used within SpacesProvider');
  return ctx;
}
