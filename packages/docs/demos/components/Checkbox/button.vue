<template>
  <h-row align="middle">
    <h-col :span="6">
      <div class="demo-title">medium(default)</div>
    </h-col>
    <h-col :span="18">
      <h-checkbox-button
        v-for="item in checkBoxOptions"
        :key="item.key"
        v-model="item.checked"
        class="checkbox"
        :label="item.label"
      />
    </h-col>
  </h-row>
  <h-row align="middle">
    <h-col :span="6">
      <div class="demo-title">large</div>
    </h-col>
    <h-col :span="18">
      <h-checkbox-button
        v-for="item in checkBoxOptions"
        :key="item.key"
        v-model="item.checked"
        :label="item.label"
        class="checkbox"
        size="large"
      />
    </h-col>
  </h-row>
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
