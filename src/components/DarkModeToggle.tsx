import { FC, useEffect, useState } from 'react';
import { logAnalyticEvent } from '../lib/gtag';
import { useRouter } from 'next/router';

export type Themes = 'light' | 'dark';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

const DarkModeToggle: FC = () => {
  const router = useRouter();

  const [theme, setTheme] = useState<Themes>(() => {
    const persistedTheme = localStorage?.getItem('theme') as Themes;

    if (persistedTheme === Theme.DARK) {
      document.querySelector('html')?.classList.add(Theme.DARK);
      return persistedTheme;
    }
    return Theme.LIGHT;
  });

  useEffect(() => {
    const existingTheme: Themes = localStorage.getItem('theme') as Themes;
    if (existingTheme && existingTheme !== theme) {
      setTheme(existingTheme);
      const htmlTag = document.querySelector('html');
      if (existingTheme === Theme.DARK && htmlTag?.classList.contains(Theme.DARK) === false)
        htmlTag.classList.add(Theme.DARK);
    }
  }, [theme]);

  const logAnalytic = (nextTheme: Theme) =>
    logAnalyticEvent({
      action: 'change_theme',
      params: {
        category: 'app_interaction',
        label: nextTheme,
        page_location: router.asPath,
      },
    });

  function onChangeTheme(): void {
    const nextTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
    document
      .querySelector('html')
      ?.classList[nextTheme === Theme.DARK ? 'add' : 'remove'](Theme.DARK);

    logAnalytic(nextTheme);
  }

  return (
    <div className="right-0 top-0 inline-flex items-center space-x-3 sm:absolute">
      {theme === Theme.LIGHT ? (
        <svg
          width={30}
          height={30}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg
          className="text-white"
          width={30}
          height={30}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      )}

      <div className="relative h-8 transition duration-200 ease-in">
        <label
          htmlFor="toggleDarkMode"
          aria-label="Toggle Dark Mode"
          className="relative inline-flex cursor-pointer">
          <input
            id="toggleDarkMode"
            type="checkbox"
            className="peer hidden"
            checked={theme === Theme.DARK}
            onChange={onChangeTheme}
          />
          <span
            className="block h-8 w-16 rounded-full bg-white shadow-inner"
            style={{ backgroundColor: theme === Theme.LIGHT ? 'rgba(0, 0, 0, 0.54)' : '#5600D7' }}
          />
          <span
            className="absolute h-6 w-6 translate-x-[3px] translate-y-[4px] transform-gpu rounded-full bg-white peer-checked:translate-x-9"
            style={{ boxShadow: '-0.08rem .2rem 0.3rem 0.01rem rgba(0,0,0,0.2)' }}
          />
        </label>
      </div>
      {theme === Theme.LIGHT ? (
        <svg
          width={30}
          height={30}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ) : (
        <svg
          className="text-white"
          width={30}
          height={30}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </div>
  );
};

export default DarkModeToggle;
