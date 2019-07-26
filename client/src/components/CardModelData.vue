<template>
  <div
    v-bind:class="{ 'positive': itemScore === 'positive',
                    'negative': itemScore === 'negative'}"
    class="ma-2"
  >
    <v-list-tile>
      <v-list-tile-content class="align-center">
        <h4>{{modelName}}</h4>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile class="border">
      <v-list-tile-content>Score</v-list-tile-content>
      <v-list-tile-content class="align-end mr-3">{{ itemScore }}</v-list-tile-content>
      <v-icon v-if="itemScore === 'positive'">check_circle</v-icon>
      <v-icon v-if="itemScore === 'negative'">warning</v-icon>
    </v-list-tile>
    <v-list-tile class="border">
      <v-list-tile-content>Probability</v-list-tile-content>
      <v-list-tile-content class="align-end">{{ itemProbability.toFixed(4) }}</v-list-tile-content>
    </v-list-tile>
  </div>
</template>

<script>
export default {
  props: ['itemScore', 'itemProbability', 'modelName']
}
</script>

<style>
.border {
  border-top: 1px solid black;
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
