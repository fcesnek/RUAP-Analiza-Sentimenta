const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const AzureWebModelService = require('./controllers/AzureWebModelController')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.post('/scoreNN', AzureWebModelService.scoreNeuralNetwork)
app.post('/scoreLR', AzureWebModelService.scoreLinearRegression)

app.listen(8888)
console.log(`Server started on port ${8888}`)
