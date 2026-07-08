import { useAnecdoteStore } from '../store'

const AnecdoteList = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes)
  const addVote = useAnecdoteStore(state => state.addVote)

  // Sort anecdotes by votes in descending order without mutating the original
  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)

  return (
    <div>
      {sortedAnecdotes.map(anecdote => (
        <div key={anecdote.id} style={{ marginBottom: '1rem', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}>
          <div>{anecdote.text}</div>
          <div>has {anecdote.votes} <button onClick={() => addVote(anecdote.id)}>vote</button></div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
