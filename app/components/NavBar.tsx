import React from 'react';
import Link from 'next/link';
import MobileNav from './MobileNav';

export default function NavBar() {
  return (
    <header className='sticky top-0 z-10 bg-white'>
      <nav className='flex h-16 items-center justify-between px-6'>
        <Link href={'/'}>
          <h1 className='text-3xl'>
            CLEAN<span className='text-slate-700'>PL8.</span>
          </h1>
        </Link>
        <div>
          <Link
            className='hidden border-darker-dark text-xl font-bold hover:border-b-2 md:block'
            href={'recipes'}
          >
            Recipes
          </Link>
        </div>
        <MobileNav />
      </nav>
    </header>
  );
}
