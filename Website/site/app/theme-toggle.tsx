'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect } from 'react';

export default function ThemeToggle() {
  useEffect(() => {
    function syncTheme(event: StorageEvent) {
      if (event.key !== 'rmsoftware-theme' && event.key !== null) return;

      if (event.newValue === 'light' || event.newValue === 'dark') {
        document.documentElement.dataset.theme = event.newValue;
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }

    window.addEventListener('storage', syncTheme);
    return () => window.removeEventListener('storage', syncTheme);
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const isDark =
      root.dataset.theme === 'dark' ||
      (root.dataset.theme !== 'light' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    const theme = isDark ? 'light' : 'dark';

    root.dataset.theme = theme;
    try {
      localStorage.setItem('rmsoftware-theme', theme);
    } catch {
      // The toggle still works when browser storage is unavailable.
    }
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      title="Toggle light and dark mode"
      onClick={toggleTheme}
    >
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
