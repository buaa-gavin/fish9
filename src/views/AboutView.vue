<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div v-for="(item, index) in favor" :key="index">
      <like-card :likes="item"></like-card>
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
  mounted() {
    _axios.get("/article").then((response) => {
      this.favor = response.data;
    });
  },
};
</script>
