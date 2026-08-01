<script lang="ts" setup>
import { ref } from 'vue';
import { $message } from '@aurora/horizon-web';

const debounceType = ref('disabled');

const saveData = () => {
  console.info('clicked!');
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
    <h-radio-group v-model="debounceType" size="small">
      <h-radio value="disabled">disabled</h-radio>
      <h-radio value="loading">loading</h-radio>
      <h-radio value="none">none</h-radio>
    </h-radio-group>
  </div>
  <h-button :debounce-fn="saveData" :debounce-type="debounceType">防抖按钮</h-button>
  <h-button @click="saveData">普通按钮</h-button>
</template>

<style scoped>
.h-button + .h-button {
  margin-left: 10px;
}
</style>
