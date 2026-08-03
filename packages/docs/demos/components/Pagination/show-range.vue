<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="show total">
      <h-radio-group v-model="showTotal">
        <h-radio :value="true">true</h-radio>
        <h-radio :value="false">false</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-pagination :total="100" :show-range="showTotal" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showTotal = ref(true);
</script>
