import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import List from './components/List'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

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
      setFilteredPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const addFilter = (event) => {
    event.preventDefault()
    const filterObject = {
      filter : newFilter
    }

    if (newFilter === '') {
      setFilteredPersons(persons)
    } else {
      setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())))
    }
  }

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
        persons={persons}
        setPersons={setPersons}
        filteredPersons={filteredPersons}
      />
    </div>
  )
}

export default App