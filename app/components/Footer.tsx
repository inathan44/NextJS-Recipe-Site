import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='bg-darker-light p-4 text-darker-dark dark:bg-darker-dark dark:text-primary-light'>
      <div className='flex flex-col-reverse items-center justify-between gap-6 md:flex-row md:items-center md:justify-between'>
        <Link href={'/'} className='text-3xl dark:text-primary-light'>
          CLEAN<span className='dark:text-lighter-light'>PL8.</span>
        </Link>
        <ul className='flex w-full justify-center gap-8 text-center md:w-auto md:flex-row md:gap-12'>
          <li>
            <Link href={'/about'}>About</Link>
          </li>
          <li>
            <Link href={'/admin'}>Admin</Link>
          </li>
          <li>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href={'https://github.com/inathan44/NextJS-Recipe-Site'}
            >
              Github
            </a>
          </li>
          <li>
            <Link href={'/recipes'}>Recipes</Link>
          </li>
        </ul>
      </div>
      <p className='mt-2 text-center text-xs md:mt-6'>
        &copy; {new Date().getFullYear()} Nathan {`Bro's`}
      </p>
    </footer>
  );
};

export default Footer;
