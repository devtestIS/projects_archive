import { mapActions } from 'vuex';

export default {
  install(Vue) {
    Vue.mixin({
      created() {
        this.$on('preloader', function(action) {
          this.preloader([action, this]);
        });
      },
      methods: {
        ...mapActions('preloader', ['preloader']),
      },
    });

    Vue.prototype.$preload = function(action, payload) {
      //$preload("") - передаем первым аргументом передаем в метод имя действия, вторым payload если он есть
      this.$emit('preloader', action);
      this[action](payload);
    };
  },
};
