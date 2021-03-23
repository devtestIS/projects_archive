<template>
  <v-row align="center" justify="center">
    <v-col cols="4">
      <v-form
        ref="form"
        v-model="valid"
        class="align-center d-flex flex-column"
        autocomplete="off"
        @submit.prevent="submit"
      >
        <h1 class="mb-10 text-center text-h1">
          Passwort vergessen
        </h1>
        <BaseTextField
          v-model="emailVal"
          :rules="emailRules"
          type="email"
          label="E-Mail"
        />
        <v-alert
          v-if="!!responseMessage"
          prominent
          text
          :type="error ? 'error' : 'success'"
        >
          {{ responseMessage }}
        </v-alert>
        <BaseButton v-if="!!responseMessage && !error" valid type="submit"
          >Back to login</BaseButton
        >
        <BaseButton v-else :valid="valid" type="submit">Submit</BaseButton>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import authorization from '@/mixins/authorization'

export default {
  name: 'ForgotPassword',
  mixins: [authorization],
  methods: {
    submit() {
      const check = !!this.responseMessage && !this.error
      check ? this.clearResponseMessage() : this.restorePassword()
    }
  }
}
</script>

<style lang="scss" scoped></style>
