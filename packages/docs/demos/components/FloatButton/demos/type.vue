<template>
  <h-form label-position="left" label-vertical-align="middle" label-width="80px" style="width: 400px">
    <h-form-item label="是否显示">
      <h-switch v-model="visible" :status="true" status-on-text="显示" status-off-text="隐藏" />
    </h-form-item>
    <h-form-item label="类型">
      <h-radio-group v-model="type">
        <h-radio label="normal"></h-radio>
        <h-radio label="primary"></h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-float-button :visible="visible" icon="filter" :type="type" />
  <h-float-button :visible="visible" description="按钮" :type="type" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(true);
const type = ref('primary');

</script>

<style scoped>
</style>
