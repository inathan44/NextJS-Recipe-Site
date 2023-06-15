import Link from 'next/link';

export default function LeftArrowIcon() {
  return (
    <Link
      href={'/recipes'}
      className='block rounded-full p-1 transition-all hover:bg-primary-dark'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        className='h-6 w-6 stroke-primary-dark transition-all hover:stroke-primary-light'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
        />
      </svg>
    </Link>
  );
}
