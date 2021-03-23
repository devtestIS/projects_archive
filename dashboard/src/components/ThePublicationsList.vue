<template>
  <d-row>
    <template v-for="(item, index) in items">
      <d-col :key="index" lg="10" class="d-flex align-items-center mb-2">
        <d-link>{{ item }}</d-link>
      </d-col>
      <d-col :key="`${index}-button`" lg="2" class="mb-2">
        <d-button outline theme="success" @click.native="handleClick">
          Редактировать
        </d-button>
      </d-col>
    </template>
    <d-modal v-if="showModal" size="lg" @close="handleClose">
      <d-modal-header>
        <d-modal-title>Header</d-modal-title>
      </d-modal-header>
      <d-modal-body>
        <Editor />
      </d-modal-body>
    </d-modal>
  </d-row>
</template>

<script>
import Editor from '@/components/Editor';

export default {
  name: 'ThePublicationsList',
  components: {
    Editor,
  },
  data() {
    return {
      items: [
        'Страница 1',
        'Страница 2',
        'Страница 3',
        'Страница 4',
        'Страница 5',
        'Страница 6',
        'Страница 7',
        'Страница 8',
        'Страница 9',
        'Страница 10',
      ],
      showModal: false,
    };
  },
  methods: {
    handleClick() {
      this.showModal = true;
    },
    handleClose() {
      this.showModal = false;
    },
  },
};
</script>
