import axios from 'axios'
//import dotenv from 'dotenv'
//dotenv.config()

const baseUrl = 'http://api.weatherapi.com/v1/current.json?key=8f762e3602a54c7cb0c195045250106&q=London&aqi=no'

const apiKey = '8f762e3602a54c7cb0c195045250106'
const getWeather = async (country) => {
  const url = `${baseUrl}&q=${country}`
  const response = await axios.get(url)
  return response.data
}

const weatherService = { getWeather }
export default weatherService