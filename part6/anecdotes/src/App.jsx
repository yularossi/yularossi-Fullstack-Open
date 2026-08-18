import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationProvider } from './NotificationContext'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <div>
          <Notification />
          <h1>Anecdotes</h1>
          <Filter />
          <AnecdoteForm />
          <AnecdoteList />
        </div>
      </NotificationProvider>
    </QueryClientProvider>
  )
}

export default App
