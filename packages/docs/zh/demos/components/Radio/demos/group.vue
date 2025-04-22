<template>
  <n-row>
    <n-col :span="24">
      <div class="demo-title">medium(default)</div>
      <n-radio-group v-model="modelValue" size="medium">
        <n-radio-button
          v-for="(item, index) in radioGroupOptions"
          :key="index"
          :value="item.label"
        />
      </n-radio-group>
    </n-col>

    <n-col :span="24">
      <div class="demo-title">large</div>
      <n-radio-group v-model="modelValue" size="large" :disabled="true">
        <n-radio-button
          v-for="(item, index) in radioGroupOptions"
          :key="index"
          :value="item.label"
        />
      </n-radio-group>
    </n-col>
  </n-row>
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
