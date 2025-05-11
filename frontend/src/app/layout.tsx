import Sidebar from '@/components/Sidebar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Finanzas Familiares',
  description: 'App de control de finanzas',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} flex min-h-screen bg-gray-950 text-white`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">{children}</div>
      </body>
    </html>
  )
}