<template>
  <n-transfer v-model="dataModel" :data="data" style="width: 500px"></n-transfer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const data = ref([
      {
        key: 0,
        label: '分类标题A',
        isGroup: true,
      },
      {
        key: 1,
        label: 'A-1',
      },
      {
        key: 2,
        label: 'A-2',
      },
      {
        key: 3,
        label: '分类标题B',
        isGroup: true,
      },
      {
        key: 4,
        label: 'B-1',
      },
      {
        key: 5,
        label: 'B-2',
      },
    ]);
    const dataModel = ref([1, 4]);
    return {
      data,
      dataModel,
    };
  },
});
</script>
