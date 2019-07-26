<template>
  <v-alert type="error" transition="scale-transition" :value="!!error">
    <div v-html="error" />
  </v-alert>
</template>

<script>
export default {
  props: ['error']
}
</script>

<style>
</style>
