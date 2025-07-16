import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './components/Providers'
import { Navbar } from './components/Navbar'
import { Sidebar } from './components/Sidebar'
import { AuthGuard } from './components/AuthGuard'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Whale Data - Social Trading DeFi Platform',
  description: 'Follow whale traders and get real-time notifications on their activities',
  keywords: 'defi, social trading, whale tracking, blockchain, ethereum, polygon, bsc',
  authors: [{ name: 'Whale Data Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Whale Data - Social Trading DeFi Platform',
    description: 'Follow whale traders and get real-time notifications on their activities',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Whale Data - Social Trading DeFi Platform',
    description: 'Follow whale traders and get real-time notifications on their activities',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
