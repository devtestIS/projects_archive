<template>
  <d-container fluid>
    <BaseAlert />
    <d-row>
      <main class="main-content col-lg-12 col-md-12 col-sm-12 p-0">
        <!-- Main Navbar -->
        <div :class="['main-navbar', 'bg-white']">
          <d-container class="p-0">
            <d-navbar type="light" class="align-items-stretch flex-md-nowrap p-0">
              <a class="navbar-brand" href="#" style="line-height: 25px;">
                <div class="d-table m-auto">
                  <img
                    id="main-logo"
                    class="d-inline-block align-top mr-1 ml-3"
                    style="max-width: 25px;"
                    src="@/assets/images/shards-dashboards-logo.svg"
                    alt="НИП"
                  />
                  <span class="d-none d-md-inline ml-1">НИП</span>
                </div>
              </a>
            </d-navbar>
          </d-container>
        </div>
        <!-- Content -->
        <slot />
      </main>
    </d-row>
  </d-container>
</template>

<script>
import BaseAlert from '@/components/BaseAlert';
export default {
  components: {
    BaseAlert,
  },
};
</script>
