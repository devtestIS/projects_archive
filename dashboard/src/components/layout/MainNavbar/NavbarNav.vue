<template>
  <d-navbar-nav class="flex-row">
    <li class="nav-item dropdown">
      <a v-d-toggle.user-actions class="nav-link dropdown-toggle text-nowrap px-3">
        <img v-if="avatar" class="user-avatar rounded-circle mr-2" src="" alt="User Avatar" />
        <span v-else class="avatar-placeholder" />
        <span class="d-none d-md-inline-block">{{ name }}</span>
      </a>
      <d-collapse id="user-actions" ref="d_collapse" class="dropdown-menu dropdown-menu-small">
        <d-dropdown-item to="user-profile" @click.native="closeCollapseMenu()">
          <i class="material-icons">&#xE7FD;</i> Общие сведения
        </d-dropdown-item>
        <d-dropdown-item to="subscription" @click.native="closeCollapseMenu()">
          <i class="material-icons">&#xE8B8;</i> Подписка и тарифы
        </d-dropdown-item>
        <d-dropdown-item to="statistics" @click.native="closeCollapseMenu()">
          <i class="material-icons">&#xE2C7;</i> Статистика
        </d-dropdown-item>
        <d-dropdown-item to="/history" @click.native="closeCollapseMenu()">
          <i class="material-icons">&#xE896;</i> История операций
        </d-dropdown-item>
        <d-dropdown-item to="/requisites" @click.native="closeCollapseMenu()">
          <i class="material-icons">&#xE896;</i> Реквизиты для акта
        </d-dropdown-item>
        <d-dropdown-item to="/documentation" @click.native="closeCollapseMenu()">
          <i class="material-icons">&#xE873;</i> Документация
        </d-dropdown-item>
        <d-dropdown-divider />
        <d-dropdown-item
          class="text-danger"
          @click.native="
            closeCollapseMenu();
            logout();
          "
        >
          <span>
            <i class="material-icons text-danger">&#xE879;</i>
            Выйти
          </span>
        </d-dropdown-item>
      </d-collapse>
    </li>
  </d-navbar-nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      avatar: null,
    };
  },
  computed: {
    ...mapState({
      name: state => state.tokenHandling.name,
    }),
  },
  methods: {
    ...mapActions('logout', ['logout']),
    closeCollapseMenu() {
      this.$refs.d_collapse.show = false;
      this.$refs.d_collapse.$data.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-placeholder {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-right: 8px;
  border-radius: 50%;
  background: #006fe6;
  vertical-align: middle;
}
</style>

<style>
.dropdown .fa,
.dropdown .material-icons {
  color: #aba9a9;
}
.nav-link:hover {
  cursor: pointer;
}

@media screen and (max-width: 767px) {
  #user-actions {
    left: -70px;
  }
}

/* IE11 Navbar flex fix. */
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  .navbar-nav {
    align-items: stretch !important;
    flex: 1 1 100%;
    flex-flow: row wrap;
  }

  .nav-item.notifications {
    margin-left: auto !important;
  }
}
</style>
