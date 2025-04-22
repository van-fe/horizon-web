<template>
  <div class="grid">
    <div>
      <n-radio :disabled="true" :value="1">禁用</n-radio>
    </div>
    <div>
      <n-radio v-model="modelValue1" :disabled="true" :value="2">已选禁用</n-radio>
    </div>
    <div>
      <n-radio v-model="modelValue2" :value="3">非禁用</n-radio>
    </div>
    <div>
      <n-radio :disabled="true" :value="1" :border="true">禁用</n-radio>
    </div>
    <div>
      <n-radio v-model="modelValue1" :disabled="true" :value="2" :border="true">已选禁用</n-radio>
    </div>
    <div>
      <n-radio v-model="modelValue2" :value="3" :border="true">非禁用</n-radio>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const modelValue1 = ref(2);
const modelValue2 = ref(true);
</script>

<style scoped>
.grid {
  max-width: 500px;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-area: 40;
}

.grid > div {
  min-height: 40px;
  display: flex;
  align-items: center;
}
</style>
