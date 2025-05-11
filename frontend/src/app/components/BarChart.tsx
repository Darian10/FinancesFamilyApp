'use client'

import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Transaction } from '@/types/Transaction'

interface Props {
  data: Transaction[]
}

export default function BarChart({ data }: Props) {
  // Agrupar por mes
  const grouped = data.reduce<Record<string, { ingresos: number; gastos: number }>>((acc, tx) => {
    const date = new Date(tx.date)
    const label = `${date.getFullYear()}-${date.getMonth() + 1}`

    if (!acc[label]) acc[label] = { ingresos: 0, gastos: 0 }

    if (tx.type === 'income') acc[label].ingresos += tx.amount
    else acc[label].gastos += tx.amount

    return acc
  }, {})

  const chartData = Object.entries(grouped).map(([name, values]) => ({
    name,
    ...values,
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReBarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="name" stroke="#ccc" />
        <YAxis stroke="#ccc" />
        <Tooltip />
        <Bar dataKey="ingresos" fill="#10b981" />
        <Bar dataKey="gastos" fill="#ef4444" />
      </ReBarChart>
    </ResponsiveContainer>
  )
}
