<template>
  <div class="about">
    <h1>This is an about page</h1>
    <like-card/>
  </div>
</template>

<script>
// @ is an alias to /src
import LikeCard from '../components/LikeCard.vue'

export default {
  name: 'HomeView',
  components: {
    LikeCard,
  }
}
</script>
