import { create } from 'zustand'

const API_URL = 'http://localhost:3001/anecdotes'

export const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',

  initAnecdotes: async () => {
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      set({ anecdotes: data })
    } catch (error) {
      console.error('Failed to fetch anecdotes', error)
    }
  },

  addVote: async (id) => {
    const anecdote = get().anecdotes.find(a => String(a.id) === String(id))
    if (!anecdote) return
    const newVotes = Number(anecdote.votes || 0) + 1
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ votes: newVotes })
      })
      if (!res.ok) {
        console.error('Server returned', res.status, res.statusText)
        // Try to re-sync anecdotes from server
        await get().initAnecdotes()
        return null
      }
      const data = await res.json()
      set(state => ({ anecdotes: state.anecdotes.map(a => String(a.id) === String(id) ? data : a) }))
      return data
    } catch (error) {
      console.error('Failed to update vote', error)
      await get().initAnecdotes()
    }
  },

  addAnecdote: async (text) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, votes: 0 })
      })
      const data = await res.json()
      set(state => ({ anecdotes: [...state.anecdotes, data] }))
      return data
    } catch (error) {
      console.error('Failed to create anecdote', error)
    }
  },

  deleteAnecdote: async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      set(state => ({ anecdotes: state.anecdotes.filter(a => String(a.id) !== String(id)) }))
    } catch (error) {
      console.error('Failed to delete anecdote', error)
    }
  },

  setFilter: (filter) => set({ filter }),
}))
