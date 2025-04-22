<template>
  <n-row>
    <n-col :span="24">
      <div class="demo-title">medium(default)</div>
      <n-checkbox-group disabled>
        <n-checkbox-button
          v-for="(item, index) in checkboxGroupOptions"
          :key="index"
          v-model="item.checked"
          :label="item.label"
        />
      </n-checkbox-group>
    </n-col>

    <n-col :span="24">
      <div class="demo-title">large</div>
      <n-checkbox-group size="large">
        <n-checkbox-button
          v-for="(item, index) in checkboxGroupOptions"
          :key="index"
          v-model="item.checked"
          :label="item.label"
        />
      </n-checkbox-group>
    </n-col>
  </n-row>
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
