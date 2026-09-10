'use client';

import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    const isDark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = isDark ? 'light' : 'dark';

    root.dataset.theme = theme;
    try {
      localStorage.setItem('rmsoftware-theme', theme);
    } catch {
      // The toggle still works when browser storage is unavailable.
    }
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme}>
      <span className="light-theme-icon">
        <Moon size={20} aria-hidden="true" />
        <span className="sr-only">Switch to dark mode</span>
      </span>
      <span className="dark-theme-icon">
        <Sun size={20} aria-hidden="true" />
        <span className="sr-only">Switch to light mode</span>
      </span>
    </button>
  );
}
