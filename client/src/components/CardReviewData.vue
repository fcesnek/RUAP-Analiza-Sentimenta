<template>
  <v-flex>
    <v-card-title>
      <p class="drug-info">Drug name:&emsp;</p>
      <h2>{{ item.drugName }}</h2>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-title>
      <p class="drug-info">Rating:&emsp;</p>
      <h2>{{ item.trueRating }}</h2>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-title>
      <p>{{ item.text }}</p>
    </v-card-title>
  </v-flex>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style>
.drug-info {
  display: block;
  font-size: 1.3em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
</style>
