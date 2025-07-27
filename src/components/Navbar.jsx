import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { id: 'hero',     label: 'Home'     },
  { id: 'about',    label: 'About'    },
  { id: 'skills',   label: 'Skills'   },
  { id: 'projects', label: 'Projects' },
  { id: 'blog',     label: 'Blog'     },
  { id: 'contact',  label: 'Contact'  },
];

export default function Navbar({ isDark, setIsDark }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 backdrop-blur transition
        ${isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 border-b'
          : 'bg-white/0 dark:bg-gray-900/0'}
      `}
    >
      <div className="container mx-auto px-6 lg:px-8 h-16 flex items-center">
        {/* Logo / Name */}
        <div
          className="font-bold text-xl cursor-pointer text-black "
          onClick={() => scrollTo('hero')}
        >
          &lt;Portfolio /&gt;
        </div>

        {/* Center nav links (md+) */}
        <div className="hidden md:flex flex-1 justify-center space-x-6 ">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm font-medium text-black  hover:underline transition"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right: social icons (lg+), then theme toggle */}
        <div className="ml-auto flex items-center space-x-4">
          {/* social on large screens */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="https://www.linkedin.com/in/muhammad-moin-ud-din-zafar-hashmi-18baa536b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:opacity-80 transition"
              style={{ color: '#0A66C2' }}
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/moin-ud-din-zafar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:opacity-80 transition"
              style={{ color: '#181717' }}
            >
              <FaGithub />
            </a>
          </div>

          {/* theme toggle always */}
          <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
        </div>
      </div>
    </nav>
  );
}
