const axios = require('axios')

const logisticRegUrl = "https://ussouthcentral.services.azureml.net/workspaces/f59c87eea7034e368a7afe08275a3c4e/services/242b27d1666343c9bff25c9ec569b0d4/execute?api-version=2.0&details=true"
const neuralNetUrl = "https://ussouthcentral.services.azureml.net/workspaces/f59c87eea7034e368a7afe08275a3c4e/services/b7b816b435144ac4bbba838a68ad03c3/execute?api-version=2.0&details=true"

const logisticRegApiKey = "J4/C/iCv0yVReYq2yQ26qwYy8pXFDr8wsWHMAQD976m6rFJyrEGb8K0Nb/Y5RP3HnwtHTPq3Vz7LS9XZyWEG1Q=="
const neuralNetApiKey = "ptenULvkfl9gVhqbfDG/mQLne8TJU+ln1R4Cp8zCQhls7Ks54Cn4BgwrlNdBo4XM/JevHbWy0GiDuJPOlIw2gw=="

const configLR = {
  headers: {'Authorization': "Bearer " + logisticRegApiKey}
}

const configNN = {
  headers: {'Authorization': "Bearer " + neuralNetApiKey}
}
module.exports = {
  async scoreLogisticRegression (req, res) {
    try {
      let reqData = {
        Inputs: {
          input1: {
            ColumnNames: [
              "review"
            ],
            Values: [
              [
                req.body.review
              ]
            ]
          }
        },
        GlobalParameters: {}
      }
      let azureResponse = await axios.post(
        logisticRegUrl,
        reqData,
        configLR
      )
      
      let response = {
        label: azureResponse.data.Results.output1.value.Values[0][0],
        probability: azureResponse.data.Results.output1.value.Values[0][1]
      }

      res.send(response)
    } catch (err) {
      res.status(500).send({
        error: `Error while sending data from Azure API.`
      })
    }
  },
  async scoreNeuralNetwork (req, res) {
    try {
      let reqData = {
        Inputs: {
          input1: {
            ColumnNames: [
              "review"
            ],
            Values: [
              [
                req.body.review
              ]
            ]
          }
        },
        GlobalParameters: {}
      }
      let azureResponse = await axios.post(
        neuralNetUrl,
        reqData,
        configNN
      )
      
      let response = {
        label: azureResponse.data.Results.output1.value.Values[0][0],
        probability: azureResponse.data.Results.output1.value.Values[0][1]
      }

      res.send(response)
    } catch (err) {
      res.status(500).send({
        error: `Error while fetching data from Azure API.`
      })
    }
  }
}
