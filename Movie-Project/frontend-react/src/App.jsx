import React, { useEffect, useState } from 'react'
import { fetchMovies, createMovie, updateMovie, deleteMovie } from './api'

export default function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', releaseDate: '' })
  const [file, setFile] = useState(null)
  const [editingId, setEditingId] = useState(null)

  useEffect(() => { load() }, [])
  async function load() {
    setLoading(true)
    try {
      const data = await fetchMovies()
      setMovies(data)
    } catch (e) {
      alert(e.message)
    } finally { setLoading(false) }
  }

  async function onCreate(e) {
    e.preventDefault()
    if (!form.title) return alert('Title required')
    const fd = new FormData()
    fd.append('title', form.title)
    fd.append('description', form.description)
    fd.append('releaseDate', form.releaseDate)
    if (file) fd.append('poster', file)
    try {
      const created = await createMovie(fd)
      setMovies(prev => [created, ...prev])
      setForm({ title: '', description: '', releaseDate: '' })
      setFile(null)
    } catch (e) {
      alert(e.message)
    }
  }

  async function onStartEdit(m) {
    setEditingId(m._id)
    setForm({ title: m.title || '', description: m.description || '', releaseDate: m.releaseDate ? new Date(m.releaseDate).toISOString().split('T')[0] : '' })
  }

  async function onUpdate(e) {
    e.preventDefault()
    if (!editingId) return
    const fd = new FormData()
    if (form.title) fd.append('title', form.title)
    fd.append('description', form.description)
    fd.append('releaseDate', form.releaseDate)
    if (file) fd.append('poster', file)
    try {
      const updated = await updateMovie(editingId, fd)
      setMovies(prev => prev.map(p => p._id === updated._id ? updated : p))
      setEditingId(null)
      setForm({ title: '', description: '', releaseDate: '' })
      setFile(null)
    } catch (e) {
      alert(e.message)
    }
  }

  async function onDelete(id) {
    if (!confirm('Delete movie?')) return
    try {
      await deleteMovie(id)
      setMovies(prev => prev.filter(p => p._id !== id))
    } catch (e) { alert(e.message) }
  }

  return (
    <div className="app">
      <h1>Movie Manager</h1>
      <form onSubmit={editingId ? onUpdate : onCreate} className="form">
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
        <input placeholder="Release Date" type="date" value={form.releaseDate} onChange={e=>setForm({...form,releaseDate:e.target.value})} />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} />
        <button type="submit">{editingId ? 'Update' : 'Create'}</button>
        {editingId && <button type="button" onClick={()=>{setEditingId(null); setForm({title:'',description:'',releaseDate:''}); setFile(null)}}>Cancel</button>}
      </form>

      <hr />

      {loading ? <div>Loading...</div> : (
        <div className="grid">
          {movies.map(m => (
            <div className="card" key={m._id}>
              {m.posterUrl ? <img src={m.posterUrl} alt={m.title} /> : <div className="noimg">No poster</div>}
              <h3>{m.title}</h3>
              <div>{m.releaseDate ? new Date(m.releaseDate).toLocaleDateString() : ''}</div>
              <p>{m.description}</p>
              <div className="actions">
                <button onClick={()=>onStartEdit(m)}>Edit</button>
                <button onClick={()=>onDelete(m._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
