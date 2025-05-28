import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import List from './components/List'
import Notification from './components/notification'
import Footer from './components/Footer'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage, errorMessage, setErrorMessage] = useState(null)

  //estado inicial de la app obtenida del servidor json
  useEffect(() => {
    console.log('effect')
    personService.getAll()
        .then(response => {
          console.log('promise fulfilled')
          setPersons(response.data)
        })  
  }, [])
  console.log('render', persons.length, 'persons')
  
  //funcion completa para agregar una persona
  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name : newName,
      number : newNumber
    }

    if (newName === '' || newNumber === '') {
      setErrorMessage('Name and number must be filled out')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    } else if (persons.some(person => person.name === newName) & persons.some(person => person.number != newNumber)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        personService.update(persons.find(person => person.name === newName).id, nameObject)
        .then(response => {
          console.log(response.data)
          setPersons(persons.map(person => person.name !== newName ? person : response.data))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Number updated for ${newName}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 4000)
        })
        .catch(error => {
          setErrorMessage(`Error updating ${newName}'s number`)
          setTimeout(() => {
            setErrorMessage(null) 
          }, 4000)
        })
      }
    } else if (persons.some(person => person.number === newNumber)) {
      setErrorMessage(`Number ${newNumber} is already in use`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    } else {
      // Add the new person to the server
      personService.create(nameObject)
      .then(response => {
        console.log(response.data)
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(`${newName} has been added to phonebook`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 4000)
      })
      .catch(error => {
        setErrorMessage(`Error adding ${newName}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
      })
    }
  }

  //funcion para eliminar a una persona
  const deleteNumber = (id) => {
    if (window.confirm(`Delete this person?`)) {
      personService.deletePerson(id)
        .then(() => {
          console.log(`Deleted person with id ${id}`)
          setPersons(persons.filter(person => person.id !== id))
          setNotificationMessage('Person deleted successfully')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 4000)
        })
        .catch(error => {
          console.error(`Error deleting person with id ${id}:`, error)
          setErrorMessage('Error deleting person')
          setTimeout(() => {
            setErrorMessage(null)
          }, 4000)
        })
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
      <Notification message={notificationMessage} errorMessage={errorMessage} />
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
        deleteNumber={deleteNumber}
      />
      <Footer />
    </div>
  )
}

export default App