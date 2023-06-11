'use client';

import MenuIcon from './MenuIcon';
import { useState } from 'react';
import Link from 'next/link';

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
        className={`fixed left-0 top-0 z-50 mt-16 h-screen w-full  md:hidden ${
          showDropdown ? 'bg-black/50' : 'invisible'
        }`}
      >
        <ul
          className={`flex items-center justify-center gap-12 overflow-hidden bg-primary-light font-semibold transition-all ${
            showDropdown ? 'h-16' : 'h-0'
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
        </ul>
      </nav>
    </>
  );
}
