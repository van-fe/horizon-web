<script setup lang="ts">
import { ref } from 'vue';
import { $confirm } from '@nio-fe/lego';

const modelValue = ref(false);

const onBeforeChange = (newValue: boolean) => {
  return new Promise((resolve, reject) => {
    $confirm(`是否确定改为 ${newValue}?`, '提示').then((close) => {
      resolve(void 0);
      close();
    }).catch(() => {
      reject();
    });
  });
};
</script>

<template>
  <n-switch v-model="modelValue" :before-change="onBeforeChange" />
</template>

<style scoped>

</style>
