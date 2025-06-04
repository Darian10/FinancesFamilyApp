'use client'
import { Transaction } from "./types/Transaction"
import DashboardCard from "@/components/DashboardCard"
import PieChart from "@/components/PieChart"
import BarChart from "@/components/BarChart"
import { useEffect, useState } from "react"
export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/api/Transactions/all')
      .then(res => res.json())
      .then(data => setTransactions(data))
  }, [])

  const ingresos = transactions.filter(t => t.type === 'income')
  const gastos = transactions.filter(t => t.type === 'expense')

  const totalIngresos = ingresos.reduce((sum, t) => sum + t.amount, 0)
  const totalGastos = gastos.reduce((sum, t) => sum + t.amount, 0)
  const balance = totalIngresos - totalGastos

  return (
    <main className="flex-1 p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard title="Balance" amount={balance} positive={balance >= 0} negative={balance < 0} />
        <DashboardCard title="Ingresos" amount={totalIngresos} />
        <DashboardCard title="Gastos" amount={totalGastos} negative />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 p-4 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Gastos por Categoría</h2>
          <PieChart data={gastos} />
        </div>
        <div className="bg-gray-900 p-4 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Balance mensual</h2>
          <BarChart data={transactions} />
        </div>
      </div>
    </main>
  )
}