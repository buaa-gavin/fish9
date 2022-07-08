<template>
  <v-container>
    <v-row>
      <v-col offset="3" cols="6">
        <v-container>
          <!-- <v-snackbar v-model="snackbar_login" timeout="1500"> 登录成功 </v-snackbar>
          <v-snackbar v-model="snackbar_register" timeout="1500"> 注册成功 </v-snackbar> -->
          <div v-if="register" class="loginbar">注册</div>
          <div v-else class="loginbar">登录</div>
          <v-text-field v-show="!register" v-model="username" label="Username" required></v-text-field>
          <v-text-field v-show="register" v-model="username" label="Username" hint="at least 3 characters, combined of numbers and letters." required></v-text-field>

          <v-text-field v-show="!register" :type="'password'" v-model="password" label="Password" required></v-text-field>
          <v-text-field v-show="register" :type="'password'" v-model="password" label="Password" hint="at least 8 characters, combined of numbers and letters." required></v-text-field>

          <div v-show="register">
            <v-text-field :type="'password'" v-model="password2" label="Repeat Password" required></v-text-field>
            <v-text-field :type="'email'" v-model="email" label="Email"></v-text-field>
          </div>
        </v-container>
        <div>
          <v-btn large rounded color="blue" @click="loginHandler"> 登录 </v-btn>
          <span style="margin-left: 20px; margin-right: 20px"></span>
          <v-btn large rounded @click="registerHanlder"> 注册 </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import _axios from "@/plugins/axios";
import router from "@/router";
export default {
  name: "LoginBoard",

  data: () => ({
    username: "",
    password: "",
    password2: "",
    register: false,
    email: "",
    snackbar_login: false,
    snackbar_register: false,
    registerLimit: {
      username_length: 3,
      password_length: 8,
    },
  }),
  watch: {
    password: function (newInput) {
      // console.log("<<<<<<" + this.verifyAlpNum(this.password));
    },
  },
  methods: {
    registerHanlder: function () {
      if (!this.register) {
        this.register = true;
      } else {
        let _username = this.username.length >= this.registerLimit.username_length && this.verifyAlpNum(this.username);
        let _password = this.password.length >= this.registerLimit.password_length && this.verifyAlpNum(this.password);
        let _password2 = this.password == this.password2;
        let ok = _username && _password && _password2;

        if (!ok) {
          let hint = "";
          if (!_username) hint += "username format error\n";
          if (!_password) hint += "password format error\n";
          if (!_password2) hint += "password not match\n";
          alert(hint);
          return;
        }
        // axios post
        //
        // wait for response
        // alert("register successfully");
        // this.snackbar_register=true;
        _axios.post('/user/', {
          'username': this.username,
          'password': this.password,
          'email': this.email
        }).then((response) => {
          alert('注册成功')
          this.register = false
        }).catch((error) => {
          alert('用户已存在')
        })
      }
    },
    verifyAlpNum: function (str) {
      return /^[A-Za-z0-9]*$/.test(str);
    },
    loginHandler: function () {
      // register page
      if (this.register) {
        this.username = this.password = "";
        this.register = false;
      } else {
        // axios post
        //
        // wait for response
        // alert("login successful");
        _axios
          .post("/token/", {
            username: this.username,
            password: this.password,
          })
          .then((response) => {
            localStorage.setItem("TOKEN", response.data.access);
            localStorage.setItem("username", this.username);
            this.$bus.$emit("loginSuccessful");
            router.push({ name: "home" });
          });
      }
    },
  },
};
</script>
<style>
.loginbar {
  color: #1976d2;
  font-size: 200%;
}
</style>
