'use client'

import { useEffect, useState } from 'react'
import { Transaction } from '../types/Transaction'

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/api/transactions')
      .then(res => res.json())
      .then(data => {
        setTransactions(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        alert('Error al cargar las transacciones')
      })
  }, [])

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-gray-900 text-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Transacciones</h2>
  
      {loading ? (
        <p className="text-center text-gray-400">Cargando...</p>
      ) : transactions.length === 0 ? (
        <p className="text-center text-gray-400">No hay transacciones registradas.</p>
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
              {transactions.map(tx => (
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
