import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='bg-darker-dark p-4 text-primary-light'>
      <div className='flex flex-col items-center justify-between md:flex-row md:items-start'>
        <Link href={'/'} className='text-3xl text-primary-light'>
          CLEAN<span className='text-lighter-light'>PL8.</span>
        </Link>
        <ul className='flex flex-col gap-12 text-xl md:flex-row'>
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
      <p className='mt-4 text-right text-sm'>
        &copy; {new Date().getFullYear()} Nathan {`Bro's`}
      </p>
    </footer>
  );
};

export default Footer;
