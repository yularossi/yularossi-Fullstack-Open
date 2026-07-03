import { useStatsStore } from './store'

const Controls = () => {
  const good = useStatsStore(state => state.addGood)
  const neutral = useStatsStore(state => state.addNeutral)
  const bad = useStatsStore(state => state.addBad)

  return (
    <div>
      <button onClick={good}>Good</button>
      <button onClick={neutral}>Neutral</button>
      <button onClick={bad}>Bad</button>
    </div>
  )
}

export default Controls