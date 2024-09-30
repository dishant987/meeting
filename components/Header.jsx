"use client";
import Link from 'next/link';
import { PenSquare, LogIn, Sun, Moon, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import UserMenu from './user-menu';
import { useTheme } from "next-themes";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    theme === "dark" ? setIsDark(true) : setIsDark(false);
  }, [setTheme]);
  const handleThemeChange = () => {
    setIsDark(!isDark);
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <header className={`bg-white shadow-lg dark:bg-gray-700`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between flex-wrap">
        <Link href="/" className="flex items-center space-x-2">
          <svg
            className="h-8 w-8 text-primary dark:text-white"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
            <path d="M8 7h6" />
            <path d="M8 11h8" />
            <path d="M8 15h6" />
          </svg>
          <span className="text-xl font-bold text-primary dark:text-white">
            Scheduler Meeting
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/create-post"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-600"
          >
            <PenSquare className="mr-2 h-4 w-4" />
            Create Post
          </Link>

          <SignedOut>
            <Link href="/sign-in">
              <Button variant="outline" className="text-black dark:text-white">
                <LogIn className="mr-2 h-4 w-4 inline" />
                Login
              </Button>
            </Link>
          </SignedOut>

          <SignedIn>
            <UserMenu />
          </SignedIn>

          <button
            onClick={handleThemeChange}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            <motion.div
              animate={{ rotate: isDark ? 360 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {isDark ? (
                <Moon className="h-5 w-5 text-white" />
              ) : (
                <Sun className="h-5 w-5 text-yellow-500" />
              )}
            </motion.div>
          </button>
        </div>

        {/* Sidebar Toggle Button */}
        <button
          className="md:hidden p-2 rounded-md focus:outline-none"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open sidebar menu"
        >
          <Menu className="h-6 w-6 text-primary dark:text-white" />
        </button>
      </div>

      {/* Sidebar Menu */}
      {isSidebarOpen && (
        <motion.div
          className="fixed top-0 right-0 w-64 h-full bg-white dark:bg-gray-800 shadow-lg z-50 overflow-y-auto p-4 transition-transform transform"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-end items-center mb-4">
            <button onClick={() => setIsSidebarOpen(false)} aria-label="Close sidebar">
              <X className="h-6 w-6 text-primary dark:text-white" />
            </button>
          </div>

          <nav className="flex flex-col items-center space-y-2">
            <Link
              href="/create-post"
              className="block w-full text-left py-2 px-4 text-sm font-medium text-primary dark:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsSidebarOpen(false)}
            >
              <PenSquare className="mr-2 h-4 w-4 inline" />
              Create Post
            </Link>

            <SignedOut>
              <Link href="/sign-in" className="block w-full text-left py-2 px-4 text-sm font-medium text-primary dark:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
                <LogIn className="mr-2 h-4 w-4 inline" />
                Login
              </Link>
            </SignedOut>

            <SignedIn>
              <UserMenu />
            </SignedIn>

            <button
              onClick={handleThemeChange}
              className="block w-full rounded-xl text-left py-2 px-4 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Moon className="h-5 w-5 text-white inline" />
              ) : (
                <Sun className="h-5 w-5 text-yellow-500 inline" />
              )}
            </button>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
