import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const Country = ({ country }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        if (country && country.capital) {
            weatherService.getWeather(country.capital)
                .then(data => setWeather(data.current))
                .catch(error => setWeather(null))
        }
    }, [country])

    if (!country) {
        return <p>No country data available</p>
    }

    return (
        <div>
            <h1 className='countryName'>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <p>Area: {country.area} km²</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map((language, index) => 
                    <li key={index}>{language}</li>
                )}
            </ul>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />
            <h2>Weather in {country.capital}</h2>
            {weather ? (
                <div>
                    <p>Temperature: {weather.temp_c} °C</p>
                    <img src={weather.condition.icon} alt={weather.condition.text} />
                    <p>Condition: {weather.condition.text}</p>
                    <p>Wind: {weather.wind_kph} kph</p>
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    )
}

export default Country