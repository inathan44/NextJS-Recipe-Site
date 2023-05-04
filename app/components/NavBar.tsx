import React from 'react';
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className='mb-2 flex items-center justify-between border-b-2 p-3'>
      <Link href={'/'}>
        <h1 className='text-3xl'>Recipes</h1>
      </Link>
      <div>
        <Link href={'recipes'}>All Recipes</Link>
      </div>
    </nav>
  );
}
