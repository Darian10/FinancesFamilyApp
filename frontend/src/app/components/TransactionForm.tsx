'use client'

import { useState } from 'react'
import { Transaction } from '../types/Transaction'

const defaultData: Transaction = {
  type: 'expense',
  category: '',
  amount: 0,
  date: new Date().toISOString().substring(0, 10),
  description: '',
}

export default function TransactionForm() {
  const apiUrl = process.env.REACT_APP_API_URL;
  if (!apiUrl) {
    throw new Error("REACT_APP_API_URL is not defined");
  }

  const [formData, setFormData] = useState<Transaction>(defaultData)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: name === 'amount' ? parseFloat(value) : value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const response = await fetch(`${apiUrl}/api/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      alert('Transacción guardada ✅')
      setFormData(defaultData)
    } else {
      alert('Error al guardar ❌')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-6 max-w-md mx-auto bg-gray-900 text-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center">Nueva Transacción</h2>
  
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="income">Ingreso</option>
        <option value="expense">Gasto</option>
      </select>
  
      <input
        type="text"
        name="category"
        placeholder="Categoría"
        value={formData.category}
        onChange={handleChange}
        className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
  
      <input
        type="number"
        name="amount"
        placeholder="Monto"
        value={formData.amount}
        onChange={handleChange}
        className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
  
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
  
      <input
        type="text"
        name="description"
        placeholder="Descripción"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
  
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
      >
        {loading ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  )
  
}
