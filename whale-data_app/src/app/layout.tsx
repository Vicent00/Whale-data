import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './components/Providers'


const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Whale Data - Social Trading DeFi Platform',
  description: 'Follow whale traders and get real-time notifications on their activities',
  keywords: 'defi, social trading, whale tracking, blockchain, ethereum, polygon, bsc',
  authors: [{ name: 'Whale Data Team' }],
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
