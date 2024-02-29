"use client"
import React, { createContext, useContext, ReactNode } from 'react';

interface ScrollContextProps {
  scrollToContent: (header: string) => void;
}

const ScrollContext = createContext<ScrollContextProps | undefined>(undefined);

export const useScrollContext = (): ScrollContextProps => {
  const context = useContext(ScrollContext);

  if (!context) {
    throw new Error('useScrollContext must be used within a ScrollProvider');
  }

  return context;
};

interface ScrollProviderProps {
  children: ReactNode;
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
  const scrollToContent = (header: string) => {
    const targetElement = document.getElementById(header);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ScrollContext.Provider value={{ scrollToContent }}>
      {children}
    </ScrollContext.Provider>
  );
};
