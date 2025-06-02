import Note from './Note'
import Country from './Country'
import weatherService from '../services/weather'

//estructura del componente List de la phonebook
const List = ({ setCountries, filteredCountries }) => {
  if (filteredCountries.length === 0) {
    return <p>No countries found</p>
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    return (
      <Country country={country} />
    )
  } else if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else {
    return (
      <div>
        <h2>Countries</h2>
        <ul>
          {filteredCountries.map(country => 
            <div key={country.cca2} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem"}}> 
              <Note 
              key={country.cca3} 
              country={country} 
              setCountries={setCountries}
            />
            <button onClick={() => setCountries([country])}>
              Show
            </button>
            </div>
          )}
        </ul>
      </div>
    )
  }

}
export default List