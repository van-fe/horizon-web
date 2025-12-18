<template>
  <n-form label-position="left" label-vertical-align="middle">
    <n-form-item label="hide on single page">
      <n-radio-group v-model="hideOnSinglePage">
        <n-radio :label="true">true</n-radio>
        <n-radio :label="false">false</n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="total">
      <n-input-number v-model="total" :min="0" :step="10" :enable-lang-press="true" style="max-width: 150px" />
    </n-form-item>
  </n-form>
  <n-pagination :total="total" :hide-on-single-page="hideOnSinglePage" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const hideOnSinglePage = ref(false);
const total = ref(10);
</script>
