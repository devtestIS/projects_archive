<template>
  <v-row align="center" justify="center">
    <v-col cols="4">
      <AccountForm />
    </v-col>
  </v-row>
</template>

<script>
import AccountForm from '@/components/AccountForm'
import getUserData from '@/mixins/getUserData'

export default {
  name: 'Account',
  components: {
    AccountForm
  },
  mixins: [getUserData]
}
</script>

<style lang="scss" scoped></style>
