<template>
  <n-transfer-v-2
    v-model="dataModel"
    :data="data"
    :field-map="{ key: 'code', label: 'displayName' }"
    show-control
    style="width: 592px"
  />
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import type {TransferDataProps } from '@aurora/horizon-web';

const data = ref([
  {
    code: '1',
    displayName: '选项名称 1',
  },
  {
    code: '2',
    displayName: '选项名称 2',
  },
  {
    code: '3',
    displayName: '选项名称 3',
  },
  {
    code: '4',
    displayName: '选项名称 4',
  },
  {
    code: '5',
    displayName: '选项名称 5',
  },
])  as Ref<TransferDataProps[]>;
const dataModel = ref([3]);
</script>

<style scoped></style>
