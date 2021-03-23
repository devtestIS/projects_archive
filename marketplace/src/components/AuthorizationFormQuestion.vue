<template #append-outer>
  <v-dialog v-model="dialog" overlay-opacity="0.5" width="800">
    <div class="close">
      <v-btn icon @click="dialog = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <template #activator="{on, attrs}">
      <v-icon class="icon" v-bind="attrs" v-on="on">
        {{ icon }}
      </v-icon>
    </template>

    <v-card>
      <v-card-title class="d-flex justify-center">
        <h1 class="mt-10 text-center text-h1">Verkäufertoken</h1>
      </v-card-title>

      <v-card-text class="text-center">
        <v-row align="center" justify="center">
          <v-col cols="7">
            Sie finden den Verkäufertoken oder Händler-Token in Ihrem
            SellerCentral Account im Bereich "Informationen zum Verkäuferkonto -
            Geschäftsdaten"
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AuthorizationFormQuestion',
  data() {
    return {
      dialog: false,
      icon: 'mdi-help-circle-outline'
    }
  }
}
</script>

<style lang="scss" scoped>
.close {
  display: flex;
  justify-content: flex-end;
}

.icon {
  position: absolute;
  top: 20px;
  right: -35px;
  cursor: pointer;
}
</style>
