"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Save, BookOpen, Trash, Share, X } from "lucide-react"
import { Button } from "../ui/button.jsx";
import { RichTextEditor } from "./RichTextEditor.jsx"
import { VoiceInput } from "./VoiceInput.jsx"
import { MoodSelector } from "./MoodSelector.jsx"
import { useToast } from "../ui/use-toast.jsx";

const AUTOSAVE_DELAY = 3000 // 3 seconds

export function Journaling() {
  const [entry, setEntry] = useState("")
  const [entries, setEntries] = useState([])
  const [selectedMood, setSelectedMood] = useState("Neutral")
  const [searchQuery, setSearchQuery] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [previewEntry, setPreviewEntry] = useState(null)
  const { toast, showToast } = useToast()

  // Force dark mode on mount
  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

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
        showToast("Draft saved automatically", { duration: 2000 })
      }
    }, AUTOSAVE_DELAY)

    return () => clearTimeout(timeoutId)
  }, [entry, selectedMood, showToast])

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

      showToast("Journal entry saved successfully")
    }
  }

  const handleVoiceInput = (transcript) => {
    setEntry((prev) => prev + " " + transcript)
  }

  const shareEntry = (entryId) => {
    const updatedEntries = entries.map((entry) => (entry.id === entryId ? { ...entry, shared: !entry.shared } : entry))
    setEntries(updatedEntries)
    localStorage.setItem("journal-entries", JSON.stringify(updatedEntries))

    showToast("Sharing status updated")
  }

  const deleteEntry = (entryId) => {
    const updatedEntries = entries.filter((entry) => entry.id !== entryId)
    setEntries(updatedEntries)
    localStorage.setItem("journal-entries", JSON.stringify(updatedEntries))

    showToast("Entry deleted successfully", { variant: "destructive" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Journaling</h2>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <VoiceInput onTranscript={handleVoiceInput} />
          <span className="text-sm text-gray-400">Click the microphone to start voice input</span>
        </div>

        <RichTextEditor content={entry} onChange={setEntry} />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">How are you feeling?</label>
        <MoodSelector selected={selectedMood} onSelect={setSelectedMood} />
      </div>

      <div className="flex gap-2">
        <Button onClick={saveEntry} className="flex items-center gap-2">
          <Save className="h-4 w-4" /> Save Entry
        </Button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Recent Entries</h3>
        <div className="space-y-2">
          {entries.slice(-3).map((entry) => (
            <div key={entry.id} className="p-4 bg-gray-800 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">{new Date(entry.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => shareEntry(entry.id)}
                    className={entry.shared ? "text-blue-500" : "text-gray-400"}
                  >
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteEntry(entry.id)} className="text-gray-400">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div
                className="prose prose-invert max-w-none text-sm"
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
              className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Entry Preview</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)} className="text-gray-400">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="prose prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: previewEntry.content }} />
                <div className="mt-4 text-sm text-gray-400">
                  <p>Mood: {previewEntry.mood}</p>
                  <p>Created: {new Date(previewEntry.createdAt).toLocaleString()}</p>
                  <p>Last modified: {new Date(previewEntry.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}