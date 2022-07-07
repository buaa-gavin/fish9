<template>
    <v-img
      src="https://picsum.photos/id/11/500/300">
    <v-container
      fill-height
      >
    <v-row
      no-gutters
    >
      <v-col>
        <span class="introword"> Intelligent article extractor </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
        rounded 
        x-large
        @click="jump2Home">
          Start!
        </v-btn>
      </v-col>
    </v-row>
    </v-container>
    </v-img>
</template>

<script>
import router from '@/router'
// @ is an alias to /src

export default {
  name: 'IntroView',
  components: {
  },
  data() {
    return {
      src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
    }
  },
  methods: {
    jump2Home: () => {
      router.push({ name: 'home' } )
    }
  }
}
</script>

<style>
.introword {
  font-size: 200%;
  height: 33%;
}
</style>