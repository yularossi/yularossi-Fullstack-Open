import { useState, useEffect } from 'react'
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
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  //estado inicial de la app obtenida del servidor json
  useEffect(() => {
    console.log('effect')
    personService.getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
      .catch(error => {
        console.error('Error fetching persons:', error)
        setErrorMessage('Could not fetch persons from server')
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
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
      return
    }

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (existingPerson.number !== newNumber) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
          personService.update(existingPerson.id, nameObject)
            .then(response => {
              console.log(response.data)
              setPersons(persons.map(person => person.id !== existingPerson.id ? person : response.data))
              setNewName('')
              setNewNumber('')
              setNotificationMessage(`Number updated for ${newName}`)
              setTimeout(() => {
                setNotificationMessage(null)
              }, 4000)
            })
            .catch(error => {
              const message = error.response?.data?.error || error.message || `Error updating ${newName}'s number`
              setErrorMessage(message)
              setTimeout(() => {
                setErrorMessage(null)
              }, 4000)
            })
        }
      } else {
        setErrorMessage(`${newName} is already in the phonebook with that number`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
      }
      return
    }

    if (persons.some(person => person.number === newNumber)) {
      setErrorMessage(`Number ${newNumber} is already in use`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
      return
    }

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
        const message = error.response?.data?.error || error.message || 'Error adding person'
        setErrorMessage(message)
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
      })
  }

  //funcion para eliminar a una persona
  const deleteNumber = (_id) => {
    if (window.confirm(`Delete this person?`)) {
      personService.deletePerson(_id)
        .then(() => {
          console.log(`Deleted person with id ${_id}`)
          setPersons(persons.filter(person => person.id !== _id))
          setNotificationMessage('Person deleted successfully')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 4000)
        })
        .catch(error => {
          console.error(`Error deleting person with id ${_id}:`, error)
          const message = error.response?.data?.error || 'Error deleting person'
          setErrorMessage(message)
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