'use client';
import { Switch } from '@/components/ui/switch';

import { useEffect, useState } from 'react';
import MoonIcon from './MoonIcon';
import SunIcon from './SunIcon';
import { Toggle } from '@radix-ui/react-toggle';

const DarkToggle = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  useEffect(() => {
    const darkModeEnabled = localStorage.getItem('darkModeEnabled');
    setDarkMode(darkModeEnabled === 'true');
  }, []);

  useEffect(() => {
    const bodyElement = document.querySelector('body');
    localStorage.setItem('darkModeEnabled', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
      bodyElement!.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      bodyElement!.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <>
      <Toggle
        className='rounded-lg p-1 transition-all hover:bg-darker-light dark:hover:bg-darker-dark'
        onClick={() => setDarkMode((prev) => !prev)}
      >
        {darkMode ? <MoonIcon /> : <SunIcon />}
      </Toggle>
    </>
  );
};

export default DarkToggle;
