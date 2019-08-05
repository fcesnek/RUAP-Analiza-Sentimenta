<template>
  <v-app>
    <form-eval :parameters="parameters" @dataScored="dataScored" @dataScoredError="dataScoredError"/>
    <alert-error :error="error" />

    <alert-info modelName="Neural Network" :result="resultNN" />
    <alert-info modelName="Support Vector Machine" :result="resultSVM" />
  </v-app>
</template>

<script>
import FormEval from '@/components/FormEval'
import AlertError from '@/components/AlertError'
import AlertInfo from '@/components/AlertInfo'
export default {
  components: {
    FormEval,
    AlertError,
    AlertInfo
  },
  data () {
    return {
      parameters: {
        drugName: '',
        trueRating: null,
        review: ''
      },
      error: null,
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
    customFilter (items, search, filter) {
      search = search.toString().toLowerCase()
      return items.filter(row => filter(row['drugName'], search))
    },
    dataScored (data) {
      this.resultSVM = data.resultSVM
      this.resultNN = data.resultNN
    },
    dataScoredError (error) {
      this.error = error
    }
  }
}
</script>

<style>
</style>
