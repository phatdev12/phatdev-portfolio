declare global {
  interface Window { 
    system: {
      generate_random_string(length: number): string;
      jsonRequest(host: string, endpoint: string, ssl: boolean): Promise<any>;
      textRequest(host: string, endpoint: string, ssl: boolean): Promise<any>;
    } 
  }
}

/**
 * ---------------------------------------------
 */
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Client from '@phatdev/Client';

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
  return (
    <html lang="en">
      <body className={inter.className}>
        <Client>
          {children}
        </Client>
      </body>
    </html>
  )
}
