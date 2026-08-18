import { useSelector } from 'react-redux'

const Display = () => {
  const good = useSelector(state => state.good)
  const ok = useSelector(state => state.ok)
  const bad = useSelector(state => state.bad)

  return (
    <div>
      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>ok {ok}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default Display

