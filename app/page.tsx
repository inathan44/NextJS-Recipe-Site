import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className=''>
      <h1>Homepage</h1>
      <Link href='/recipes'>Link to the recipes page</Link>
    </main>
  );
}
