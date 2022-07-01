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
            rows="15"
            clear-icon="mdi-close-circle"
            label="story"
            height="450"
            v-model="story"
          >
          
          </v-textarea>
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
              v-model="title"
            >
            </v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              value="12345xxxxx"
              label="asbtract"
              v-model="abstract"
            >
            </v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              value="12345xxxxx"
              label="body"
              v-model="body"
            >
            </v-textarea>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
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

      }
    }
  }
</script>
