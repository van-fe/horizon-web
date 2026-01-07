<script setup lang="ts">
import { $confirm, $alert } from '@aurora/horizon-web';
import { ref } from 'vue';

const method = ref('$alert');
const onClick = async () => {
  if (method.value === '$alert') return $alert({ content: 'Hello World' });

  $confirm({ content: 'Hello World' });
};
</script>
<template>
  <h-space block direction="vertical">
    <h-space>
      <div>方法</div>
      <h-radio-group v-model="method">
        <h-radio value="$alert">$alert</h-radio>
        <h-radio value="$confirm">$confirm</h-radio>
      </h-radio-group>
    </h-space>

    <h-button @click="onClick">Click</h-button>
  </h-space>
</template>
