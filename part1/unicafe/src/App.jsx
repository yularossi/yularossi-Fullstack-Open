import { useState } from 'react'

const Button = (props) => {
  console.log(props)
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {
  console.log(props)
  if (props.all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  } return (
      <div>
        <h1>statistics</h1>
        <p>good {props.good}<br/>
          neutral {props.neutral}<br/>
          bad {props.bad}<br/>
          all {props.all}<br/>
          average {props.average}<br/>
          positive {props.positive} %
        </p>
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
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App