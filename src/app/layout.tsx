import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import Footer from '@/app/components/footer/footer';
import Navbar from '@/app/components/navbar/navbar';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
     title: 'Mathias Foght',
     description:
          'Portfolio of Mathias Foght, a software engineering student at Aarhus University.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
     return (
          <html lang="en">
               <body>
                    <header>
                         <Navbar />
                    </header>
                    <main>
                         {children}
                         <Analytics />
                    </main>
                    <footer>
                         <Footer />
                    </footer>
               </body>
          </html>
     );
}
