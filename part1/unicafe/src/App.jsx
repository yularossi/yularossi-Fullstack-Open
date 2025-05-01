import { useState } from 'react'

const Header = props => <h1>{props.text}</h1>

const Button = (props) => {
  console.log(props)
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticsLine = (props) => {
  console.log(props)
  return (
    <tr>
      <td>{props.text}</td><td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  console.log(props)
  if (props.all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  } return (
      <div>
        <table>
          <tbody>
          <StatisticsLine text='good' value={props.good} />
          <StatisticsLine text='neutral' value={props.neutral} />
          <StatisticsLine text='bad' value={props.bad} />
          <StatisticsLine text='all' value={props.all} />
          <StatisticsLine text='average' value={props.average} />
          <StatisticsLine text='positive' value={props.positive + ' %'} />
          </tbody>
        </table>
      </div>
    )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = (good - bad) / (good + neutral + bad)
  const positive = (good / (good + neutral + bad)) * 100

  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Header text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App