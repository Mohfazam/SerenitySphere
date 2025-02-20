"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Save, BookOpen, Trash, Share, X } from "lucide-react"
import { RichTextEditor } from "./RichTextEditor"
import { VoiceInput } from "./VoiceInput"
import { MoodSelector } from "./MoodSelector"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const AUTOSAVE_DELAY = 3000 // 3 seconds

export function Journaling() {
  const [entry, setEntry] = useState("")
  const [entries, setEntries] = useState([])
  const [selectedMood, setSelectedMood] = useState("Neutral")
  const [showPreview, setShowPreview] = useState(false)
  const [previewEntry, setPreviewEntry] = useState(null)

  // Load entries from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem("journal-entries")
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries))
    }
  }, [])

  // Auto-save current entry
  useEffect(() => {
    const draftKey = "journal-draft"
    const timeoutId = setTimeout(() => {
      if (entry) {
        localStorage.setItem(
          draftKey,
          JSON.stringify({
            content: entry,
            mood: selectedMood,
            updatedAt: new Date().toISOString(),
          }),
        )
        toast.info("Draft saved automatically", {
          autoClose: 2000,
          position: "bottom-right",
        })
      }
    }, AUTOSAVE_DELAY)

    return () => clearTimeout(timeoutId)
  }, [entry, selectedMood])

  const saveEntry = () => {
    if (entry.trim()) {
      const newEntry = {
        id: crypto.randomUUID(),
        content: entry,
        mood: selectedMood,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        shared: false,
      }

      const updatedEntries = [...entries, newEntry]
      setEntries(updatedEntries)
      localStorage.setItem("journal-entries", JSON.stringify(updatedEntries))

      setEntry("")
      setSelectedMood("Neutral")
      localStorage.removeItem("journal-draft")

      toast.success("Journal entry saved successfully", {
        position: "bottom-right",
      })
    }
  }

  const handleVoiceInput = (transcript) => {
    setEntry((prev) => prev + " " + transcript)
  }

  const shareEntry = (entryId) => {
    const updatedEntries = entries.map((entry) => (entry.id === entryId ? { ...entry, shared: !entry.shared } : entry))
    setEntries(updatedEntries)
    localStorage.setItem("journal-entries", JSON.stringify(updatedEntries))

    toast.info("Sharing status updated", {
      position: "bottom-right",
    })
  }

  const deleteEntry = (entryId) => {
    const updatedEntries = entries.filter((entry) => entry.id !== entryId)
    setEntries(updatedEntries)
    localStorage.setItem("journal-entries", JSON.stringify(updatedEntries))

    toast.error("Entry deleted", {
      position: "bottom-right",
    })
  }

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Journaling</h2>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <VoiceInput onTranscript={handleVoiceInput} />
          <span className="text-sm text-gray-500">Click the microphone to start voice input</span>
        </div>

        <RichTextEditor content={entry} onChange={setEntry} />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">How are you feeling?</label>
        <MoodSelector selected={selectedMood} onSelect={setSelectedMood} />
      </div>

      <div className="flex gap-2">
        <button
          onClick={saveEntry}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
            transition-colors duration-200 flex items-center gap-2"
        >
          <Save className="h-4 w-4" /> Save Entry
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Entries</h3>
        <div className="space-y-2">
          {entries.slice(-3).map((entry) => (
            <div key={entry.id} className="p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-sm text-gray-500">{new Date(entry.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => shareEntry(entry.id)}
                    className={`p-2 rounded hover:bg-gray-100 ${entry.shared ? "text-blue-500" : ""}`}
                  >
                    <Share className="h-4 w-4" />
                  </button>
                  <button onClick={() => deleteEntry(entry.id)} className="p-2 rounded hover:bg-gray-100">
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div
                className="prose max-w-none text-sm"
                dangerouslySetInnerHTML={{ __html: entry.content.slice(0, 200) + "..." }}
              />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showPreview && previewEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Entry Preview</h3>
                <button onClick={() => setShowPreview(false)} className="p-2 rounded hover:bg-gray-100">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: previewEntry.content }} />
                <div className="mt-4 text-sm text-gray-500">
                  <p>Mood: {previewEntry.mood}</p>
                  <p>Created: {new Date(previewEntry.createdAt).toLocaleString()}</p>
                  <p>Last modified: {new Date(previewEntry.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer />
    </div>
  )
}

