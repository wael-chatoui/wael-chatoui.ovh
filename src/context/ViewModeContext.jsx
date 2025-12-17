import { createContext, useContext, useState, useEffect } from 'react';

const ViewModeContext = createContext();

export const ViewModeProvider = ({ children }) => {
  const [viewMode, setViewMode] = useState('recruiter'); // 'recruiter' | 'technical'

  // Persist choice
  useEffect(() => {
    const savedMode = localStorage.getItem('viewMode');
    if (savedMode) setViewMode(savedMode);
  }, []);

  const toggleViewMode = () => {
    setViewMode((prev) => {
      const newMode = prev === 'recruiter' ? 'technical' : 'recruiter';
      localStorage.setItem('viewMode', newMode);
      return newMode;
    });
  };

  return (
    <ViewModeContext.Provider value={{ viewMode, toggleViewMode, isTechnical: viewMode === 'technical' }}>
      {children}
    </ViewModeContext.Provider>
  );
};

export const useViewMode = () => {
  const context = useContext(ViewModeContext);
  if (!context) {
    throw new Error('useViewMode must be used within a ViewModeProvider');
  }
  return context;
};
