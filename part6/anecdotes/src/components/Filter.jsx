import { useAnecdoteStore } from '../store'

const Filter = () => {
  const filter = useAnecdoteStore(state => state.filter)
  const setFilter = useAnecdoteStore(state => state.setFilter)

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} value={filter} />
    </div>
  )
}

export default Filter
