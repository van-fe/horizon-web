<template>
  <h-form label-position="left" label-width="fit-content">
    <h-form-item label="可搜索">
      <h-switch v-model="isFilter" status />
    </h-form-item>
    <h-form-item label="可拖拽">
      <h-switch v-model="isDraggable" status />
    </h-form-item>
  </h-form>
  <h-transfer-v-2
    v-model="dataModel"
    :data="data"
    :filterable="isFilter"
    :draggable="isDraggable"
    show-control
    style="width: 592px"
  />
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import type { TransferDataProps } from '@aurora/horizon-web';

const isFilter = ref(false);
const isDraggable = ref(false);

const data = ref([]) as Ref<TransferDataProps[]>;
for (let i = 1; i <= 5; i++) {
  data.value.push({
    key: i,
    label: i == 3 ? `选项${i}被禁用了` : `选项名称 ${i}`,
    disabled: i == 3,
  });
}
const dataModel = ref([3]);
</script>

<style scoped></style>
