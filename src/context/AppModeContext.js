// ─────────────────────────────────────────────────────────────────────────────
//  src/context/AppModeContext.js  –  Global toggle: Client ↔ Tasker mode
// ─────────────────────────────────────────────────────────────────────────────

import React, { createContext, useContext, useState } from 'react';

const AppModeContext = createContext(null);

export function AppModeProvider({ children }) {
  const [isTaskerMode, setIsTaskerMode] = useState(false);
  return (
    <AppModeContext.Provider value={{ isTaskerMode, setIsTaskerMode }}>
      {children}
    </AppModeContext.Provider>
  );
}

export const useAppMode = () => useContext(AppModeContext);
