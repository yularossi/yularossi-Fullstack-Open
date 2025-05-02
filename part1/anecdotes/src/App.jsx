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

function getRandomInt(max) {
  console.log(max)
  return Math.floor(Math.random() * max);
} //funcion que devuelve un entero aleatorio entre 0 y max(max = largo del array)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0)) //inicializa un array de ceros con el mismo tamaño que el array de anecdotas
  const copy = [...votes] //copia el array de votos para no modificar el original

  return (
    <div>
      <Header text='Anecdote of the day' />
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <div>
      <Button handleClick = {() => {
        copy[selected] += 1
        setVotes(copy)
        }
      } text = 'vote'/>
      <Button handleClick = {() => {
        setSelected(getRandomInt(anecdotes.length))
        setVotes(copy)
        }
      } text = 'Next anecdote'/>
      <Header text='Anecdote with most votes' />
      <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
      </div>
    </div>
  )
}

export default App