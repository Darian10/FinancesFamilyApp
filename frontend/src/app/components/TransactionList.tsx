'use client'

import { useEffect, useState } from 'react'
import { Transaction } from '../types/Transaction'

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filtered, setFiltered] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/api/transactions')
      .then(res => res.json())
      .then(data => {
        setTransactions(data)
        setFiltered(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        alert('Error al cargar las transacciones')
      })
  }, [])

  useEffect(() => {
    const filtered = transactions.filter(tx => {
      const txDate = new Date(tx.date)
      const matchMonth = month ? txDate.getMonth() + 1 === parseInt(month) : true
      const matchYear = year ? txDate.getFullYear() === parseInt(year) : true
      const matchType = type ? tx.type === type : true
      return matchMonth && matchYear && matchType
    })
    setFiltered(filtered)
  }, [month, year, type, transactions])

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-gray-900 text-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Transacciones</h2>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <select value={month} onChange={(e) => setMonth(e.target.value)} className="p-2 rounded bg-gray-800 border border-gray-600">
          <option value="">Mes</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>

        <select value={year} onChange={(e) => setYear(e.target.value)} className="p-2 rounded bg-gray-800 border border-gray-600">
          <option value="">Año</option>
          {[2023, 2024, 2025].map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <select value={type} onChange={(e) => setType(e.target.value)} className="p-2 rounded bg-gray-800 border border-gray-600">
          <option value="">Todos</option>
          <option value="income">Ingreso</option>
          <option value="expense">Gasto</option>
        </select>
      </div>

      {/* Tabla */}
      {loading ? (
        <p className="text-center text-gray-400">Cargando...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-400">No hay transacciones encontradas.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-700">
            <thead>
              <tr className="bg-gray-800 text-gray-300">
                <th className="p-3 border border-gray-700">Fecha</th>
                <th className="p-3 border border-gray-700">Tipo</th>
                <th className="p-3 border border-gray-700">Categoría</th>
                <th className="p-3 border border-gray-700">Monto</th>
                <th className="p-3 border border-gray-700">Descripción</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(tx => (
                <tr key={tx.id} className="hover:bg-gray-800 transition-colors">
                  <td className="p-2 border border-gray-700">{tx.date.split('T')[0]}</td>
                  <td className="p-2 border border-gray-700 capitalize">{tx.type}</td>
                  <td className="p-2 border border-gray-700">{tx.category}</td>
                  <td className={`p-2 border border-gray-700 ${tx.type === 'expense' ? 'text-red-400' : 'text-green-400'}`}>
                    {tx.amount.toFixed(2)} €
                  </td>
                  <td className="p-2 border border-gray-700">{tx.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
