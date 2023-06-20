import Image from 'next/image';
import Link from 'next/link';
import testHeroPic from '../public/clark-douglas-17ZU9BPy_Q4-unsplash.jpg';

export default function Home() {
  return (
    <main className='dark:bg-primary-dark'>
      <section className='mx-auto max-w-6xl sm:py-4'>
        <div className='hidden sm:flex'>
          <div className='flex w-full flex-col items-center justify-center gap-6 px-4 text-darker-dark dark:text-primary-light'>
            <h1 className='font-bold sm:w-52  sm:text-3xl md:w-80 md:text-5xl lg:w-96 lg:text-6xl'>
              Recipes, without all of the clutter.
            </h1>
            <h2 className='dark:text-darker-light sm:w-52 md:w-80 lg:w-96'>
              A recipe site without ads, clutter, or useless information. Find
              your next meal with an easy to use platform.
            </h2>
            <Link href={'recipes'} className='sm:w-52 md:w-80 lg:w-96'>
              <p className='inline-block rounded-full bg-primary-dark px-8 py-2 text-xl font-bold text-primary-light dark:bg-primary-light dark:text-primary-dark'>
                Recipes
              </p>
            </Link>
          </div>
          <div className='w-full'>
            <div className='rounded-xl px-6 py-2'>
              <Image
                priority
                src={testHeroPic}
                alt='Picture of pasta'
                className='rounded-xl object-cover'
              />
            </div>
          </div>
        </div>

        <div className='relative min-h-[412px] sm:hidden'>
          <Image
            src={testHeroPic}
            alt='Picture of pasta'
            className='h-full max-h-[450px] min-h-[412px] object-cover brightness-[35%]'
          />
          <div className='absolute left-1/2 top-0 flex h-full w-full -translate-x-1/2 flex-col items-center justify-center gap-6 px-8 text-center text-white'>
            <h1 className='w-full max-w-md text-3xl font-bold'>
              Recipes, without all of the clutter.
            </h1>
            <h2 className='max-w-lg'>
              A recipe site without ads, clutter, or useless information. Find
              your next meal with an easy to use platform.
            </h2>
            <Link href={'recipes'}>
              <p className='inline-block rounded-full bg-primary-light px-8 py-2 text-xl font-bold text-primary-dark'>
                Recipes
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
