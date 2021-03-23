<template>
  <div :class="['main-navbar', 'bg-white', stickyTop ? 'sticky-top' : '']">
    <d-navbar type="light" class="align-items-center flex-md-nowrap p-0">
      <d-link class="ml-auto" @click.native="handleClick">Служба поддержки</d-link>
      <d-modal v-if="showModal" :centered="true" @close="handleClose">
        <d-modal-header>
          <d-modal-title>Создать новую заявку</d-modal-title>
        </d-modal-header>
        <d-modal-body>
          <TheSupport @close="handleClose" />
        </d-modal-body>
      </d-modal>
      <NavbarNav class="align-self-center" />
      <NavbarToggle v-if="mobile" />
    </d-navbar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NavbarNav from '@/components/layout/MainNavbar/NavbarNav.vue';
import NavbarToggle from '@/components/layout/MainNavbar/NavbarToggle.vue';
import TheSupport from '@/components/TheSupport';

export default {
  components: {
    NavbarNav,
    NavbarToggle,
    TheSupport,
  },
  props: {
    /**
     * Whether the main navbar should be sticky, or not.
     */
    stickyTop: {
      type: Boolean,
    },
  },
  data() {
    return {
      mobile: false,
    };
  },
  computed: {
    ...mapState('support', ['showModal']),
  },
  created() {
    if (window.matchMedia('(max-width: 576px)').matches) {
      this.mobile = true;
    }
  },
  methods: {
    ...mapActions('support', ['handleClick', 'handleClose', 'refreshStatesAfterCloseModal']),
  },
};
</script>

<style lang="scss" scoped>
.main-navbar {
  .dropdown-menu {
    display: block;
  }
}
</style>
