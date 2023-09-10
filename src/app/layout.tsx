import './globals.css';
import { Providers } from '@/app/providers';
import { Inter } from 'next/font/google'
import { NavigationBar } from '../../_components/navbar/navigation-bar';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='dark'>
      <body className={inter.className}>
        <Providers>
          <NavigationBar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
