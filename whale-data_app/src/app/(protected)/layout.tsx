import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import { AuthGuard } from '../components/AuthGuard'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Whale Data - Dashboard',
  description: 'Track whale movements and get real-time alerts',
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  )
} 