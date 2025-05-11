'use client'

import { useState } from 'react'
import TransactionList from '@/components/TransactionList'
import TransactionForm from '@/components/TransactionForm'
import { Plus } from 'lucide-react'

export default function TransactionsPage() {
  const [showForm, setShowForm] = useState(false)

  const modalClass = showForm ? 'opacity-100 scale-100' : 'opacity-0 scale-95'

  return (
    <main className="relative min-h-screen bg-gray-100 p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">Transacciones</h1>
      <TransactionList />

      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-4 shadow-lg"
      >
        <Plus className="w-6 h-6" />
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white p-6 transition-transform duration-300 ease-out scale-95 animate-fade-in rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <TransactionForm />
          </div>
        </div>
      )}
    </main>
  )
}
