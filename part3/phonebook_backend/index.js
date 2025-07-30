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

app.use(express.json())
app.use(requestLogger)
// Custom morgan format to log POST request bodies
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))
app.use(express.static('dist'))


//DO NOT SAVE YOUR PASSWORD TO GITHUB
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}
const password = process.argv[2]

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

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  response.json(person)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {
  const date = new Date()
  const info = `<p>Phonebook has info for ${persons.length} people</p>
                <p>${date}</p>`
  response.send(info)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  return Math.floor(Math.random() * 1000000)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
      return response.status(400).json({
        error: 'name or number missing'
      })
    } else if (persons.some(person => person.name === body.name)) {
      return response.status(400).json({
        error: 'this name already exists in the phonebook'
      })
    }

    const person = {
      // Generate a unique ID for the new person
      id: String(generateId()),
      name: body.name,
      number: body.number
    }

    persons = persons.concat(person)
    response.json(person)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
} // Middleware to handle unknown endpoints
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})