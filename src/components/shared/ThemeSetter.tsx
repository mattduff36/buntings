'use client';

import { useEffect } from 'react';

interface ThemeSetterProps {
  theme: Record<string, string>;
}

export function ThemeSetter({ theme }: ThemeSetterProps) {
  useEffect(() => {
    const html = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      const attr = key === 'solidStyle' ? 'data-solid-style' : `data-${key}`;
      html.setAttribute(attr, value);
    });
  }, [theme]);

  return null;
}
