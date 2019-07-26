const {Review} = require('../models/Review')

module.exports = {
  async saveReview(req, res) {
    try {
      let review = new Review({
        drugName: req.body.parameters.drugName ? req.body.parameters.drugName : 'Unknown',
        text: req.body.parameters.review,
        trueRating: req.body.parameters.trueRating ? req.body.parameters.trueRating : 'Unknown',
        modelScore: {
          SVM: req.body.resultSVM.label,
          neuralNetwork: req.body.resultNN.label
        },
        modelProbability: {
          SVM: req.body.resultSVM.probability,
          neuralNetwork: req.body.resultNN.probability
        }
      })
      // eslint-disable-next-line no-unused-vars
      review.save(function (error, review) {
        if (error) {
          res.status(400).send({
            error: 'Could not save the review to the database'
          })
        } else {
          res.send(review)
        }
      })
    } catch (error) {
      res.status(400).send({
        error: 'Could not save the review to the database'
      })
    }
  },
  async getReviews(req, res) {
    try {
      let reviews = null

      reviews = await Review.find()
      res.send(reviews)
    } catch (error) {
      res.status(400).send({
        error: 'Could not fetch the reviews'
      })
    }
  }
}