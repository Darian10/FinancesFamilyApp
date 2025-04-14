import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-6 space-y-6">
      <TransactionForm />
      <TransactionList />
    </main>
  )
}
