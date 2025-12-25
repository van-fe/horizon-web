<template>
  <n-row>
    <n-col :span="24">
      <n-checkbox
        v-for="item in checkboxOptions"
        :key="item.key"
        v-model="item.checked"
        :label="item.label"
        class="checkbox"
        @change="selectCheckbox"
      />
    </n-col>
  </n-row>
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
  margin-left: 15px;
}
</style>
