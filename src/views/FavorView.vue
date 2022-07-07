<template>
  <div class="about">
    <div class="aboutTitle">管理收藏内容</div>
    <div v-for="(item, index) in favor" :key="index">
      <like-card :likes="item" @update="update"></like-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LikeCard from "../components/LikeCard.vue";
import _axios from "@/plugins/axios";
export default {
  name: "HomeView",

  data() {
    return {
      favor: [
        {
          title: "tit",
          summary: "summ",
          content: "cont",
        },
      ],
    };
  },
  components: {
    LikeCard,
  },
  methods: {
    loadData: function () {
      _axios.get("/article").then((response) => {
        this.favor = response.data;
      });
    },
    update: function () {
      this.loadData();
      console.log("up");
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style>
.aboutTitle{
    font-size: 180%;
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>
