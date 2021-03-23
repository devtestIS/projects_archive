<template>
  <d-container fluid>
    <BaseAlert />
    <d-row>
      <!-- Main Sidebar -->
      <MainSidebar :items="sidebarItems" />

      <d-col class="main-content offset-lg-2 offset-md-3 p-0" tag="main" lg="10" md="9" sm="12">
        <!-- Main Navbar -->
        <MainNavbar />

        <!-- Content -->
        <slot />
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
import BaseAlert from '@/components/BaseAlert';
import getUserSidebarItems from '@/data/user-nav-items';
import getAdminSidebarItems from '@/data/admin-nav-items';

// Main layout components
import MainNavbar from '@/components/layout/MainNavbar/MainNavbar.vue';
import MainSidebar from '@/components/layout/MainSidebar/MainSidebar.vue';

export default {
  name: 'Analytics',
  components: {
    MainNavbar,
    MainSidebar,
    BaseAlert,
  },
  data() {
    return {
      sidebarItems: getUserSidebarItems(),
    };
  },
  watch: {
    $route(val) {
      if (val.path.includes('admin')) {
        this.sidebarItems = getAdminSidebarItems();
      }
    },
  },
  created() {
    if (this.$route.path.includes('admin')) {
      this.sidebarItems = getAdminSidebarItems();
    }
  },
};
</script>
