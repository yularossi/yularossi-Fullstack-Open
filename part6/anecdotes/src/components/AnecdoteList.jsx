import { useAnecdoteStore } from '../store'
import { useNotificationStore } from '../notificationStore'

const AnecdoteList = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes)
  const filter = useAnecdoteStore(state => state.filter)
  const addVote = useAnecdoteStore(state => state.addVote)
  const deleteAnecdote = useAnecdoteStore(state => state.deleteAnecdote)
  const setNotification = useNotificationStore(state => state.setNotification)

  // Sort anecdotes by votes in descending order without mutating the original
  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)

  // Filter anecdotes based on filter text
  const filteredAnecdotes = sortedAnecdotes.filter(anecdote =>
    anecdote.text.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      {filteredAnecdotes.map(anecdote => (
        <div key={anecdote.id} style={{ marginBottom: '1rem', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}>
          <div>{anecdote.text}</div>
          <div>
            has {anecdote.votes} <button onClick={async () => {
              await addVote(anecdote.id)
              setNotification(`You voted '${anecdote.text}'`, 5000)
            }}>vote</button>
            {anecdote.votes === 0 && (
              <button style={{ marginLeft: 8 }} onClick={async () => {
                await deleteAnecdote(anecdote.id)
                setNotification(`Deleted anecdote '${anecdote.text}'`, 5000)
              }}>delete</button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
