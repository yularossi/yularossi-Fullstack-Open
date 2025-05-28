import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import List from './components/List'
import Notification from './components/notification'
import Footer from './components/Footer'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage, errorMessage, setErrorMessage] = useState(null)

  //estado inicial de la app obtenida del servidor json
  useEffect(() => {
    console.log('effect')
    countriesService.getAll()
        .then(response => {
          console.log('promise fulfilled')
          setCountries(response.data)
        })  
  }, [])
  console.log('render', countries.length, 'countries')

  const addFilter = (event) => {
    event.preventDefault()
    const filterObject = {
      filter : newFilter
    }
  }

  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(newFilter.toLowerCase())
  )

  return (
    <div>
      <h1>Country Finder app</h1>
      <Filter 
        filter={newFilter} 
        setFilter={setNewFilter}
        event={addFilter}
      />
      <List 
        setCountries={setCountries} 
        filteredCountries={filteredCountries}
      />
      <Footer />
    </div>
  )
}

export default App