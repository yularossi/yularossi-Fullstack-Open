import { useStatsStore } from './store'

const Display = () => {
  const all = useStatsStore(state => state.all)
  const good = useStatsStore(state => state.good)
  const bad = useStatsStore(state => state.bad)
  const neutral = useStatsStore(state => state.neutral)
  const average = useStatsStore(state => state.average)
  const positive = useStatsStore(state => state.positive)

  return (
    <div>
        <h2>Statistics</h2>
        <p>All: {all}</p>
        <p>Good: {good}</p>
        <p>Bad: {bad}</p>
        <p>Neutral: {neutral}</p>
        <p>Average: {Number(average).toFixed(2)}</p>
        <p>Positive: {Number(positive).toFixed(1)} %</p>
    </div>
  )
}

export default Display