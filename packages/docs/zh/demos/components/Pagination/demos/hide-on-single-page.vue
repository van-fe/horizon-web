<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="hide on single page">
      <h-radio-group v-model="hideOnSinglePage">
        <h-radio :label="true">true</h-radio>
        <h-radio :label="false">false</h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="total">
      <h-input-number v-model="total" :min="0" :step="10" :enable-lang-press="true" style="max-width: 150px" />
    </h-form-item>
  </h-form>
  <h-pagination :total="total" :hide-on-single-page="hideOnSinglePage" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const hideOnSinglePage = ref(false);
const total = ref(10);
</script>
