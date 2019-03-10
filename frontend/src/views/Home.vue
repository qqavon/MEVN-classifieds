<template>
  <div class="home">
    <h1> Kategorie ogłoszeń </h1>
    <home-categories></home-categories>
  </div>
</template>

<script>
import HomeCategories from '../components/HomeCategories.vue'

export default {
  components: {
    'home-categories': HomeCategories
  }  
}
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>