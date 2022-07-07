<template>
  <v-container fill-height fluid class="py-0 px-0">
    <v-col>
      <v-row no-gutters>
        <v-col>
          <span class="introword"> FISH9 未来创作 </span>
          <div>AI赋能,革新写作方式</div>
        </v-col>
      </v-row>
      <v-row> </v-row>
    </v-col>
    <v-col>
      <v-img src="../../public/index.jpg" width="35vw"></v-img>
    </v-col>
    <v-img src="../../public/wave.svg" fill-height width="100vw">
      <v-col>
        <div class="subintroword">开启全智创作</div>
        <v-btn rounded x-large @click="jump2Home"> <v-icon dark fab> mdi-pencil </v-icon>立即使用 </v-btn>
      </v-col>
    </v-img>
  </v-container>
</template>

<script>
import router from "@/router";
// @ is an alias to /src

export default {
  name: "IntroView",
  components: {},
  data() {
    return {
      src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
    };
  },
  methods: {
    jump2Home: () => {
      router.push({ name: "home" });
    },
  },
};
</script>

<style>
.introword {
  font-size: 200%;
  height: 33%;
}
.subintroword {
  font-size: 150%;
  height: 25%;
  color: #1976d2;
  margin-bottom: 10px;
}
</style>
