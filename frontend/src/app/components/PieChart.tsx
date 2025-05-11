'use client'

import { PieChart as RePieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { Transaction } from '@/types/Transaction'

const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444']

interface Props {
  data: Transaction[]
}

export default function PieChart({ data }: Props) {
  // Agrupar gastos por categoría
  const grouped = data.reduce<Record<string, number>>((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount
    return acc
  }, {})

  const chartData = Object.entries(grouped).map(([name, value]) => ({ name, value }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RePieChart>
        <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
          {chartData.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </RePieChart>
    </ResponsiveContainer>
  )
}