import React from 'react';
import Link from 'next/link';
import MenuIcon from './MenuIcon';

export default function NavBar() {
  return (
    <nav className='flex items-center justify-between p-3'>
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
      <div className='md:hidden'>
        <MenuIcon />
      </div>
    </nav>
  );
}
