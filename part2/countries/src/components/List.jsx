import Note from './Note'
import weatherService from '../services/weather'

//estructura del componente List de la phonebook
const List = ({ setCountries, filteredCountries }) => {
  if (filteredCountries.length === 0) {
    return <p>No countries found</p>
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    // Fetch weather data for the country
    weatherService.getWeather(country.name.common)
      .then(weather => {
        console.log('Weather data:', weather)
      })
      .catch(error => {
        console.error('Error fetching weather data:', error)
      })
    return (
      <div>
        <h1 className='countryName'>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <p>Area: {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map(language => 
            <li key={language}>{language}</li>
          )}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />
        <h2>Weather in {country.capital}</h2>
        <div id="weather">
          <p>Temperature: {weatherService.getWeather(country).current.temp_c} °C</p>
          
        </div>
      </div>
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