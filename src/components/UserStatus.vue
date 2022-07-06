<template>
  <div>
    <v-btn v-if="!isLogin"
      text
      @click="jump2Login"
    >
      <span class="mr-2">login</span>
    </v-btn>
    <div v-else>
        <v-btn text> {{ username }} </v-btn>
        <v-btn icon color="yellow" @click="jump2Favorite">
            <v-icon>mdi-star</v-icon>
        </v-btn>
        <v-btn icon color="white" @click="logout">
            <v-icon>mdi-logout</v-icon>
        </v-btn>
    </div>
  </div>
</template>

<script>
import router from '@/router'

export default ({
    name: 'UserStatus',
    data: () => ({
        username: 'mike',
        isLogin: false,
    }),
    methods: {
        jump2Login: () => {
            if (router.currentRoute.name !== 'login') {
                router.push('/login')
            }
        },
        jump2Favorite: () => {
            if (router.currentRoute.name != 'favorite') {
                router.push('/favorite')
            }
        },
        logout: function(){
            this.isLogin = false
            localStorage.removeItem('TOKEN')
            router.push('/login')
        }
    },
    mounted() {
        this.$bus.$on('loginSuccessful', () => {
            this.isLogin = true
            this.username = localStorage.getItem('username')
        })
    },
    beforeDestory() {
        this.$bus.$off('loginSuccessful')
    }
})

</script>
