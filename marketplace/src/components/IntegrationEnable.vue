<template>
  <v-card
    max-width="767"
    class="align-center d-flex flex-column integration ma-auto"
  >
    <v-card-title class="heading">Unsere Entwickler-ID</v-card-title>
    <div class="d-flex key-copy mb-10">
      <v-chip color="rgba(0, 255, 252, 0.23)" label>
        {{ id }}
      </v-chip>
      <v-tooltip right>
        <template #activator="{on, attrs}">
          <v-icon
            class="key-copy__button"
            size="20px"
            v-bind="attrs"
            v-on="on"
            @click="copied"
            >mdi-file-document-multiple</v-icon
          >
        </template>
        <span>{{ tooltip }}</span>
      </v-tooltip>
    </div>
    <v-card-text class="integration__text text-center"
      >Um unseren Service zu nutzen, kopieren Sie bitte die oben angegebene ID
      und loggen sich in Ihr SellerCentral Konto ein. Dort gehen Sie im Bereich
      "Einstellungen" zum Unterpunkt "Benutzerberechtigungen" und klicken im
      Bereich "Drittanbieter-Entwickler und -Anwendungen" auf das Feld "Seite
      "Anwendungen verwalten" besuchen". Dort klicken Sie auf das Türkise Feld
      "Neuen Entwickler autorisieren". Es öffnet sich nun eine neue Seite
      (Amazon MWS). Dort tragen Sie beim "Name des Entwicklers" Input Factor
      Consulting GmbH ein und kopieren unsere Entwickler-ID in das Feld
      darunter. Sie erhalten daraufhin einen "Token für die MWS-Autorisierung",
      welchen Sie in das unten angegebene Feld eintragen.</v-card-text
    >
    <v-form v-model="valid" class="form" @submit.prevent="enableIntegration">
      <v-text-field
        v-model="authTokendVal"
        class="input"
        background-color="rgba(255, 255, 255, 0.05)"
        color="#ffffff"
        flat
        solo
        full-width
        placeholder="Token für die MWS-Autorisierung"
        :rounded="false"
        :rules="tokenRules"
      ></v-text-field>
      <v-card-actions>
        <BaseButton :valid="valid" type="submit"
          >Registrierung beenden</BaseButton
        >
      </v-card-actions>
    </v-form>
    <router-link to="/">Überspringen</router-link>
  </v-card>
</template>

<script>
import clipboard from '@/helpers/clipboard'
import integrationEnableStore from '@/mixins/integrationEnableStore'
import validationButton from '@/mixins/validationButton'

export default {
  name: 'IntegrationEnable',
  mixins: [integrationEnableStore, validationButton],
  data() {
    return {
      id: '565914216431',
      tooltip: 'Copy',
      tokenRules: []
    }
  },
  methods: {
    copied() {
      clipboard(this.id)
      this.tooltip = 'Copied!'
    }
  }
}
</script>

<style lang="scss" scoped>
.heading {
  padding: 0;
  margin-bottom: 20px;
}
.input {
  width: 100%;
  padding: 0;
  margin-bottom: 40px;
  border-radius: 0;

  input {
    padding: 24px 30px 22px 30px;
  }
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.integration {
  padding: 60px;

  &__text {
    padding: 0;
    margin-bottom: 40px;
  }
}
.key-copy {
  position: relative;

  &__button {
    position: absolute;
    top: calc(50% - 10px);
    left: calc(100% + 13px);
    cursor: pointer;
  }
}
</style>
