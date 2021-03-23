<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Error -->
    <div class="error">
      <div class="error__content">
        <h2>500</h2>
        <h3>Что-то пошло не так.</h3>
        <p>Проблема с загрузкой страницы, попробуйте позже.</p>
        <d-button pill @click="returnToRoot">
          &larr; Вернуться
        </d-button>
      </div>
    </div>
  </d-container>
</template>

<script>
export default {
  methods: {
    returnToRoot() {
      this.$router.push('/');
    },
  },
};
</script>
