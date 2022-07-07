<template>
  <v-container>
    <template>
      <v-card class="mx-auto" max-width="40vw">
        <v-card-subtitle> time </v-card-subtitle>
        <v-divider></v-divider>
        <v-card-subtitle> {{ likes.title }} </v-card-subtitle>
        <v-divider></v-divider>
        <v-card-text> {{ likes.summary }} </v-card-text>

        <v-card-actions>
          <v-dialog v-model="dialog" width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on" @click="movedata"> 编辑 </v-btn>
            </template>
            <v-card>
              <v-card-title>修改内容</v-card-title>
              <v-divider></v-divider>
              <v-textarea label="标题" rows="2" v-model="title"></v-textarea>
              <v-textarea label="摘要" v-model="summary"></v-textarea>
              <v-textarea label="正文" v-model="content"></v-textarea>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue" text @click="save">save</v-btn>
                <v-btn color="grey" text @click="dialog = false">cancel</v-btn>
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
export default {
  name: "LikeCard",
  props: ["likes"],

  data: () => ({
    show: false,
    dialog: false,
    title: null,
    summary: null,
    content: null,
  }),
  methods: {
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
