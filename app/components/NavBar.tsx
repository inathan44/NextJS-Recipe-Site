import React from 'react';
import Link from 'next/link';
import MobileNav from './MobileNav';

import DarkToggle from './DarkToggle';
import LoginLogoutButton from './LoginLogoutButton';
import AccountLink from './AccountLink';

export default function NavBar() {
  return (
    <header className='sticky top-0 z-10 '>
      <nav className='flex h-16 items-center justify-between bg-primary-light px-6 transition-colors dark:bg-primary-dark dark:transition-colors'>
        <Link href={'/'}>
          <h1 className='text-3xl dark:text-primary-light'>
            CLEAN
            <span className='text-slate-700 dark:text-lighter-light'>PL8.</span>
          </h1>
        </Link>

        {/* Desktop Links */}
        <div className='hidden items-center gap-8 md:flex'>
          <DarkToggle />
          <Link
            className='text-lg font-semibold dark:text-primary-light'
            href={'/recipes'}
          >
            Recipes
          </Link>
          <AccountLink />
          <LoginLogoutButton />
        </div>

        {/* Mobile Links */}
        <div className='flex items-center gap-4 md:hidden'>
          <DarkToggle />
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
