<template>
  <n-transfer-v-2 v-model="dataModel" :data="data" draggable style="width: 592px"></n-transfer-v-2>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import type { TransferDataProps } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    const data = ref([]) as Ref<TransferDataProps[]>;
    for (let i = 1; i <= 5; i++) {
      data.value.push({
        key: i,
        label: `选项名称 ${i}`,
      });
    }
    const dataModel = ref([]);
    return {
      data,
      dataModel,
    };
  },
});
</script>
