import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='bg-darker-dark p-4 text-primary-light'>
      <div className='flex flex-col-reverse items-center justify-between gap-6 md:flex-row md:items-start'>
        <Link href={'/'} className='text-3xl text-primary-light'>
          CLEAN<span className='text-lighter-light'>PL8.</span>
        </Link>
        <ul className='flex w-full justify-between text-center md:flex-row md:gap-12'>
          <li>
            <Link href={'/about'}>About</Link>
          </li>
          <li>
            <Link href={'/admin'}>Admin</Link>
          </li>
          <li>
            <Link href={'/updatelater'}>Github</Link>
          </li>
          <li>
            <Link href={'/recipes'}>Recipes</Link>
          </li>
        </ul>
      </div>
      <p className='mt-2 text-center text-sm md:text-right'>
        &copy; {new Date().getFullYear()} Nathan {`Bro's`}
      </p>
    </footer>
  );
};

export default Footer;
