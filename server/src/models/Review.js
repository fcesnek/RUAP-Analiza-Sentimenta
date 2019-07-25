const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    drugName: {
        type: String
    },
    trueRating: {
        type: String
    },
    text: {
        type: String
    },
    modelScore: {
        neuralNetwork: {
            type: String
        },
        logisticRegression: {
            type: String
        }
    },
    modelProbability: {
        neuralNetwork: {
            type: Number
        },
        logisticRegression: {
            type: Number
        }
    }
})

const Review = mongoose.model('Review', reviewSchema)
module.exports.Review = Review
