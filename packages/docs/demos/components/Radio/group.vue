<template>
  <h-grid :gap="12">
    <h-grid-item :span="24">
      <div class="demo-title">medium(default)</div>
      <h-radio-group v-model="modelValue" size="medium">
        <h-radio-button
          v-for="(item, index) in radioGroupOptions"
          :key="index"
          :value="item.label"
        />
      </h-radio-group>
    </h-grid-item>

    <h-grid-item :span="24">
      <div class="demo-title">large</div>
      <h-radio-group v-model="modelValue" size="large" :disabled="true">
        <h-radio-button
          v-for="(item, index) in radioGroupOptions"
          :key="index"
          :value="item.label"
        />
      </h-radio-group>
    </h-grid-item>
  </h-grid>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const modelValue = ref<string>('Shanghai');

const radioGroupOptions = ref([
  {
    label: 'Shanghai',
  },
  {
    label: 'Beijing',
  },
  {
    label: 'Guangzhou',
  },
  {
    label: 'Shenzhen',
  },
]);
</script>

<style scoped>
</style>
