<template>
  <v-app>
    <nav-bar/>
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

    <v-alert :value="!!this.error" type="error" transition="scale-transition">
      <div v-html="error" />
    </v-alert>

    <v-alert :value="!!this.resultNN.label" v-if="resultNN.label == 'positive'" type="success">
      Model: Neural Network
      <br />
      Scored value is {{resultNN.label}}
      <br />
      Probability: {{resultNN.probability}}
    </v-alert>

    <v-alert :value="!!this.resultNN.label" v-if="resultNN.label == 'negative'" type="error">
      Model: Neural Network
      <br />
      Scored value is {{resultNN.label}}
      <br />
      Probability: {{resultNN.probability}}
    </v-alert>

    <v-alert :value="!!this.resultLR.label" v-if="resultLR.label == 'positive'" type="success">
      Model: Logistic Regression
      <br />
      Scored value is {{resultLR.label}}
      <br />
      Probability: {{resultLR.probability}}
    </v-alert>
    <v-alert :value="!!this.resultLR.label" v-if="resultLR.label == 'negative'" type="error">
      Model: Logistic Regression
      <br />
      Scored value is {{resultLR.label}}
      <br />
      Probability: {{resultLR.probability}}
    </v-alert>

    <v-divider></v-divider>
    <h1 class="ml-5 mt-4">Past reviews:</h1>

    <v-container fluid grid-list-md>
      <v-flex xs12 sm3 md4>
        <v-text-field
          class="ml-3 mb-2"
          append-icon="search"
          label="Search by drug name"
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
      </v-flex>
      <v-data-iterator
        v-if="!!reviews"
        :items="reviews"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
        content-tag="v-layout"
        :search="search"
        :custom-filter="customFilter"
        row
        wrap
      >
        <template v-slot:item="props">
          <v-flex xs12 sm6 md4 lg3>
            <v-card class="ma-3">
              <v-card-title>
                <p class="drug-info">Drug name:&emsp;</p>
                <h2>{{ props.item.drugName }}</h2>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-title>
                <p class="drug-info">Rating:&emsp;</p>
                <h2>{{ props.item.trueRating }}</h2>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-title>
                <p>{{ props.item.text }}</p>
              </v-card-title>
              <v-divider></v-divider>
              <v-list>
                <div
                  v-bind:class="{ 'positive': props.item.modelScore.neuralNetwork === 'positive',
                                    'negative': props.item.modelScore.neuralNetwork === 'negative'}"
                  class="ma-2"
                >
                  <v-list-tile>
                    <v-list-tile-content class="align-center">
                      <h4>Neural Network</h4>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile class="border">
                    <v-list-tile-content>Score</v-list-tile-content>
                    <v-list-tile-content
                      class="align-end mr-3"
                    >{{ props.item.modelScore.neuralNetwork }}</v-list-tile-content>
                    <v-icon v-if="props.item.modelScore.neuralNetwork === 'positive'">check_circle</v-icon>
                    <v-icon v-if="props.item.modelScore.neuralNetwork === 'negative'">warning</v-icon>
                  </v-list-tile>
                  <v-list-tile class="border">
                    <v-list-tile-content>Probability</v-list-tile-content>
                    <v-list-tile-content
                      class="align-end"
                    >{{ props.item.modelProbability.neuralNetwork.toFixed(4) }}</v-list-tile-content>
                  </v-list-tile>
                </div>
                <v-divider></v-divider>
                <div
                  v-bind:class="{'positive': props.item.modelScore.logisticRegression === 'positive',
                                    'negative': props.item.modelScore.logisticRegression === 'negative'}"
                  class="ma-2"
                >
                  <v-list-tile>
                    <v-list-tile-content class="align-center">
                      <h4>Logistic Regression</h4>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile class="border">
                    <v-list-tile-content>Score</v-list-tile-content>
                    <v-list-tile-content
                      class="align-end mr-3"
                    >{{ props.item.modelScore.logisticRegression }}</v-list-tile-content>
                    <v-icon
                      v-if="props.item.modelScore.logisticRegression === 'positive'"
                    >check_circle</v-icon>
                    <v-icon v-if="props.item.modelScore.logisticRegression === 'negative'">warning</v-icon>
                  </v-list-tile>
                  <v-list-tile class="border">
                    <v-list-tile-content>Probability</v-list-tile-content>
                    <v-list-tile-content
                      class="align-end"
                    >{{ props.item.modelProbability.logisticRegression.toFixed(4) }}</v-list-tile-content>
                  </v-list-tile>
                </div>
              </v-list>
            </v-card>
          </v-flex>
        </template>
      </v-data-iterator>
    </v-container>
  </v-app>
</template>

<script>
import AzureWebModelService from '@/services/AzureWebModelService'
import ReviewService from '@/services/ReviewService'
import NavBar from './components/NavBar'
export default {
  components: {
    NavBar
  },
  data () {
    return {
      parameters: {
        drugName: '',
        trueRating: null,
        review: ''
      },
      error: null,
      resultLR: {
        label: null,
        probability: null
      },
      resultNN: {
        label: null,
        probability: null
      },
      rules: {
        required: value => !!value || 'Required.'
      },
      rowsPerPageItems: [8, 16, 32],
      pagination: {
        rowsPerPage: 8
      },
      reviews: null,
      showTooltip: false,
      ratings: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      search: ''
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
        this.resultLR = (await AzureWebModelService.scoreModel_LR(
          this.parameters
        )).data

        // save to the database
        this.saveReview()
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async saveReview () {
      try {
        await ReviewService.saveReview({
          parameters: this.parameters,
          resultLR: this.resultLR,
          resultNN: this.resultNN
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    customFilter (items, search, filter) {
      search = search.toString().toLowerCase()
      return items.filter(row => filter(row['drugName'], search))
    }
  },
  async mounted () {
    this.reviews = (await ReviewService.getReviews()).data
  }
}
</script>

<style scoped>
  .border {
    border-top: 1px solid black;
  }
  .form {
    box-shadow: 2px 2px 15px -4px rgba(0, 0, 0, 0.83);
  }
  .drug-info {
    display: block;
    font-size: 1.3em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  .positive {
    background-color: #c8e6c9;
    border-radius: 20%;
  }

  .negative {
    background-color: #ffcdd2;
    border-radius: 20%;
  }
</style>
