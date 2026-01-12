<template>
  <h-row>
    <h-col :span="8">
      <div class="demo-title">medium(default)</div>
      <h-checkbox-button
        v-for="item in checkBoxOptions"
        :key="item.key"
        v-model="item.checked"
        class="checkbox"
        :label="item.label"
      />
    </h-col>

    <h-col :span="8">
      <div class="demo-title">large</div>
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

<style scoped>
.checkbox + .checkbox {
  margin-left: 12px;
}
</style>
