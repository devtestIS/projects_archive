<template>
  <div class="mb-4">
    <div class="row page-header py-4 no-gutters">
      <div class="text-center text-sm-left mb-4 mb-sm-0 col-sm-4 col">
        <h3 class="page-title">Документация</h3>
      </div>
    </div>
    <!-- Card Header -->
    <d-row>
      <d-col lg="12">
        <d-card class="mb-3">
          <d-card-header class="px-3 py-2">
            <d-row>
              <d-col lg="1">Id</d-col>
              <d-col lg="4">Путь</d-col>
              <d-col lg="7">Метод</d-col>
            </d-row>
          </d-card-header>
        </d-card>
      </d-col>
      <d-col lg="12">
        <template v-for="(item, index) in documentation">
          <d-card :key="index" class="mb-2">
            <d-card-header class="px-3 py-2 method-button" role="tab">
              <d-row v-d-toggle="`collapse-${index}`" block-level>
                <d-col lg="1">{{ item.id }}</d-col>
                <d-col lg="4">{{ item.path }}</d-col>
                <d-col lg="7">{{ item.http_method }}</d-col>
              </d-row>
            </d-card-header>
            <d-collapse
              :id="`collapse-${index}`"
              accordion="my-accordion"
              role="tabpanel"
              @show="getMethodDescription(item.id)"
            >
              <d-card-body>
                <d-card-header>
                  Описание
                </d-card-header>
                <vue-markdown>{{ item.description }}</vue-markdown>
              </d-card-body>
            </d-collapse>
          </d-card>
        </template>
      </d-col>
    </d-row>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'TheDocumentation',
  components: {
    VueMarkdown,
  },
  computed: {
    ...mapState('subscription', ['documentation', 'description']),
  },
  methods: {
    ...mapActions('subscription', ['getMethodDescription']),
  },
};
</script>

<style lang="scss" scoped>
.card-header {
  border-radius: 0.625rem;
}
.method-button {
  cursor: pointer;
}
.list-group-item {
  border-top-width: 1px;
}
</style>
