import { Provider } from 'react-redux'
import store from './store'
import Display from './components/Display'
import Controls from './components/Controls'

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Give Feedback</h1>
        <Controls />
        <Display />
      </div>
    </Provider>
  )
}

export default App

