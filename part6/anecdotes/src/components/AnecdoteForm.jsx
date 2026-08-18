import { useState } from 'react'
import { useCreateAnecdote } from '../hooks'
import { useNotification } from '../NotificationContext'

const AnecdoteForm = () => {
  const [input, setInput] = useState('')
  const createMutation = useCreateAnecdote()
  const { setNotification } = useNotification()

  const handleCreate = (e) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (trimmed.length < 5) {
      setNotification('Anecdote must be at least 5 characters long', 5000)
      return
    }
    createMutation.mutate(trimmed)
    setInput('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a new anecdote"
        />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
