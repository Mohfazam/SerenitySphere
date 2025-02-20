import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Bold, Italic, List, Type, Undo, Redo } from "lucide-react"

export function RichTextEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      <div className="bg-gray-800 p-2 border-b border-gray-700 flex flex-wrap gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive("bold") ? "bg-gray-700" : ""}`}
          aria-label="Bold"
        >
          <Bold className="h-4 w-4 text-gray-300" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive("italic") ? "bg-gray-700" : ""}`}
          aria-label="Italic"
        >
          <Italic className="h-4 w-4 text-gray-300" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive("bulletList") ? "bg-gray-700" : ""}`}
          aria-label="Bullet List"
        >
          <List className="h-4 w-4 text-gray-300" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-gray-700 ${editor.isActive("heading", { level: 1 }) ? "bg-gray-700" : ""}`}
          aria-label="Heading 1"
        >
          <Type className="h-4 w-4 text-gray-300" />
        </button>
        <div className="ml-auto flex gap-1">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-2 rounded hover:bg-gray-700 disabled:opacity-50"
            aria-label="Undo"
          >
            <Undo className="h-4 w-4 text-gray-300" />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-2 rounded hover:bg-gray-700 disabled:opacity-50"
            aria-label="Redo"
          >
            <Redo className="h-4 w-4 text-gray-300" />
          </button>
        </div>
      </div>
      <EditorContent editor={editor} className="prose prose-invert max-w-none p-4 bg-gray-900 text-gray-100" />
    </div>
  )
}