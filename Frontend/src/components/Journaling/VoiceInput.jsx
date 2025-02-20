"use client"

import { useState, useCallback } from "react"
import { Mic, MicOff } from "lucide-react"

export function VoiceInput({ onTranscript }) {
  const [isRecording, setIsRecording] = useState(false)
  const [recognition, setRecognition] = useState(null)

  const startRecording = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("")

      onTranscript(transcript)
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error)
      setIsRecording(false)
    }

    recognition.start()
    setRecognition(recognition)
    setIsRecording(true)
  }, [onTranscript])

  const stopRecording = useCallback(() => {
    if (recognition) {
      recognition.stop()
      setRecognition(null)
    }
    setIsRecording(false)
  }, [recognition])

  return (
    <button
      onClick={isRecording ? stopRecording : startRecording}
      className={`p-2 rounded-full border ${isRecording ? "bg-red-100 hover:bg-red-200" : "hover:bg-gray-100"}`}
      aria-label={isRecording ? "Stop recording" : "Start recording"}
    >
      {isRecording ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4" />}
    </button>
  )
}

