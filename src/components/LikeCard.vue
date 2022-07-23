<template>
  <v-container>
    <template>
      <v-card class="mx-auto" max-width="45vw">
        <v-card-subtitle> {{ likes.created.substring(0, 10) }} {{ likes.created.substring(11, 19) }}</v-card-subtitle>
        <v-divider></v-divider>
        <v-card-subtitle> {{ likes.title }} </v-card-subtitle>
        <v-divider></v-divider>
        <v-card-text> {{ likes.summary }} </v-card-text>

        <v-card-actions>
          <v-dialog v-model="dialog" width="60vw">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on" @click="movedata"> 编辑 </v-btn>
            </template>
            <v-card>
              <v-card-title>修改内容</v-card-title>
              <v-divider></v-divider>
              <div style="margin: 20px">
                <v-textarea label="标题" rows="2" v-model="title"></v-textarea>
                <v-textarea label="摘要" v-model="summary"></v-textarea>
                <v-textarea label="正文" v-model="content"></v-textarea>
              </div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue" text @click="save">保存</v-btn>
                <v-btn color="grey" text @click="dialog = false">取消</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <span style="margin-left: 1vw"></span>
          <v-btn color="error" dark @click="deletedata"> 删除 </v-btn>
          <span style="margin-left: 1vw"></span>
          <v-dialog v-model="savedialog" width="30vw">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="success" dark v-bind="attrs" v-on="on"> 保存内容 </v-btn>
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
                <v-btn color="grey" text @click="savedialog = false">取消</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-spacer></v-spacer>

          <v-btn text @click="show = !show">
            <v-card-text>{{ show ? "收起全文" : "展开全文" }}</v-card-text>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

            <v-card-text> {{ likes.content }} </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import _axios from "@/plugins/axios";
import JSZipUtils from "jszip-utils";
import JSZip from "pizzip";
import Docxtemplater from "docxtemplater";
export default {
  name: "LikeCard",
  props: ["likes"],

  data: () => ({
    show: false,
    dialog: false,
    savedialog: false,
    title: null,
    summary: null,
    content: null,
  }),
  methods: {
    savetxt: function () {
      let data = this.likes.title + "\n\n" + this.likes.summary + "\n\n" + this.likes.content;
      let str = new Blob([data], { type: "text/plain;charset=utf-8" });
      saveAs(str, this.likes.title + `.txt`);
      this.savedialog = false;
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
          title: _this.likes.title,
          abstract: _this.likes.summary,
          content: _this.likes.content,
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
        saveAs(out, _this.likes.title + ".docx");
      });
      this.savedialog = false;
    },
    copytoclipboard: function () {
      let copyData = "标题: " + this.likes.title + "\n" + "摘要: " + this.likes.summary + "\n" + "正文: " + this.likes.content + "\n";
      navigator.clipboard.writeText(copyData);
      this.savedialog = false;
    },
    deletedata: function () {
      _axios.delete("/article/" + this.likes.id + "/").then((response) => {
        this.$emit("update");
      });
    },
    movedata: function () {
      this.title = this.likes.title;
      this.summary = this.likes.summary;
      this.content = this.likes.content;
    },
    save: function () {
      _axios
        .patch("/article/" + this.likes.id + "/", {
          title: this.title,
          summary: this.summary,
          content: this.content,
        })
        .then((response) => {
          this.$emit("update");
          this.dialog = false;
        });
    },
  },
};
</script>
