import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import List from './components/List'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
        .get('http://localhost:3001/persons')
        .then(response => {
          console.log('promise fulfilled')
          setPersons(response.data)
        })  
  }, [])
  console.log('render', persons.length, 'persons')
  
  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name : newName,
      number : newNumber
    }

    if (newName === '' || newNumber === '') {
      alert('Please fill in both name and number')
    } else if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else if (persons.some(person => person.number === newNumber)) {
      alert(`Number ${newNumber} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const addFilter = (event) => {
    event.preventDefault()
    const filterObject = {
      filter : newFilter
    }
  }
  
  const filteredPersons = (persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        submitEvent={addFilter}
        filter={newFilter}
        setFilter={setNewFilter}
      />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <List
        setPersons={setPersons}
        filteredPersons={filteredPersons}
      />
    </div>
  )
}

export default App