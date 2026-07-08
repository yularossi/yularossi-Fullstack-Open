import { useState } from 'react'
import { useAnecdoteStore } from '../store'

const AnecdoteForm = () => {
  const [input, setInput] = useState('')
  const addAnecdote = useAnecdoteStore(state => state.addAnecdote)

  const handleCreate = (e) => {
    e.preventDefault()
    if (input.trim()) {
      addAnecdote(input)
      setInput('')
    }
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
