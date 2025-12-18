<template>
  <n-transfer v-model="dataModel" :data="data" draggable style="width: 500px"></n-transfer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const data = ref([]);
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
