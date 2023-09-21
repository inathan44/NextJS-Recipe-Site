import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './globals.css';
import { Inter } from 'next/font/google';

export const metadata = {
  title: 'Clean Pl8',
  description: 'Simple, clean recipe app',
};

const inter = Inter({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} dark bg-primary-light transition-colors dark:bg-primary-dark dark:transition-colors`}
      >
        <NavBar />
        <div className='min-h-[calc(100vh_-_204px)] md:min-h-[calc(100vh_-_172px)]'>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
