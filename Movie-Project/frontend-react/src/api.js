const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api/movies'

export async function fetchMovies() {
  const res = await fetch(`${BASE}`)
  if (!res.ok) throw new Error('Failed to fetch movies')
  return res.json()
}

export async function createMovie(formData) {
  const res = await fetch(`${BASE}/single`, { method: 'POST', body: formData })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function updateMovie(id, formData) {
  const res = await fetch(`${BASE}/${id}`, { method: 'PUT', body: formData })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function deleteMovie(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
