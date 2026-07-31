<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="align">
      <h-radio-group v-model="align">
        <h-radio label="left">left</h-radio>
        <h-radio label="center">center</h-radio>
        <h-radio label="right">right</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-grid :gap="10" align="center">
    <h-grid-item :span="6">
      <div class="demo-title">当你页数不超过7页时</div>
    </h-grid-item>
    <h-grid-item :span="18">
      <h-pagination :total="50" :align="align" @modify="onModify" @currentChange="onCurrentChange" @sizeChange="onSizeChange" />
    </h-grid-item>
  </h-grid>
  <h-grid :gap="10" align="center">
    <h-grid-item :span="6">
      <div class="demo-title">当你页数超过7页时</div>
    </h-grid-item>
    <h-grid-item :span="18">
      <h-pagination :total="100" :align="align" />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const align = ref('right');

function onCurrentChange(currentPage: number) {
  console.info('current-page: ', currentPage);
}

function onSizeChange(size: number) {
  console.info('size: ', size);
}

function onModify(currentPage: number, pageSize: number) {
  console.info({currentPage, pageSize});
}
</script>

<style scoped>
</style>
