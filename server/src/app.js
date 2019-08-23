const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const AzureWebModelController = require('./controllers/AzureWebModelController')
const ReviewController = require('./controllers/ReviewController')
const config = require('./config/config')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.post('/scoreNN', AzureWebModelController.scoreNeuralNetwork)
app.post('/scoreSVM', AzureWebModelController.scoreSVM)
app.post('/saveReview', ReviewController.saveReview)
app.get('/getReviews', ReviewController.getReviews)

mongoose.connect('mongodb://localhost:27017/ruap', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err))

let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(config.port)
console.log(`Server started on port ${config.port}`)
