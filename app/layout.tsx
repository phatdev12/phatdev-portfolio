declare global {
  interface Window { 
    system: {
      generate_random_string(length: number): Promise<string>;
      jsonRequest(host: string, endpoint: string, ssl: boolean): Promise<any>;
      textRequest(host: string, endpoint: string, ssl: boolean): Promise<any>;
    };
    targetElement: Array<string>;
    owner: string;
    repo: string;
    api: {
      github: string;
    };
  }
}

/**
 * ---------------------------------------------
 */
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Client from '@phatdev/client/Client';

const font = Inter({ subsets: ['latin'] });

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
      <body className={font.className}>
        <div className='cursor'></div>
        <div className='follow'></div>
        <Client>
          {children}
        </Client>
      </body>
    </html>
  )
}
