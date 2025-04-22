<template>
  <n-form label-position="left" label-vertical-align="middle">
    <n-form-item label="show total">
      <n-radio-group v-model="showTotal">
        <n-radio :label="true">true</n-radio>
        <n-radio :label="false">false</n-radio>
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-pagination :total="100" :show-range="showTotal" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showTotal = ref(true);
</script>
