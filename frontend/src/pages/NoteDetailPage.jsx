import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { ArrowLeftIcon, LoaderCircleIcon, Trash2Icon } from "lucide-react"
import { Link } from "react-router"

import api from "../lib/axios"
import toast from "react-hot-toast"

const NoteDetailPage = () => {
  const [note, setNote] = useState(null)
  const [isloading, setIsLoading] = useState(true)
  const [saving, setIsSaving] = useState(false)

  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data);
        setIsLoading(true)
      } catch (error) {
        console.log("Error in Fetching Note : ", error)
        toast.error("Failed to fetch Note")
      } finally {
        setIsLoading(false)
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`)

      toast.success("Note deleted Successfully!")
      navigate("/")

    } catch (error) {
      console.error("Error deleting the notes: ", error);
      toast.error("Failed to delete note")
    }
  }
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("All fields are required")
      return;
    }

    setIsSaving(true);

    try {
      await api.put(`/notes/${id}`, note)
      toast.success("Note updated Successfully!")
      navigate("/");
    } catch (error) {
      console.error("Error Updating the notes: ", error);
      toast.error("Failed to Update note")
    } finally {
      setIsSaving(false)
    }
  }

  if (isloading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderCircleIcon className="animate-spin size-10" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="w-5 h-5" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-200">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write Your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-secondary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage