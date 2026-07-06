import { Smile, Frown, Angry, AlertTriangle, Sparkles, ThumbsDown } from 'lucide-react'
import { EMOTIONS } from '../../lib/emotions'

const iconMap = {
  Smile,
  Frown,
  Angry,
  AlertTriangle,
  Sparkles,
  ThumbsDown,
}

export default function EmotionSelector({ selectedEmotions, onEmotionToggle }) {
  return (
    <div className="flex justify-center gap-2 sm:gap-4">
      {EMOTIONS.map((emotion) => {
        const Icon = iconMap[emotion.icon]
        const isSelected = selectedEmotions.includes(emotion.id)

        return (
          <button
            key={emotion.id}
            onClick={() => onEmotionToggle(emotion.id)}
            className="flex flex-col items-center gap-1"
            title={emotion.nameId}
          >
            <div 
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                isSelected
                  ? 'scale-110 shadow-lg ring-2 ring-[#6B8E6B] ring-offset-2'
                  : 'hover:scale-105 bg-white border border-[#E8E6E1]'
              }`}
              style={{
                backgroundColor: isSelected ? emotion.color : undefined,
              }}
            >
              <Icon 
                size={18} 
                className="sm:!text-[22px]"
                style={{ 
                  color: isSelected ? '#3D3D3D' : '#6B6B6B',
                  transition: 'color 0.2s'
                }} 
              />
            </div>
            <span className={`text-[10px] sm:text-xs font-medium ${
              isSelected ? 'text-[#3D3D3D]' : 'text-[#6B6B6B]'
            }`}>
              {emotion.nameId}
            </span>
          </button>
        )
      })}
    </div>
  )
}
