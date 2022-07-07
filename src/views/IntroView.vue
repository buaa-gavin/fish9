<template>
  <v-container fill-height fluid class="py-0 px-0">
    <v-col>
      <v-row no-gutters>
        <v-col>
          <span class="introword"> FISH9 未来创作 </span>
          <div class="introContent">次时代创作平台</div>
          <div class="introContent">AI赋能,革新写作方式</div>
          <div style="margin-top: 30px"></div>
          <div class="introFeature">自动生成标题、摘要、关键字</div>
          <div class="introFeature">一键收藏,轻松管理作品</div>
          <div class="introFeature">多风格标题,为多平台而来</div>
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
        <div class="text-center">
          <v-btn rounded large @click="jump2Home" color="primary"> <v-icon dark fab> mdi-pencil </v-icon>立即使用 </v-btn>
          <span style="margin-left: 20px; margin-right: 20px"></span>
          <v-btn rounded large @click="jump2Login"> <v-icon dark fab> mdi-account-circle </v-icon>登录账户 </v-btn>
        </div>
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
    jump2Login: () => {
      router.push({ name: "login" });
    },
  },
};
</script>

<style>
.introword {
  font-size: 200%;
  color: #1976d2;
  height: 33%;
}
.subintroword {
  font-size: 150%;
  height: 25%;
  color: #1976d2;
  margin-bottom: 10px;
}
.introContent {
  margin-top: 5px;
  margin-bottom: 5px;
  color: #1976d2;
  font-size: 80;
}
.introFeature {
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 80;
}
</style>
