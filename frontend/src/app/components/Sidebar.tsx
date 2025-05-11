// components/Sidebar.tsx
import { Home, List, BarChart3, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'

const navItems = [
  { label: 'Dashboard', icon: Home, href: '/' },
  { label: 'Transacciones', icon: List, href: '/transactions' },
  { label: 'Reportes', icon: BarChart3, href: '/reports' },
  { label: 'Configuración', icon: Settings, href: '/settings' }
]

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 p-6 flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold mb-8 text-center">Finanzas</div>
        <nav className="space-y-4">
          {navItems.map(({ label, icon: Icon, href }) => (
            <Link href={href} key={label}>
              <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-800 cursor-pointer transition-colors">
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
      <div>
        <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white">
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}