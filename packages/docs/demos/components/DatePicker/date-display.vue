<template>
  <h-grid :gap="12">
    <h-grid-item :span="6">
      <h-date-picker v-model="value" type="date" placeholder="default" />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="value2" type="date" :show-before-after-date="true" placeholder="show before after date" />
    </h-grid-item>
    <h-grid-item :span="6">
      <h-date-picker v-model="value3" type="date" :show-before-after-date="true" :fixed-six-rows="true" placeholder="fixed six rows" />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref();
const value2 = ref();
const value3 = ref();
</script>
