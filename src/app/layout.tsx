import type { Metadata } from 'next'

import './globals.css'
import Link from 'next/link'
import { AuthProvider } from '@/context/auth'
import { AuthButtons } from '@/components/ui/auth-buttons'
import { Poppins } from 'next/font/google'
import { HomeIcon } from 'lucide-react'

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
          <nav className="bg-sky-950 text-white p-5 h-24 flex items-center justify-between z-10 relative">
            <Link
              href="/"
              className="text-3xl tracking-widest flex gap-2 items-center uppercase"
            >
              <HomeIcon />
              <span>Fire Homes</span>
            </Link>

            <ul className="flex gap-6 items-center">
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
        </body>
      </AuthProvider>
    </html>
  )
}
