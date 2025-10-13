require('dotenv').config() // Load environment variables from .env file
const express = require('express')
const app = express()
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('---')
  next()
}
const morgan = require('morgan')
morgan.token('post', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)
// Custom morgan format to log POST request bodies
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))

const Person = require('./models/person') // Import the Person model

app.get('/', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    }).catch(error => {
        console.error('Error fetching persons:', error)
        response.status(500).send('Internal Server Error')
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    }).catch(error => {
        console.error('Error fetching persons:', error)
        response.status(500).send('Internal Server Error')
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error)) // Pass error to the next middleware for handling
})

app.put('/api/persons/:id', (request, response, next) => {
  const { number } = request.body

  // Only update the number field
  Person.findByIdAndUpdate( request.params.id, { number }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  const date = new Date()
  Person.countDocuments({}).then(count => {
    const info = `<p>Phonebook has info for ${count} people</p>
                  <p>${date}</p>`
    response.send(info)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
     .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error)) // Pass error to the next middleware for handling
})

/*const generateId = () => {
  return Math.floor(Math.random() * 1000000)
}*/

app.post('/api/persons', async (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
      return response.status(400).json({
        error: 'name or number missing'
      })
    }

    //Check for existing name in the database
    const existingPerson = await Person.findOne({ name: body.name })
    if (existingPerson) {
      return response.status(400).json({
        error: 'this name already exists in the phonebook'
      })
    }

    const person = new Person({
      // Generate a unique ID for the new person
      name: body.name,
      number: body.number
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
})

// Middleware to handle unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
} 
app.use(unknownEndpoint)

//Middleware to handle errors
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}
// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT || 3001 // Use PORT from environment variables or default to 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})