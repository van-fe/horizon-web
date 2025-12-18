<template>
  <n-form label-position="left" label-vertical-align="middle" label-width="80px" style="width: 400px">
    <n-form-item label="是否显示">
      <n-switch v-model="visible" :status="true" status-on-text="显示" status-off-text="隐藏" />
    </n-form-item>
    <n-form-item label="类型">
      <n-radio-group v-model="type">
        <n-radio label="normal"></n-radio>
        <n-radio label="primary"></n-radio>
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-float-button :visible="visible" icon="filter" :type="type" />
  <n-float-button :visible="visible" description="按钮" :type="type" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(true);
const type = ref('primary');

</script>

<style scoped>
</style>
