import { Provider } from 'react-redux'
import store from './reduxStore'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Notification />
        <h1>Anecdotes</h1>
        <Filter />
        <AnecdoteForm />
        <AnecdoteList />
      </div>
    </Provider>
  )
}

export default App

