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

      <v-btn
        target="_blank"
        text
      >
        <span class="mr-2">login</span>
        <!-- <v-icon>mdi-open-in-new</v-icon> -->
      </v-btn>
    </v-app-bar>

    <v-main>
      <DashBoard/>
    </v-main>
  </v-app>
</template>

<script>
import DashBoard from './components/DashBoard';

export default {
  name: 'App',

  components: {
    DashBoard
  },

  data: () => ({
    //
  }),
};
</script>
