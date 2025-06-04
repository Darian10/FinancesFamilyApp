'use client'

import { useEffect, useState } from 'react'
import { Transaction } from '../types/Transaction'

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [toDate, setToDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTransactions = async () => {
    setLoading(true);
    const params = new URLSearchParams({
      from: fromDate.toISOString(),
      to: toDate.toISOString(),
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    if (searchTerm.trim() !== "") {
      params.append("search", searchTerm);
    }

    try {
      const res = await fetch(`http://localhost:3000/api/transactions?${params}`);
      const data = await res.json();
      setTransactions(data.items);
      setTotalPages(data.totalPages);
    } catch (err) {
      alert('Error al cargar las transacciones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page]);

  const handleBuscar = () => {
    setPage(1);
    fetchTransactions();
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-gray-900 text-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Transacciones</h2>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-600"
        />
        <input
          type="date"
          value={fromDate.toISOString().split('T')[0]}
          onChange={(e) => setFromDate(new Date(e.target.value))}
          className="p-2 rounded bg-gray-800 border border-gray-600"
        />
        <input
          type="date"
          value={toDate.toISOString().split('T')[0]}
          onChange={(e) => setToDate(new Date(e.target.value))}
          className="p-2 rounded bg-gray-800 border border-gray-600"
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={handleBuscar}
        >
          Buscar
        </button>
      </div>

      {/* Tabla */}
      {loading ? (
        <p className="text-center text-gray-400">Cargando...</p>
      ) : transactions.length === 0 ? (
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

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded bg-gray-700 disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="px-2 py-1">Página {page} de {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded bg-gray-700 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
