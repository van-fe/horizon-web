<template>
  <n-form label-position="left" label-width="fit-content">
    <n-form-item label="排序策略">
      <n-radio-group v-model="order">
        <n-radio label="push" />
        <n-radio label="original" />
        <n-radio label="unshift" />
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-transfer-v-2
    v-model="dataModel"
    :data="data"
    :target-order="order"
    show-control
    style="width: 592px"
  />
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import type { TransferDataProps } from '@nio-fe/lego';

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
