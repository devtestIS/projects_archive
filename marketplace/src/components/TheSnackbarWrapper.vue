<template>
  <v-snackbar v-model="snackbar" color="success" timeout="10000" bottom right>
    {{ snackbarText }}

    <template
      #action="{ 
        attrs
         }"
    >
      <v-btn color="white" text v-bind="attrs" @click="setSnackbarState(false)">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'TheSnackbarWrapper',
  computed: {
    ...mapState(['snackbarText', 'snackbarState']),
    snackbar: {
      get() {
        return this.snackbarState
      },
      set(value) {
        this.setSnackbarState(value)
      }
    }
  },
  methods: {
    ...mapActions(['setSnackbarState'])
  }
}
</script>

<style lang="scss" scoped></style>
