import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { useStyle } from '@phatdev/hooks/useStyle';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'phatdev',
  description: 'nothing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //const cssObject = useStyle('root');

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
