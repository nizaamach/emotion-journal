import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { FileText, Trash2, Edit2, Download } from 'lucide-react'
import { getEmotionById } from '../../lib/emotions'

export default function JournalList({ journals, onDelete, onEdit, onExport }) {
  if (!journals || journals.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="mx-auto text-slate-300 mb-4" size={48} />
        <h3 className="text-lg font-medium text-slate-600">Belum ada journal</h3>
        <p className="text-slate-500 mt-1">Mulai menulis journal pertama Anda</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {journals.map((journal) => (
        <div
          key={journal.id}
          className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-sm text-slate-500">
                {format(new Date(journal.entry_date), 'EEEE, d MMMM yyyy', { locale: id })}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {format(new Date(journal.created_at), 'HH:mm')}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onExport(journal)}
                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                title="Export PDF"
              >
                <Download size={18} />
              </button>
              <button
                onClick={() => onEdit(journal)}
                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                title="Edit"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => onDelete(journal.id)}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* Emotions */}
          <div className="flex flex-wrap gap-2 mb-3">
            {journal.emotions.map((emotionId) => {
              const emotion = getEmotionById(emotionId)
              if (!emotion) return null
              return (
                <span
                  key={emotionId}
                  className="px-3 py-1 rounded-full text-sm font-medium text-slate-800"
                  style={{ backgroundColor: emotion.color }}
                >
                  {emotion.name} ({emotion.nameId})
                </span>
              )
            })}
          </div>

          {/* Content preview */}
          <p className="text-slate-600 leading-relaxed">
            {journal.content.length > 200
              ? `${journal.content.substring(0, 200)}...`
              : journal.content}
          </p>
        </div>
      ))}
    </div>
  )
}
