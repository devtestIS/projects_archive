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
          Reset password
        </h1>
        <BaseTextField
          v-model="passwordVal"
          :rules="[
            v => v === this.passworConfirmdVal || 'Password do not match',
            ...passwordRules
          ]"
          label="Passwort"
          type="password"
        />

        <BaseTextField
          v-model="passworConfirmdVal"
          :rules="[
            v => v === this.passwordVal || 'Password do not match',
            ...passwordRepeatRules
          ]"
          label="Wiederholen Sie das Passwort"
          type="password"
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
      const hash = this.$route.query.hash
      const check = !!this.responseMessage && !this.error
      check ? this.clearResponseMessage() : this.resetPassword(hash)
    }
  }
}
</script>

<style lang="scss" scoped></style>
