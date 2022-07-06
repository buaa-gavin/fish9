<template>
  <div>
    <v-btn v-if="!isLogin" text @click="jump2Login">
      <span class="mr-2">login</span>
    </v-btn>
    <div v-else>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text @click="jump2Note" v-bind="attrs" v-on="on"> {{ username }} </v-btn>
        </template>
        <span>创作中心</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="white" @click="jump2Favorite" v-bind="attrs" v-on="on">
            <v-icon>mdi-star</v-icon>
          </v-btn>
        </template>
        <span>收藏</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="white" @click="logout" v-bind="attrs" v-on="on">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>退出登录</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "UserStatus",
  data: () => ({
    username: "mike",
    isLogin: false,
  }),
  methods: {
    jump2Note: () => {
      if (router.currentRoute.name != "home") {
        router.push("/");
      }
    },
    jump2Login: () => {
      if (router.currentRoute.name !== "login") {
        router.push("/login");
      }
    },
    jump2Favorite: () => {
      if (router.currentRoute.name != "favorite") {
        router.push("/favorite");
      }
    },
    logout: function () {
      this.isLogin = false;
      localStorage.removeItem("TOKEN");
      router.push("/login");
    },
  },
  mounted() {
    this.$bus.$on("loginSuccessful", () => {
      this.isLogin = true;
      this.username = localStorage.getItem("username");
    });
  },
  beforeDestory() {
    this.$bus.$off("loginSuccessful");
  },
};
</script>
