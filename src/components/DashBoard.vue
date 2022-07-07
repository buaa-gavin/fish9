<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-5" cols="6">
        <v-snackbar v-model="snackbar_long" timeout="2000">字数过长 </v-snackbar>
        <v-snackbar v-model="snackbar_null" timeout="2000">不能为空 </v-snackbar>
        <v-textarea v-model="story" clearable counter rows="16" clear-icon="mdi-close-circle" label="story" outlined no-resize height="440" :rules="rules" />
        <v-container>
          <v-select :items="items" outlined label="选择标题风格"></v-select>
          <v-btn elevation="2" @click="generate"> generate </v-btn>
          <v-btn elevation="2" @click="copytoclipboard"> copy to clipboard </v-btn>
        </v-container>
      </v-col>
      <v-divider vertical />
      <v-col>
        <v-row>
          <v-col>
            <v-skeleton-loader :loading="loading" :boilerplate="boilerplate" type="list-item-two-line">
              <v-textarea v-model="title" value="12345xxxxx" label="title" rows="4" outlined no-resize />
            </v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea v-model="abstract" value="12345xxxxx" rows="9" label="asbtract" outlined no-resize />
          </v-col>
        </v-row>
        <v-container>
            <v-chip v-for="keyword in keywords" :key="keyword" class="ma-2">
              {{ keyword }}
            </v-chip>
        </v-container>
        <v-container>
          <v-btn elevation="2" @click="save"> 收藏 </v-btn>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import _axios from "@/plugins/axios";
import router from '@/router';
export default {
  name: "DashBoard",

  data: () => ({
    story: "123456",
    title: "a happy day",
    abstract: "Mike has a happy day. He drank milk this day.",
    body: "Mike really has a happy day.",
    loading: false,
    boilerplate: true,
    transition: "scale-transition",
    items: ["时政新闻标题",  "科技新闻标题", "微信公众号标题"],
    rules: [(v) => v.length <= 2000 || "最多2000字"],
    keywords: ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5", "keyword6", "keyword7", "keyword8"],
    snackbar_long: false,
    snackbar_null: false,
  }),
  watch: {
    story: function (newInput) {
      console.log("new>>>>" + newInput);
    },
  },
  methods: {
    copytoclipboard: function () {
      let copyData = "title: " + this.title + "\n" + "abstract: " + this.abstract + "\n" + "body: " + this.body + "\n";
      navigator.clipboard.writeText(copyData);
    },
    generate: function () {
      if (this.story.length > 2000) {
        this.snackbar_long = true;
        return;
      } else if (this.story.length == 0) {
        this.snackbar_null = true;
        return;
      } else {
        this.loading=true,
        _axios.post('/article/generate', {
          'content': this.story
        }).then((response) => {
          this.title = response.data.title
          this.abstract = response.data.summary
          this.keywords = response.data.keywords
          this.loading=false
        }).catch((error) => {
          this.title = 'input is too simple'
          this.abstract = 'please try more words'
          this.keywords = []
          alert('input is too simple')
          this.loading = false
        })
      }
    },
    save: function () {
      if (!localStorage.getItem('TOKEN')) {
        router.push({ name: 'login' })
      }
        console.log(this.title)
    },
  },
};
</script>
