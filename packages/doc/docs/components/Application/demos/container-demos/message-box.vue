<script setup lang="ts">
import { $confirm, $alert } from '@nio-fe/lego';
import { ref } from 'vue';

const method = ref('$alert');
const onClick = async () => {
  if (method.value === '$alert') return $alert({ content: 'Hello World' });

  $confirm({ content: 'Hello World' });
};
</script>
<template>
  <n-space block direction="vertical">
    <n-space>
      <div>方法</div>
      <n-radio-group v-model="method">
        <n-radio value="$alert">$alert</n-radio>
        <n-radio value="$confirm">$confirm</n-radio>
      </n-radio-group>
    </n-space>

    <n-button @click="onClick">Click</n-button>
  </n-space>
</template>
