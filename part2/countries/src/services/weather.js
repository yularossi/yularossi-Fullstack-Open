import axios from 'axios'

// const apiKey = '8f762e3602a54c7cb0c195045250106'
const getWeather = (country) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY
// const baseUrl = 'http://api.weatherapi.com/v1/current.json?key=8f762e3602a54c7cb0c195045250106&q=London&aqi=no'
const baseUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${country}&aqi=no`
  // const url = `${baseUrl}&q=${country}`
  const response = axios.get(baseUrl).then(res => res.data).catch(error => {
    console.error('Error fetching weather data:', error)
      })
      console.log('Weather data:', response)
  return response
}   

const weatherService = {getWeather}
export default weatherService