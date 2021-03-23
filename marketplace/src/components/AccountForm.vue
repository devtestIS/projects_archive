<template>
  <v-form
    v-model="valid"
    class="align-center d-flex flex-column"
    autocomplete="off"
    @submit.prevent="setUser"
  >
    <h1 class="mb-7 text-center text-h1">
      Konto Informationen
    </h1>
    <div v-if="!integration" class="message">
      <v-card>
        <v-card-text class="align-center d-flex"
          ><v-icon color="orange" class="mr-2">mdi-alert-circle</v-icon>
          Aktivieren Sie die Integration in Ihrem Amazon Konto, damit das System
          automatisch die Daten abgleichen kann.</v-card-text
        >
        <v-card-actions>
          <router-link
            class="mb-7 mx-auto text-decoration-none"
            to="/auth/register-end"
          >
            <BaseButton type="button" valid>Integration aktivieren</BaseButton>
          </router-link>
        </v-card-actions>
      </v-card>
    </div>
    <BaseTextField
      v-model="sellerIdVal"
      :rules="sellerTokenRules"
      label="Verkäufertoken"
    />
    <BaseTextField
      v-model="authTokendVal"
      :rules="authTokenRules"
      label="Token für die MWS-Autorisierung"
    />
    <BaseTextField
      v-model="emailVal"
      :rules="emailRules"
      label="E-Mail"
      readonly
    />
    <!-- <BaseSubtitle>Sicherheit</BaseSubtitle>
    <div class="accoutn-link d-flex justify-space-between">
      <span class="accoutn-link__description">Passwort</span>
      <a href="">Passwort Ändern</a>
    </div>
    <BaseSubtitle>Deaktivierung</BaseSubtitle>
    <div class="accoutn-link d-flex justify-space-between">
      <span class="accoutn-link__description">Passwort</span>
      <a href="" class="orange--text">Passwort Ändern</a>
    </div> -->
    <BaseButton class="mt-7" valid type="submit">Speichern</BaseButton>
  </v-form>
</template>

<script>
import authorization from '@/mixins/authorization'
import integrationEnableStore from '@/mixins/integrationEnableStore'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AccountForm',
  mixins: [authorization, integrationEnableStore],
  data() {
    return {
      sellerTokenRules: [],
      authTokenRules: []
    }
  },
  computed: {
    ...mapGetters(['integration'])
  },
  methods: {
    ...mapActions(['setUser'])
  }
}
</script>

<style lang="scss" scoped>
.message {
  margin: 0 -248px 50px -248px;
}
.accoutn-link {
  width: 100%;
  margin-bottom: 40px;
  font-size: 20px;
}
</style>
