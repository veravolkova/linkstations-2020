const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

const Station = require('./models/station')
const Device = require('./models/device')

const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
const url = process.env.MONGODB_URI

//console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.get('/api/stations', (request, response) => {
  Station.find({}).then(stations => {
    response.json(stations.map(station => station.toJSON()))
  })
})

app.get('/api/devices', (request, response) => {
  Device.find({}).then(devices => {
    response.json(devices.map(device => device.toJSON()))
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
//console.error(error.message)
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})