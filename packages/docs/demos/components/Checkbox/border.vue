<template>
  <h-row align="middle">
    <h-col :span="6">
      <div class="demo-title">medium(default)</div>
    </h-col>
    <h-col :span="18">
      <h-checkbox
        v-for="item in checkboxOptions"
        :key="item.key"
        v-model="item.checked"
        :label="item.label"
        :border="true"
        class="checkbox"
        @change="selectCheckbox"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">large</div>
    </h-col>
    <h-col :span="18">
      <h-checkbox
        v-for="item in checkboxOptions"
        :key="item.key"
        v-model="item.checked"
        :label="item.label"
        :border="true"
        class="checkbox"
        size="large"
        @change="selectCheckbox"
      />
    </h-col>
  </h-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const checkboxOptions = ref([
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

const selectCheckbox = (val: boolean) => {
  console.info('selectCheckbox ==> ', val);
};
</script>

<style scoped>
.checkbox + .checkbox {
  margin-left: 12px;
}
</style>
