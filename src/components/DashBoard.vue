<template>
  <v-container>
    <v-row class="text-center">

      <v-col
        class="mb-5"
        cols="6"
      >
          <v-textarea
            clearable
            counter
            rows="16"
            clear-icon="mdi-close-circle"
            label="story"
            outlined
            no-resize
            height="440"
            v-model="story"
          >
          
          </v-textarea>
          <v-btn
            elevation="2"
            @click="generate"
            >generate
          </v-btn>
          <v-btn
            elevation="2"
            @click="copytoclipboard"
          >copy to clipboard
          </v-btn>
      </v-col>
      <v-divider vertical>
      </v-divider>
      <v-col
      >
        <v-row>
          <v-col>
            <v-textarea
              value="12345xxxxx"
              label="title"
              rows="4"
              outlined
              no-resize
              v-model="title"
            >
            </v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              value="12345xxxxx"
              rows="9"
              label="asbtract"
              outlined
              no-resize
              v-model="abstract"
            >
            </v-textarea>
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col>
            <v-textarea
              value="12345xxxxx"
              label="body"
              v-model="body"
            >
            </v-textarea>
          </v-col>
        </v-row> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import _axios from '@/plugins/axios'
  export default {
    name: 'DashBoard',

    data: () => ({
      story: "123456",
      title: "a happy day",
      abstract: "Mike has a happy day. He drank milk this day.",
      body: "Mike really has a happy day.",
    }),
    watch: {
      story: function (newInput) {
        console.log('new>>>>' + newInput)
      }
    },
    methods: {
      copytoclipboard: function() {
        let copyData = "title: " + this.title + "\n"
                      + "abstract: " + this.abstract + "\n"
                      + "body: " + this.body + "\n"
        navigator.clipboard.writeText(copyData)

      },
      generate: function() {
        _axios.post('/article/generate', {
          'content': this.story
        }).then((response) => {
          this.title = response.data.title
          this.abstract = response.data.summary
        })
        
      }
    }
  }
</script>
