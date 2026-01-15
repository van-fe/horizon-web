<template>
  <h-row>
    <h-col :span="24">
      <h-checkbox
        v-for="item in checkboxOptions"
        :key="item.key"
        v-model="item.checked"
        :label="item.label"
        class="checkbox"
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

