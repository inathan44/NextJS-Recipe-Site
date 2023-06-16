import React from 'react';
import Link from 'next/link';
import MobileNav from './MobileNav';
import SignOutButton from './SignOutButton';

export default function NavBar() {
  return (
    <header className='sticky top-0 z-10 '>
      <nav className='flex h-16 items-center justify-between bg-primary-light px-6 dark:bg-primary-dark'>
        <Link href={'/'}>
          <h1 className='text-3xl dark:text-primary-light'>
            CLEAN
            <span className='text-slate-700 dark:text-lighter-light'>PL8.</span>
          </h1>
        </Link>
        <div className='flex gap-8'>
          <Link
            className='hidden border-darker-dark text-xl font-bold hover:border-b-2 dark:text-primary-light md:block'
            href={'recipes'}
          >
            Recipes
          </Link>
          <SignOutButton />
        </div>
        <MobileNav />
      </nav>
    </header>
  );
}
