<template>
  <v-app>
    <v-toolbar dense color="blue accent-3" dark>
      <v-toolbar-title class="white--text">AZURE ML MODEL FOR DRUG SENTIMENT ANALYSIS</v-toolbar-title>
    </v-toolbar>
    <v-container grid-list-md text-xs-center>
      <v-layout>
        <v-flex>
          <v-textarea label="Review" v-model="parameters.review" hint="Write your review here..."></v-textarea>
        </v-flex>
      </v-layout>
      <v-btn class="blue darken-1" dark @click="scoreModels">Evaluate Parameters</v-btn>

      <v-alert :value="!!this.error" type="error" transition="scale-transition">
        <div v-html="error"/>
      </v-alert>

      <v-alert
        :value="!!this.resultNN.label"
        v-if="resultNN.label == 'positive'"
        type="success"
      >Model: Neural Network <br> Scored value is {{resultNN.label}} <br> Probability: {{resultNN.probability}}</v-alert>
      <v-alert
        :value="!!this.resultNN.label"
        v-if="resultNN.label == 'negative'"
        type="error"
      >Model: Neural Network <br> Scored value is {{resultNN.label}} <br> Probability: {{resultNN.probability}}</v-alert>

      <v-alert
        :value="!!this.resultLR.label"
        v-if="resultLR.label == 'positive'"
        type="success"
      >Model: Linear Regression <br> Scored value is {{resultLR.label}} <br> Probability: {{resultLR.probability}}</v-alert>
      <v-alert
        :value="!!this.resultLR.label"
        v-if="resultLR.label == 'negative'"
        type="error"
      >Model: Linear Regression <br> Scored value is {{resultLR.label}} <br> Probability: {{resultLR.probability}}</v-alert>

    </v-container>
  </v-app>
</template>

<script>
import AzureWebModelService from "@/services/AzureWebModelService";

export default {
  data() {
    return {
      parameters: {
        review: ""
      },
      error: null,
      resultLR: {
        label: null,
        probability: null
      },
      resultNN: {
        label: null,
        probability: null
      }
    };
  },
  methods: {
    async scoreModels() {
      try {
        // score Neural Network
        this.resultNN = (await AzureWebModelService.scoreModel_NN(
          this.parameters
        )).data;

        // score Linear Regression
        this.resultLR = (await AzureWebModelService.scoreModel_LR(
          this.parameters
        )).data;
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  }
};
</script>

<style scoped>
</style>
