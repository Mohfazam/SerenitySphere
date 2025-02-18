"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"

const AIAssistantTab = ({ moodEntries, darkMode }) => {
  const [userInput, setUserInput] = useState("")
  const [conversation, setConversation] = useState([])

  const simulateAIResponse = (input) => {
    const responses = [
      "Based on your mood patterns, try incorporating more outdoor activities into your routine.",
      "Your sleep seems to have a strong correlation with your mood. Consider establishing a consistent sleep schedule.",
      "Great job on maintaining regular exercise! It appears to have a positive impact on your overall well-being.",
      "Your water intake has been consistent. Keep it up, as it contributes to better mood and energy levels.",
      "I notice you often feel energetic after socializing. Consider planning more social activities to boost your mood.",
      "Your gratitude practice is admirable. Focusing on positive aspects can significantly improve your mental state.",
      "Have you considered trying meditation? It could help manage stress levels, especially on days you feel angry or sad.",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!userInput.trim()) return

    const newUserMessage = { type: "user", content: userInput }
    const newAIMessage = { type: "ai", content: simulateAIResponse(userInput) }

    setConversation([...conversation, newUserMessage, newAIMessage])
    setUserInput("")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">AI Assistant</h2>
        <div className="mb-4 h-96 overflow-y-auto bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          {conversation.map((message, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${
                message.type === "user" ? "bg-blue-100 dark:bg-blue-900 ml-auto" : "bg-gray-200 dark:bg-gray-600"
              } max-w-3/4`}
            >
              <p
                className={`text-sm ${message.type === "user" ? "text-blue-800 dark:text-blue-200" : "text-gray-800 dark:text-gray-200"}`}
              >
                {message.content}
              </p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask the AI assistant..."
            className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition-colors duration-200"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </motion.div>
  )
}

export default AIAssistantTab

