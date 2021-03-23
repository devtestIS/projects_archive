<template>
  <d-container fluid class="main-content-container px-4">
    <h4 class="mt-3 mb-3">Список размещенных материалов</h4>
    <d-row>
      <d-col lg="8">
        <ThePublicationsList />
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
import ThePublicationsList from '@/components/ThePublicationsList';
export default {
  name: 'AdminDocumentManagment',
  components: {
    ThePublicationsList,
  },
};
</script>
