<template>
  <n-transfer-v-2 v-model="dataModel" :data="data" style="width: 592px"></n-transfer-v-2>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import type { TransferDataProps } from '@nio-fe/lego';

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
    ]) as Ref<TransferDataProps[]>;
    const dataModel = ref([1, 4]);
    return {
      data,
      dataModel,
    };
  },
});
</script>
