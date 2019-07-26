<template>
  <v-container grid-list-md class="mb-4">
    <v-layout align-center justify-center>
      <v-flex xs6 class="form pa-4">
        <v-flex xs12 sm3 md6>
          <v-text-field box label="Drug name" v-model="parameters.drugName" class="mb-2"></v-text-field>
          <v-select
            v-model="parameters.trueRating"
            :items="ratings"
            label="True rating"
            class="mb-2"
          ></v-select>
        </v-flex>
        <v-divider></v-divider>
        <v-textarea
          class="mb-2 mt-2"
          label="Review"
          v-model="parameters.review"
          hint="Write your review here..."
          :rules="[rules.required]"
        ></v-textarea>
        <v-btn color="#82b3c9" dark @click="scoreModels">Evaluate Parameters</v-btn>
        <v-tooltip v-model="showTooltip" top>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon color="grey lighten-1">info</v-icon>
            </v-btn>
          </template>
          <span>
            Drug name and rating are there only to add extra context to the review when looking at the past reviews.
            <br />Only the review text itself is evaluated by the model.
          </span>
        </v-tooltip>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AzureWebModelService from '@/services/AzureWebModelService'
import ReviewService from '@/services/ReviewService'

export default {
  props: ['parameters'],
  data () {
    return {
      ratings: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      showTooltip: false,
      rules: {
        required: value => !!value || 'Required.'
      },
      resultSVM: {
        label: null,
        probability: null
      },
      resultNN: {
        label: null,
        probability: null
      }
    }
  },
  methods: {
    async scoreModels () {
      try {
        // score Neural Network
        this.resultNN = (await AzureWebModelService.scoreModel_NN(
          this.parameters
        )).data

        // score Logistic Regression
        this.resultSVM = (await AzureWebModelService.scoreModel_SVM(
          this.parameters
        )).data

        // save to the database
        this.saveReview()

        this.$emit('dataScored', {
          resultNN: this.resultNN,
          resultSVM: this.resultSVM
        })
      } catch (error) {
        this.$emit('dataScoredError', error.response.data.error)
      }
    },
    async saveReview () {
      try {
        await ReviewService.saveReview({
          parameters: this.parameters,
          resultSVM: this.resultSVM,
          resultNN: this.resultNN
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
  .form {
    box-shadow: 2px 2px 15px -4px rgba(0, 0, 0, 0.83);
  }
</style>
