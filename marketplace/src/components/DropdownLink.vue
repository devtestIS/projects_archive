<template>
  <v-menu v-if="loggedIn && !isPublic" v-model="showMenu" offset-y>
    <template #activator="{on, attrs}">
      <span class="dropdown-wrapper" v-bind="attrs" v-on="on"
        >{{ email }}
        <span
          class="dropdown"
          :class="{
            open: showMenu
          }"
          ><v-icon>mdi-menu-down</v-icon></span
        ></span
      >
    </template>
    <v-list flat class="menu">
      <v-list-item v-if="!integration" to="/auth/register-end">
        <v-list-item-title class="link"
          ><v-icon size="14" color="white" class="icon">mdi-power</v-icon>
          Enable Integration</v-list-item-title
        >
      </v-list-item>
      <v-list-item to="/">
        <v-list-item-title class="link"
          ><v-icon size="14" color="white" class="icon">mdi-plus</v-icon> Add
          CSV file</v-list-item-title
        >
      </v-list-item>
      <v-divider class="devider"></v-divider>
      <v-list-item to="/account" class="link">
        <v-list-item-title class="indent">My Account</v-list-item-title>
      </v-list-item>
      <v-list-item to="/logout" class="link" @click.prevent="logout">
        <v-list-item-title class="indent">Log Out</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'BaseDropdownLink',
  data() {
    return {
      showMenu: false
    }
  },
  computed: {
    ...mapState(['email']),
    ...mapGetters(['loggedIn', 'integration']),
    isPublic() {
      return this.$route.matched.some(record => record.meta.isPublic)
    }
  },
  methods: {
    ...mapActions(['logout'])
  }
}
</script>

<style lang="scss" scoped>
.menu {
  margin-top: 10px;
}
.dropdown-wrapper {
  display: flex;
  align-items: center;
  font-size: 20px;
}
.dropdown {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  margin-left: 10px;
  background: #081830;
  &.open {
    transform: rotate(180deg);
    transition: transform ease 0.3s;
  }
}
.devider {
  margin: 0 20px;
}
.link {
  cursor: pointer;

  &:hover {
    &,
    & .icon {
      color: #00a1fe !important;
    }
  }
}
.indent {
  margin-left: 24px;
}
.icon {
  margin-right: 7px;
}
</style>
