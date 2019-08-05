<template>
  <v-container fluid grid-list-md class="zoom">
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
            <card-review-data :item="props.item" />
            <v-divider></v-divider>
            <v-list>
              <card-model-data
                :itemScore="props.item.modelScore.neuralNetwork"
                :itemProbability="props.item.modelProbability.neuralNetwork"
                modelName="Neural Network"
              />
              <v-divider></v-divider>
              <card-model-data
                :itemScore="props.item.modelScore.SVM"
                :itemProbability="props.item.modelProbability.SVM"
                modelName="Support Vector Machine"
              />
            </v-list>
          </v-card>
        </v-flex>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import CardModelData from '@/components/CardModelData'
import CardReviewData from '@/components/CardReviewData'
import ReviewService from '@/services/ReviewService'

export default {
  components: {
    CardModelData,
    CardReviewData
  },
  data () {
    return {
      rowsPerPageItems: [8, 16, 32],
      pagination: {
        rowsPerPage: 8
      },
      reviews: null,
      search: ''
    }
  },
  methods: {
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

.zoom {
  zoom: 0.8;
}
</style>
