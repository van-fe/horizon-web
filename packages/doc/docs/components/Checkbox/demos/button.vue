<template>
  <n-row>
    <n-col :span="8">
      <div class="demo-title">medium(default)</div>
      <n-checkbox-button
        v-for="item in checkBoxOptions"
        :key="item.key"
        v-model="item.checked"
        class="checkbox"
        :label="item.label"
      />
    </n-col>

    <n-col :span="8">
      <div class="demo-title">large</div>
      <n-checkbox-button
        v-for="item in checkBoxOptions"
        :key="item.key"
        v-model="item.checked"
        :label="item.label"
        class="checkbox"
        size="large"
      />
    </n-col>
  </n-row>
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

<style scoped>
.checkbox + .checkbox {
  margin-left: 12px;
}
</style>
