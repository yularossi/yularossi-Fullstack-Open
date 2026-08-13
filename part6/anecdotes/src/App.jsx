import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import { useAnecdoteStore } from './store'

const App = () => {
  const initAnecdotes = useAnecdoteStore(state => state.initAnecdotes)

  useEffect(() => {
    initAnecdotes()
  }, [initAnecdotes])
  return (
    <div>
      <Notification />
      <h1>Anecdotes</h1>
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App
