<template>
  <div class="grid">
    <div>
      <h-checkbox :model-value="false" :disabled="true">禁用</h-checkbox>
    </div>
    <div>
      <h-checkbox :model-value="false" indeterminate :disabled="true">半选禁用</h-checkbox>
    </div>
    <div>
      <h-checkbox v-model="modelValue1" :disabled="true">已选禁用</h-checkbox>
    </div>
    <div>
      <h-checkbox v-model="modelValue2">非禁用</h-checkbox>
    </div>
    <div>
      <h-checkbox :model-value="false" :disabled="true" :border="true">禁用</h-checkbox>
    </div>
    <div>
      <h-checkbox :model-value="false" indeterminate :disabled="true" :border="true">半选禁用</h-checkbox>
    </div>
    <div>
      <h-checkbox v-model="modelValue1" :disabled="true" :border="true">已选禁用</h-checkbox>
    </div>
    <div>
      <h-checkbox v-model="modelValue2" :border="true">非禁用</h-checkbox>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const modelValue1 = ref(true);
const modelValue2 = ref(true);
</script>

<style scoped>
.grid {
  display: grid;
  max-width: 600px;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  grid-area: 40;
}

.grid > div {
  min-height: 40px;
  display: flex;
  align-items: center;
}
</style>
