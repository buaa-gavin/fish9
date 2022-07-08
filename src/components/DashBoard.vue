<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-5" cols="8">
        <v-snackbar v-model="snackbar_long" timeout="2000">字数过长 </v-snackbar>
        <v-snackbar v-model="snackbar_null" timeout="2000">字数太短 </v-snackbar>
        <v-textarea v-model="story" clearable counter rows="16" clear-icon="mdi-close-circle" label="请输入文章" outlined no-resize height="440" :rules="rules" />
        <v-container>
          <v-row align="center" justify="space-around">
            <v-select dense v-model="model_type" :items="items" outlined label="选择标题风格"></v-select>
          </v-row>
          <v-row align="center" justify="space-around">
            <span></span>
            <v-btn large depressed color="primary" elevation="2" @click="generate"> 生成 </v-btn>
            <v-btn large depressed elevation="2" @click="copytoclipboard"> 复制到剪切板 </v-btn>
            <v-btn large depressed color="primary" elevation="2" @click="save"> 收藏 </v-btn>
            <span></span>
          </v-row>
        </v-container>
      </v-col>
      <v-divider vertical />
      <v-col>
        <v-row>
          <v-col>
            <v-skeleton-loader :loading="loading" :boilerplate="boilerplate" type="list-item-two-line">
              <v-textarea v-model="title" value="12345xxxxx" label="生成标题" rows="4" outlined no-resize />
            </v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-skeleton-loader :loading="loading" :boilerplate="boilerplate" type="list-item-three-line">
              <v-textarea v-model="abstract" value="12345xxxxx" rows="9" label="生成摘要" outlined no-resize />
            </v-skeleton-loader>
          </v-col>
        </v-row>
        <v-container>
          <v-skeleton-loader :loading="loading" :boilerplate="boilerplate" type="chip">
            <v-chip v-for="keyword in keywords" :key="keyword" class="ma-2">
              {{ keyword }}
            </v-chip>
          </v-skeleton-loader>
        </v-container>
        <!-- <v-container>
          <v-btn elevation="2" @click="save"> 收藏 </v-btn>
        </v-container> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import _axios from "@/plugins/axios";
import router from "@/router";
export default {
  name: "DashBoard",

  data: () => ({
    story: "",
    title: "待生成标题",
    abstract: "待生成摘要",
    body: "Mike really has a happy day.",
    loading: false,
    boilerplate: true,
    transition: "scale-transition",
    items: ["政治新闻标题", "时事新闻标题", "科技新闻标题", "微信公众号标题"],
    rules: [(v) => v.length <= 2000 || "最多2000字"],
    keywords: ["关键词", "在此", "生成"],
    snackbar_long: false,
    snackbar_null: false,
    model_type: "policy",
  }),
  methods: {
    copytoclipboard: function () {
      let copyData = "标题: " + this.title + "\n" + "摘要: " + this.abstract + "\n" + "正文: " + this.story + "\n";
      navigator.clipboard.writeText(copyData);
    },
    type_trans: function () {
      if (this.model_type == "政治新闻标题") {
        this.model_type = "policy";
      } else if (this.model_type == "时事新闻标题") {
        this.model_type = "nlpcc";
      } else if (this.model_type == "科技新闻标题") {
        this.model_type = "csl";
      } else if (this.model_type == "微信公众号标题") {
        this.model_type = "weixin";
      }
    },
    generate: function () {
      this.type_trans();
      console.log(this.model_type);
      if (this.story.length > 2000) {
        this.snackbar_long = true;
        return;
      } else if (this.story.length == 0) {
        this.snackbar_null = true;
        return;
      } else {
        (this.loading = true),
          _axios
            .post("/article/generate", {
              model_type: this.model_type,
              content: this.story,
            })
            .then((response) => {
              this.title = response.data.title;
              this.abstract = response.data.summary;
              this.keywords = response.data.keywords;
              this.loading = false;
            })
            .catch((error) => {
              this.title = "输入太短";
              this.abstract = "请输入更多文字";
              this.keywords = null;
              this.snackbar_null = true;
              this.loading = false;
            });
      }
    },
    save: function () {
      if (!localStorage.getItem("TOKEN")) {
        router.push({ name: "login" });
      } else {
        _axios.post("/article/", {
          title: this.title,
          summary: this.abstract,
          content: this.story,
        });
      }
    },
  },
};
</script>
