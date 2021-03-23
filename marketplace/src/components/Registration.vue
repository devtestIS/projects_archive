<template>
  <v-row align="center" justify="center">
    <v-col cols="4">
      <v-form
        v-model="valid"
        class="align-center d-flex flex-column"
        autocomplete="off"
        @submit.prevent="registration"
      >
        <h1 class="mb-10 text-center text-h1">
          Registrieren
        </h1>
        <BaseTextField
          v-model="sellerIdVal"
          :rules="tokenRules"
          type="text"
          label="Verkäufertoken"
        >
          <AuthorizationFormQuestion />
        </BaseTextField>
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
        <BaseTextField
          v-model="passworConfirmdVal"
          :rules="passwordRepeatRules"
          label="Wiederholen Sie das Passwort"
          type="password"
        />
        <BaseButton :valid="valid" type="submit">Registrieren</BaseButton>
        <router-link to="login">Login</router-link>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import AuthorizationFormQuestion from '@/components/AuthorizationFormQuestion'
import authorization from '@/mixins/authorization'

export default {
  name: 'Registration',
  components: {
    AuthorizationFormQuestion
  },
  mixins: [authorization]
}
</script>

<style lang="scss" scoped></style>
