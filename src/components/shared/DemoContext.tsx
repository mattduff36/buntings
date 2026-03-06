'use client';

import { createContext, useContext } from 'react';

interface DemoContextValue {
  basePath: string;
  demoId: string;
}

const DemoContext = createContext<DemoContextValue>({ basePath: '', demoId: 'demo1' });

export function DemoProvider({ basePath, demoId, children }: DemoContextValue & { children: React.ReactNode }) {
  return (
    <DemoContext.Provider value={{ basePath, demoId }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  return useContext(DemoContext);
}
