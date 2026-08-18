import { useAnecdotes, useVoteAnecdote, useDeleteAnecdote } from '../hooks'
import { useAnecdoteStore } from '../store'

const AnecdoteList = () => {
  const { data: anecdotes = [], isLoading, isError, error } = useAnecdotes()
  const filter = useAnecdoteStore(state => state.filter)
  const voteAnecdoteMutation = useVoteAnecdote()
  const deleteAnecdoteMutation = useDeleteAnecdote()

  if (isError) {
    return (
      <div style={{
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 10,
        color: 'red'
      }}>
        anecdote service not available due to problems in server
      </div>
    )
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

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
            has {anecdote.votes} <button onClick={() => {
              voteAnecdoteMutation.mutate(anecdote)
            }}>vote</button>
            {anecdote.votes === 0 && (
              <button style={{ marginLeft: 8 }} onClick={() => {
                deleteAnecdoteMutation.mutate(anecdote.id)
              }}>delete</button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
