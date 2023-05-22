import NavBar from './components/NavBar';
import './globals.css';
import { Inter } from '@next/font/google';

export const metadata = {
  title: 'Zachs recipe app',
  description: 'Generated by create next app',
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
      <body className={`${inter.className}`}>
        <NavBar />
        <div>{children}</div>
      </body>
    </html>
  );
}
