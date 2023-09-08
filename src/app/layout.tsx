import './globals.css';
import { Inter } from 'next/font/google';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { NavBar } from '../../_components/navbar/nav-bar';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <NavBar />
          {children}
        </body>
      </UserProvider>
    </html>
  )
}
