import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotification } from './NotificationContext'

const API_URL = 'http://localhost:3001/anecdotes'

// Fetch all anecdotes
export const useAnecdotes = () => {
  return useQuery({
    queryKey: ['anecdotes'],
    queryFn: async () => {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error('Failed to fetch anecdotes')
      return res.json()
    },
  })
}

// Create a new anecdote
export const useCreateAnecdote = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()

  return useMutation({
    mutationFn: async (text) => {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, votes: 0 })
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to create anecdote')
      }
      return res.json()
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      setNotification(`You created '${data.text}'`, 5000)
    },
    onError: (error) => {
      setNotification(`Error: ${error.message}`, 5000)
    }
  })
}

// Vote for an anecdote
export const useVoteAnecdote = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()

  return useMutation({
    mutationFn: async (anecdote) => {
      const updated = { ...anecdote, votes: anecdote.votes + 1 }
      const res = await fetch(`${API_URL}/${anecdote.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ votes: updated.votes })
      })
      if (!res.ok) throw new Error('Failed to update vote')
      return res.json()
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      setNotification(`You voted '${data.text}'`, 5000)
    },
    onError: () => {
      setNotification('Error voting for anecdote', 5000)
    }
  })
}

// Delete an anecdote
export const useDeleteAnecdote = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()

  return useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete anecdote')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      setNotification('Anecdote deleted', 5000)
    },
    onError: () => {
      setNotification('Error deleting anecdote', 5000)
    }
  })
}

