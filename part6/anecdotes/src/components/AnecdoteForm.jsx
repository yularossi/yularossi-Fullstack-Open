import { useState } from 'react'
import { useAnecdoteStore } from '../store'
import { useNotificationStore } from '../notificationStore'

const AnecdoteForm = () => {
  const [input, setInput] = useState('')
  const addAnecdote = useAnecdoteStore(state => state.addAnecdote)
  const setNotification = useNotificationStore(state => state.setNotification)

  const handleCreate = async (e) => {
    e.preventDefault()
    if (input.trim()) {
      const created = await addAnecdote(input)
      if (created) {
        setNotification(`You created '${input}'`, 5000)
      }
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
