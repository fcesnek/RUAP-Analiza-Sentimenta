<template>
  <v-toolbar class="mb-4" color="#b3e5fc">
    <v-toolbar-title>DRUG REVIEW SENTIMENT ANALYSIS</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat to="/">
        EVALUATE
      </v-btn>
      <v-btn flat to="/history">
        PAST REVIEWS
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
        flat
        href="https://www.kaggle.com/jessicali9530/kuc-hackathon-winter-2018"
        target="_blank"
      >
        <v-icon class="mr-2">description</v-icon>DATASET
      </v-btn>
      <v-btn flat href="https://github.com/fcesnek/RUAP-Analiza-Sentimenta" target="_blank">
        <v-icon class="mr-2">code</v-icon>CODE
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
