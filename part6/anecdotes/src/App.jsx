import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'

const App = () => {
  return (
    <div>
      <h1>Anecdotes</h1>
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App
