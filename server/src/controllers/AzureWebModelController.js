const axios = require('axios')

const svmUrl = "https://ussouthcentral.services.azureml.net/workspaces/f59c87eea7034e368a7afe08275a3c4e/services/aa1520ee210d46ef8af4ecb1833ab4a8/execute?api-version=2.0&details=true"
const neuralNetUrl = "https://ussouthcentral.services.azureml.net/workspaces/f59c87eea7034e368a7afe08275a3c4e/services/bebf8a3fa56447928bae444c03801b19/execute?api-version=2.0&details=true"

const svmApiKey = "KUWnWe2U3+QJYNQqs9d777F15fLjKBFYjjROV/wMCXOjcA0bQjLDAK72IX4TjPsHIeJC3X3Axc13YVAywFv/ug=="
const neuralNetApiKey = "W4WPdky8AGqNionL3mjfuNW1RHxafZEP4g5bCnpbDmMhpHynLEcRf1Teiy2C8GqZRfp2MBhU2wW7HhOBa8u5PA=="

const configSVM = {
  headers: {'Authorization': "Bearer " + svmApiKey}
}

const configNN = {
  headers: {'Authorization': "Bearer " + neuralNetApiKey}
}
module.exports = {
  async scoreSVM (req, res) {
    try {
      let reqData = {
        Inputs: {
          input1: {
            ColumnNames: [
              "text"
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
        svmUrl,
        reqData,
        configSVM
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
  },
  async scoreNeuralNetwork (req, res) {
    try {
      let reqData = {
        Inputs: {
          input1: {
            ColumnNames: [
              "text"
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
