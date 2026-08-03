<template>
  <h-grid :gap="12">
    <h-grid-item :span="24">
      <div class="demo-title">medium(default)</div>
      <h-checkbox-group disabled>
        <h-checkbox-button
          v-for="(item, index) in checkboxGroupOptions"
          :key="index"
          v-model="item.checked"
          :label="item.label"
        />
      </h-checkbox-group>
    </h-grid-item>

    <h-grid-item :span="24">
      <div class="demo-title">large</div>
      <h-checkbox-group size="large">
        <h-checkbox-button
          v-for="(item, index) in checkboxGroupOptions"
          :key="index"
          v-model="item.checked"
          :label="item.label"
        />
      </h-checkbox-group>
    </h-grid-item>
  </h-grid>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checkboxGroupOptions = ref([
  {
    label: 'Shanghai',
    checked: true,
  },
  {
    label: 'Beijing',
    checked: false,
  },
  {
    label: 'Guangzhou',
    checked: false,
  },
  {
    label: 'Shenzheng',
    checked: false,
  },
]);
</script>

<style scoped>
</style>
