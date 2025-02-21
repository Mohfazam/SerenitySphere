import { Smile, Meh, Frown, Heart, Coffee, Cloud, CloudLightning, Sun } from "lucide-react"

const moods = [
  { label: "Happy", icon: <Smile className="h-4 w-4" />, color: "text-green-400" },
  { label: "Loved", icon: <Heart className="h-4 w-4" />, color: "text-pink-400" },
  { label: "Neutral", icon: <Meh className="h-4 w-4" />, color: "text-yellow-400" },
  { label: "Tired", icon: <Coffee className="h-4 w-4" />, color: "text-orange-400" },
  { label: "Calm", icon: <Cloud className="h-4 w-4" />, color: "text-blue-400" },
  { label: "Anxious", icon: <CloudLightning className="h-4 w-4" />, color: "text-purple-400" },
  { label: "Energetic", icon: <Sun className="h-4 w-4" />, color: "text-yellow-400" },
  { label: "Sad", icon: <Frown className="h-4 w-4" />, color: "text-red-400" },
]

export function MoodSelector({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {moods.map((mood) => (
        <button
          key={mood.label}
          onClick={() => onSelect(mood.label)}
          className={`px-3 py-2 rounded-md flex items-center gap-2 text-gray-300
            hover:bg-gray-700 border border-gray-700
            ${selected === mood.label ? "bg-gray-700 ring-2 ring-offset-2 ring-gray-600" : ""}`}
        >
          <span className={mood.color}>{mood.icon}</span>
          <span className="text-sm">{mood.label}</span>
        </button>
      ))}
    </div>
  )
}

