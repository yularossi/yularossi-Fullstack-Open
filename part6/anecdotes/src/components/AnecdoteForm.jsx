import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../actions/notificationActions'

const AnecdoteForm = () => {
  const [input, setInput] = useState('')
  const dispatch = useDispatch()

  const handleCreate = (e) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (trimmed.length < 5) {
      dispatch(showNotification('Anecdote must be at least 5 characters long', 5000))
      return
    }
    dispatch(addAnecdote(trimmed))
    dispatch(showNotification(`You created '${trimmed}'`, 5000))
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

