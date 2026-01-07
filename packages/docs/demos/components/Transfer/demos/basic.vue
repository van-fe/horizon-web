<template>
  <h-transfer v-model="dataModel" :filterable="false" :data="data" show-control style="width: 500px"></h-transfer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const data = ref<any[]>([]);
    for (let i = 1; i <= 5; i++) {
      data.value.push({
        key: i,
        label: i == 3 ? `选项${i}被禁用了` : `选项名称 ${i}`,
        disabled: i == 3,
      });
    }
    const dataModel = ref([3]);
    return {
      data,
      dataModel,
    };
  },
});
</script>
