'use client'

import { NextUIProvider } from '@nextui-org/react'
import { UserProvider } from '@auth0/nextjs-auth0/client';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </NextUIProvider>
  )
}
