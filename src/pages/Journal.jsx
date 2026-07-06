import Navbar from '../components/Layout/Navbar'
import JournalForm from '../components/Journal/JournalForm'

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <JournalForm />
      </main>
    </div>
  )
}
