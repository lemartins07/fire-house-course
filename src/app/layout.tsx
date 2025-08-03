import type { Metadata } from 'next'

import './globals.css'
import Link from 'next/link'
import { AuthProvider } from '@/context/auth'
import { AuthButtons } from '@/components/ui/auth-buttons'
import { Poppins } from 'next/font/google'
import { HomeIcon } from 'lucide-react'
import { Toaster } from '@/components/ui/sonner'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'FIRE HOMES',
  description: 'Find your dream home with Fire Homes',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${poppins.className} antialiased`}>
          <nav className="relative z-10 flex h-24 items-center justify-between bg-sky-950 p-5 text-white">
            <Link
              href="/"
              className="flex items-center gap-2 text-3xl uppercase tracking-widest"
            >
              <HomeIcon />
              <span>Fire Homes</span>
            </Link>

            <ul className="flex items-center gap-6">
              <li>
                <Link
                  href="/property-search"
                  className="uppercase tracking-widest hover:underline"
                >
                  Property search
                </Link>
              </li>
              <AuthButtons />
            </ul>
          </nav>
          {children}
          <Toaster richColors closeButton />
        </body>
      </AuthProvider>
    </html>
  )
}
