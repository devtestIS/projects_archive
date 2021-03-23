<template>
  <d-container fluid class="h-100">
    <!-- Main Sidebar -->
    <!-- <MainSidebar
        v-if="isAuth"
        :items="sidebarItems"
        hide-logo-text
      /> -->
    <main class="main-conten h-100">
      <!-- Main Navbar -->
      <MainNavbar />

      <!-- Content -->
      <slot />
    </main>
  </d-container>
</template>

<script>
import { mapState } from 'vuex';
import getSidebarItems from '@/data/user-nav-items';

import MainNavbar from '@/components/layout/MainNavbar/MainNavbar.vue';
// import MainSidebar from '@/components/layout/MainSidebar/MainSidebar.vue'

export default {
  components: {
    MainNavbar,
    // MainSidebar
  },
  data() {
    return {
      sidebarItems: getSidebarItems(),
    };
  },
  computed: {
    ...mapState(['isAuth']),
  },
};
</script>
