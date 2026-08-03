<template>
  <h-grid align="center" :gap="12">
    <h-grid-item :span="6">
      <div class="demo-title">medium(default)</div>
    </h-grid-item>
    <h-grid-item :span="18">
      <h-checkbox-button
        v-for="item in checkBoxOptions"
        :key="item.key"
        v-model="item.checked"
        class="checkbox"
        :label="item.label"
      />
    </h-grid-item>
  </h-grid>
  <h-grid align="center" :gap="12">
    <h-grid-item :span="6">
      <div class="demo-title">large</div>
    </h-grid-item>
    <h-grid-item :span="18">
      <h-checkbox-button
        v-for="item in checkBoxOptions"
        :key="item.key"
        v-model="item.checked"
        :label="item.label"
        class="checkbox"
        size="large"
      />
    </h-grid-item>
  </h-grid>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const checkBoxOptions = ref([
  {
    key: 1,
    label: 'checked',
    checked: true,
  },
  {
    key: 2,
    label: 'unchecked',
    checked: false,
  },
]);
</script>
