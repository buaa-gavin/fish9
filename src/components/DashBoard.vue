<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-5" cols="8">
        <v-snackbar v-model="snackbar_long" timeout="2000">字数过长 </v-snackbar>
        <v-snackbar v-model="snackbar_null" timeout="2000">字数太短 </v-snackbar>
        <v-snackbar v-model="snackbar_favor" timeout="2000">收藏成功 </v-snackbar>
        <v-row class="px-3 py-3">
          <v-file-input placeholder="从txt导入" truncate-length="10" prepend-icon="mdi-text-box" outlined dense v-model="upLoadTxt" @change="importTxt()" chips> </v-file-input>
          <span style="margin-left: 2vw"></span>
          <v-file-input placeholder="从word导入" truncate-length="10" prepend-icon="mdi-file-word" outlined dense v-model="upLoadWord" @change="importWord()" chips> </v-file-input>
        </v-row>

        <v-textarea v-model="story" clearable counter rows="14" clear-icon="mdi-close-circle" label="请输入文章" outlined no-resize height="400" :rules="rules" />
        <v-container>
          <v-row align="center" justify="space-around">
            <v-select dense v-model="model_type" :items="items" outlined label="选择标题风格"></v-select>
          </v-row>
          <v-row align="center" justify="space-around">
            <span></span>
            <v-btn large depressed color="primary" elevation="2" @click="generate"> 生成 </v-btn>
            <v-dialog v-model="dialog" width="30vw">
              <template v-slot:activator="{ on, attrs }">
                <v-btn large depressed elevation="2" v-bind="attrs" v-on="on"> 保存结果 </v-btn>
              </template>
              <v-card>
                <v-card-title>保存内容</v-card-title>
                <v-divider></v-divider>
                <div style="margin: 20px">
                  <v-btn color="blue" text @click="copytoclipboard">复制到剪切板</v-btn>
                  <v-btn color="blue" text @click="savetxt">导出到txt</v-btn>
                  <v-btn color="blue" text @click="saveword">导出到word</v-btn>
                </div>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="grey" text @click="dialog = false">取消</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
              <v-textarea v-model="abstract" value="12345xxxxx" rows="10" label="生成摘要" outlined no-resize />
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
import JSZipUtils from "jszip-utils";
import JSZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { extractRawText } from "mammoth/mammoth.browser";
// import  mammoth from "mammoth";
import { mdiFileWord, mdiTextBox } from "@mdi/js";
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
    snackbar_favor: false,
    model_type: "policy",
    dialog: false,
    upLoadTxt: null,
    upLoadWord: null,
  }),
  methods: {
    importTxt: function () {
      if (this.upLoadTxt !== null) {
        let reader = new FileReader();
        reader.readAsText(this.upLoadTxt);
        reader.onload = () => {
          this.story = reader.result;
        };
      }
    },
    importWord: function () {
      if (this.upLoadWord !== null) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(this.upLoadWord);
        reader.onload = () => {
          const data = reader.result;
          extractRawText({ arrayBuffer: data }).then((r) => {
            this.story = r.value;
          });
        };
      }
    },
    savetxt: function () {
      let data = this.title + "\n\n" + this.abstract + "\n\n" + this.story;
      let str = new Blob([data], { type: "text/plain;charset=utf-8" });
      saveAs(str, this.title + `.txt`);
      this.dialog = false;
    },
    saveword: function () {
      const _this = this;
      JSZipUtils.getBinaryContent("template.docx", function (error, content) {
        if (error) {
          throw error;
        }
        let zip = new JSZip(content);
        let doc = new Docxtemplater().loadZip(zip);
        doc.setData({
          title: _this.title,
          abstract: _this.abstract,
          content: _this.story,
        });
        try {
          doc.render();
        } catch (error) {
          this.$message.error("导出报表失败");
          throw error;
        }
        let out = doc.getZip().generate({
          type: "blob",
          mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        saveAs(out, _this.title + ".docx");
      });
      this.dialog = false;
    },
    copytoclipboard: function () {
      let copyData = "标题: " + this.title + "\n" + "摘要: " + this.abstract + "\n" + "正文: " + this.story + "\n";
      navigator.clipboard.writeText(copyData);
      this.dialog = false;
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
      // console.log(this.model_type);
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
        _axios
          .post("/article/", {
            title: this.title,
            summary: this.abstract,
            content: this.story,
          })
          .then((response) => {
            this.snackbar_favor = true;
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
    // copyToClipboard: (textToCopy) => {
    //     // navigator clipboard 需要https等安全上下文
    //     if (navigator.clipboard && window.isSecureContext) {
    //         // navigator clipboard 向剪贴板写文本
    //         return navigator.clipboard.writeText(textToCopy);
    //     } else {
    //         // 创建text area
    //         let textArea = document.createElement("textarea");
    //         textArea.value = textToCopy;
    //         // 使text area不在viewport，同时设置不可见
    //         textArea.style.position = "absolute";
    //         textArea.style.opacity = 0;
    //         textArea.style.left = "-999999px";
    //         textArea.style.top = "-999999px";
    //         document.body.appendChild(textArea);
    //         textArea.focus();
    //         textArea.select();
    //         return new Promise((res, rej) => {
    //             // 执行复制命令并移除文本框
    //             document.execCommand('copy') ? res() : rej();
    //             textArea.remove();
    //         });
    //     }
    // }
  },
};
</script>
