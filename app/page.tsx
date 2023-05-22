import Image from 'next/image';
import Link from 'next/link';
import testHeroPic from '../public/clark-douglas-17ZU9BPy_Q4-unsplash.jpg';

export default function Home() {
  return (
    <main className=''>
      <section>
        <div className='flex'>
          <div className='mx-12 flex w-1/2 flex-col justify-center gap-6'>
            <h1 className='max-w-md text-5xl font-bold'>
              Omg Zach{`'`}s favorite recipes of all time!
            </h1>
            <h2 className='max-w-lg'>
              Find recipes that are spicy, easy, tasty, or all three! With
              recipes sorted by category, it will be so easy to find the next
              meal for dinner time.
            </h2>
            <Link href={'recipes'}>
              <p className='inline-block rounded-full bg-red-300 px-8 py-2 text-xl font-bold'>
                Recipes
              </p>
            </Link>
          </div>
          <div className='w-1/2'>
            <Image
              src={testHeroPic}
              alt='Picture of pasta'
              className='w-full'
            />
          </div>
        </div>
      </section>
      <h1>Homepage</h1>
      <Link href='/recipes'>Link to the recipes page</Link>
    </main>
  );
}
