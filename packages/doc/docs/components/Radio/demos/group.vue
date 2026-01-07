<template>
  <h-row>
    <h-col :span="24">
      <div class="demo-title">medium(default)</div>
      <h-radio-group v-model="modelValue" size="medium">
        <h-radio-button
          v-for="(item, index) in radioGroupOptions"
          :key="index"
          :value="item.label"
        />
      </h-radio-group>
    </h-col>

    <h-col :span="24">
      <div class="demo-title">large</div>
      <h-radio-group v-model="modelValue" size="large" :disabled="true">
        <h-radio-button
          v-for="(item, index) in radioGroupOptions"
          :key="index"
          :value="item.label"
        />
      </h-radio-group>
    </h-col>
  </h-row>
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
