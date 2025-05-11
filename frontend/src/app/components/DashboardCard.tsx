// pages/dashboard/page.tsx
'use client'

// components/DashboardCard.tsx
interface DashboardCardProps {
  title: string
  amount: number
  positive?: boolean
  negative?: boolean
}

export default function DashboardCard({ title, amount, positive, negative }: DashboardCardProps) {
  const color = positive ? 'text-green-400' : negative ? 'text-red-400' : 'text-white'

  return (
    <div className="bg-gray-900 rounded-2xl p-4 shadow">
      <h3 className="text-sm text-gray-400 mb-1">{title}</h3>
      <p className={`text-2xl font-bold ${color}`}>{amount.toFixed(2)} €</p>
    </div>
  )
} 

