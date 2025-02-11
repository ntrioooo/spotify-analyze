'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [mounted, setMounted] = useState(false);

  // Menghindari masalah render saat pertama kali (untuk nextjs)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Pastikan komponen hanya dirender setelah mount (untuk menghindari masalah dengan SSR)
  if (!mounted) return null;

  const currentTheme = theme ?? 'light';

  return (
    <nav className="sticky top-0 z-10 dark:bg-zinc-950 dark:text-white">
      <div
        className={`mx-auto px-2 bg-zinc-50 dark:bg-zinc-950 dark:text-white ${
          isScrolled ? 'opacity-50' : null
        }`}
      >
        <div className="relative flex items-center justify-between">
          <div className="flex flex-1 items-center">
            <div className="sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="py-2 text-xl font-semibold text-gray-400 dark:text-white"
                >
                  ntrio
                  <span className="text-black dark:text-gray-500">dev.</span>
                </a>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 text-white"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? (
                <FaMoon
                  className={`transition-transform duration-300 ${
                    currentTheme === 'dark'
                      ? '-rotate-180 scale-0'
                      : 'rotate-0 scale-100'
                  }`}
                />
              ) : (
                <FaSun
                  className={`transition-transform duration-300 ${
                    currentTheme === 'light'
                      ? '-rotate-180 scale-0'
                      : 'rotate-0 scale-100'
                  }`}
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
