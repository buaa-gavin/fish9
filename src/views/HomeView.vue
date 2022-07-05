<template>
  <div class="home">
    <dash-board/>
  </div>
</template>

<script>
// @ is an alias to /src
import DashBoard from '@/components/DashBoard.vue'

export default {
  name: 'HomeView',
  components: {
    DashBoard
  }
}
</script>
