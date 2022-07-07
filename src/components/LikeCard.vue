<template>
  <v-container>
    <template>
      <v-card class="mx-auto" max-width="344">
        <v-card-subtitle> time </v-card-subtitle>

        <v-card-title> {{ title }} </v-card-title>

        <v-card-subtitle> {{ abstract }} </v-card-subtitle>

        <v-card-actions>
          <v-dialog v-model="dialog" width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on"> edit </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">修改内容</span>
              </v-card-title>
              <v-textarea label="标题" v-model="title"></v-textarea>
              <v-textarea label="摘要" v-model="abstract"></v-textarea>
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
            <v-subtitle>{{ show ? "收起全文" : "展开全文" }}</v-subtitle>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

            <v-card-text> {{ content }} </v-card-text>
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
    title: this.likes.title,
    abstract: this.likes.summary,
    content: this.likes.content,
  }),
};
</script>
