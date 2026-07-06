import Navbar from '../components/Layout/Navbar'
import JournalForm from '../components/Journal/JournalForm'

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-[#3D3D3D]">New Entry</h1>
          <p className="text-sm text-[#6B6B6B]">
            {new Date().toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <JournalForm />
      </main>
    </div>
  )
}
