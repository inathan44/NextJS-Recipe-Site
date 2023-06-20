'use client';

import MenuIcon from './MenuIcon';
import { useState } from 'react';
import Link from 'next/link';
import DarkToggle from './DarkToggle';
import SignUp from './SignInForm';
import LoginModal from './LoginModal';

// type NavProps = {
//   open: boolean;
// };

export default function MobileNav() {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  return (
    <>
      <button
        className='md:hidden'
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <MenuIcon />
      </button>
      <nav
        onClick={() => setShowDropdown(false)}
        className={`fixed left-0 top-0 z-50 mt-16 h-screen w-full md:hidden ${
          showDropdown ? 'bg-black/50' : 'hidden'
        }`}
      >
        <ul
          onClick={() => setShowDropdown(false)}
          className={`flex flex-col items-center justify-center gap-6 overflow-hidden bg-primary-light py-5 font-semibold transition-all dark:bg-primary-dark dark:text-primary-light ${
            showDropdown ? 'h-auto' : 'h-0'
          }`}
        >
          <li>
            <Link href={'/'}>Home</Link>
          </li>
          <li>
            <Link href={'/recipes'}>Recipes</Link>
          </li>
          <li>
            <Link href={'/about'}>About</Link>
          </li>
          <li>
            <LoginModal />
          </li>
          <li>
            <Link href={'/about'}>About</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
