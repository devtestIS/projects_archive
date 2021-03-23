<template>
  <v-row align="center" justify="center">
    <v-col cols="4">
      <v-form
        v-model="valid"
        class="align-center d-flex flex-column"
        autocomplete="off"
        @submit.prevent="login"
      >
        <h1 class="mb-10 text-center text-h1">
          Login
        </h1>
        <BaseTextField
          v-model="emailVal"
          :rules="emailRules"
          type="email"
          label="E-Mail"
        />
        <BaseTextField
          v-model="passwordVal"
          :rules="passwordRules"
          label="Passwort"
          type="password"
        />
        <router-link
          to="forgot-password"
          class="align-self-start password-reminder"
        >
          Passwort vergessen</router-link
        >
        <BaseButton :valid="valid" type="submit">Login</BaseButton>
        <router-link to="register">Registrieren</router-link>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import authorization from '@/mixins/authorization'

export default {
  name: 'Login',
  mixins: [authorization]
}
</script>

<style lang="scss" scoped>
.password-reminder {
  margin-top: -25px;
  margin-bottom: 40px;
  margin-left: 30px;
  z-index: 5;
}
</style>
