<template>
  <div class="login">
    <login-board/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginBoard from '@/components/LoginBoard.vue'

export default {
  name: 'HomeView',
  components: {
    LoginBoard
  }
}
</script>
