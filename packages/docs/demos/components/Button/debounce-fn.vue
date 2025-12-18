<script lang="ts" setup>
import { ref } from 'vue';
import { $message } from '@aurora/horizon-web';

const debounceType = ref('disabled');

const saveData = () => {
  console.log('clicked!');
  return new Promise(resolve => {
    setTimeout(() => {
      $message.success('保存成功！');
      resolve(null);
    }, 2000);
  });
};
</script>

<template>
  <div class="flex mb-4">
    <span class="mr-2">debounce-type:</span>
    <n-radio-group v-model="debounceType" size="small">
      <n-radio label="disabled">disabled</n-radio>
      <n-radio label="loading">loading</n-radio>
      <n-radio label="none">none</n-radio>
    </n-radio-group>
  </div>
  <n-button :debounce-fn="saveData" :debounce-type="debounceType">防抖按钮</n-button>
  <n-button @click="saveData">普通按钮</n-button>
</template>

<style scoped>
.n-button + .n-button {
  margin-left: 10px;
}
</style>
