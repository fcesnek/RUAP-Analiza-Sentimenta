<template>
  <v-layout justify-center>
    <v-flex xs12 sm2 md3 class="info-alert">
      <v-alert :value="!!result.label" v-if="result.label == 'positive'" color="#c8e6c9">
        Model: {{ modelName }}
        <br />
        Scored value is {{result.label}}
        <br />
        Probability: {{result.probability}}
      </v-alert>

      <v-alert :value="!!result.label" v-else-if="result.label == 'negative'" color="#ffcdd2">
        Model: {{ modelName }}
        <br />
        Scored value is {{result.label}}
        <br />
        Probability: {{result.probability}}
      </v-alert>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['modelName', 'result']
}
</script>

<style scoped>
  .info-alert:last-child {
    margin-bottom: 10px;
  }
  div.v-alert {
    color: black;
  }
</style>
