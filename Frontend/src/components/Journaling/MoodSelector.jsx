import { Smile, Meh, Frown, Heart, Coffee, Cloud, CloudLightning, Sun } from "lucide-react"

const moods = [
  { label: "Happy", icon: <Smile className="h-4 w-4" />, color: "text-green-500" },
  { label: "Loved", icon: <Heart className="h-4 w-4" />, color: "text-pink-500" },
  { label: "Neutral", icon: <Meh className="h-4 w-4" />, color: "text-yellow-500" },
  { label: "Tired", icon: <Coffee className="h-4 w-4" />, color: "text-orange-500" },
  { label: "Calm", icon: <Cloud className="h-4 w-4" />, color: "text-blue-500" },
  { label: "Anxious", icon: <CloudLightning className="h-4 w-4" />, color: "text-purple-500" },
  { label: "Energetic", icon: <Sun className="h-4 w-4" />, color: "text-yellow-500" },
  { label: "Sad", icon: <Frown className="h-4 w-4" />, color: "text-red-500" },
]

export function MoodSelector({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {moods.map((mood) => (
        <button
          key={mood.label}
          onClick={() => onSelect(mood.label)}
          className={`px-3 py-2 rounded-md flex items-center gap-2 hover:bg-gray-700
            ${selected === mood.label ? "bg-gray-700 ring-2 ring-offset-2 ring-gray-500" : "bg-gray-800"}`}
        >
          <span className={mood.color}>{mood.icon}</span>
          <span className="text-sm text-gray-300">{mood.label}</span>
        </button>
      ))}
    </div>
  )
}