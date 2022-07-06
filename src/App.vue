<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          src="https://picgo-1301039224.cos.ap-beijing.myqcloud.com/202207011510098.png"
          transition="scale-transition"
          width="100"
        />

      </div>

      <v-spacer></v-spacer>

      <UserStatus/>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import router from "./router"
import UserStatus from '@/components/UserStatus.vue'


export default  ({
  name: 'App',
  components: {
    UserStatus,
  },
})
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
