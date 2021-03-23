<template>
  <v-app>
    <vue-particles
      functional
      color="#35128e"
      :particle-opacity="1"
      :particles-number="10"
      shape-type="circle"
      :particle-size="5"
      lines-color="#35128e"
      :lines-width="1"
      :line-linked="true"
      :line-opacity="0.7"
      :lines-distance="250"
      :move-speed="5"
      :hover-effect="true"
      hover-mode="grab"
      :click-effect="true"
      click-mode="push"
    />
    <v-app-bar height="auto" app absolute>
      <v-container class="d-flex">
        <v-row no-gutters justify="space-between" align="center" class="mt-10">
          <v-col lg="auto">
            <router-link to="/">
              <v-img
                alt="Logo"
                src="./assets/img/logo.svg"
                width="187"
                height="50"
              />
            </router-link>
          </v-col>
          <v-col lg="auto">
            <DropdownLink />
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <div class="main-wrapper">
        <v-container>
          <router-view></router-view>
        </v-container>
        <div class="transactions-wrapper">
          <v-container>
            <router-view name="transactions"></router-view>
          </v-container>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import DropdownLink from '@/components/DropdownLink'

export default {
  name: 'App',
  components: {
    DropdownLink
  },
  data: () => ({})
}
</script>

<style lang="scss" scoped>
.main-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.transactions-wrapper {
  width: 100%;
  background: rgba($color: #0b163a, $alpha: 0.7);
}
</style>
