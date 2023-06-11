import Image from 'next/image';
import Link from 'next/link';
import testHeroPic from '../public/clark-douglas-17ZU9BPy_Q4-unsplash.jpg';

export default function Home() {
  return (
    <main className=''>
      <section>
        <div className=' flex flex-col-reverse md:flex'>
          <div className='absolute top-0 mx-12 hidden flex-col justify-center gap-6 md:flex md:w-1/2'>
            <h1 className='max-w-md text-5xl font-bold'>
              Recipes, without all of the clutter.
            </h1>
            <h2 className='max-w-lg'>
              A recipe site without ads, clutter, or useless information. Find
              your next meal with an easy to use platform.
            </h2>
            <Link href={'recipes'}>
              <p className='inline-block rounded-full bg-red-300 px-8 py-2 text-xl font-bold'>
                Recipes
              </p>
            </Link>
          </div>
          <div className='relative top-0 md:w-1/2'>
            <Image
              src={testHeroPic}
              alt='Picture of pasta'
              className='h-2/3 w-full object-cover brightness-[35%]'
            />
            <div className='absolute top-0 mx-12 flex h-full flex-col items-center justify-center gap-6 text-center text-white md:w-1/2 '>
              <h1 className='max-w-md text-3xl font-bold md:text-5xl'>
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
        </div>
      </section>
    </main>
  );
}
