<template>
  <h-form label-position="left" label-width="fit-content">
    <h-form-item label="排序策略">
      <h-radio-group v-model="order">
        <h-radio label="push" />
        <h-radio label="original" />
        <h-radio label="unshift" />
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-transfer-v-2
    v-model="dataModel"
    :data="data"
    :target-order="order"
    show-control
    style="width: 592px"
  />
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import type { TransferDataProps } from '@aurora/horizon-web';

const order = ref('push') as Ref<'original' | 'push' | 'unshift'>; 

const data = ref([]) as Ref<TransferDataProps[]>;
for (let i = 1; i <= 5; i++) {
  data.value.push({
    key: i,
    label: `选项名称 ${i}`,
  });
}
const dataModel = ref([]);
</script>

<style scoped></style>
