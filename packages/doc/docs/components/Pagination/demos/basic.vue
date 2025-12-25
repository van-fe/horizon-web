<template>
  <n-form label-position="left" label-vertical-align="middle">
    <n-form-item label="align">
      <n-radio-group v-model="align">
        <n-radio label="left">left</n-radio>
        <n-radio label="center">center</n-radio>
        <n-radio label="right">right</n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="size">
      <n-radio-group v-model="size">
        <n-radio label="medium" />
        <n-radio label="large" />
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-row :gutter="10" align="middle">
    <n-col :span="6">
      <div class="demo-title">当你页数不超过7页时</div>
    </n-col>
    <n-col :span="18">
      <n-pagination :total="50" :align="align" :size="size" @modify="onModify" @currentChange="onCurrentChange" @sizeChange="onSizeChange" />
    </n-col>
  </n-row>
  <n-row :gutter="10" align="middle">
    <n-col :span="6">
      <div class="demo-title">当你页数超过7页时</div>
    </n-col>
    <n-col :span="18">
      <n-pagination :total="100" :align="align" :size="size" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const align = ref('right');
const size = ref('medium');

function onCurrentChange(currentPage: number) {
  console.info('current-page: ', currentPage);
}

function onSizeChange(size: number) {
  console.info('size: ', size);
}

function onModify(currentPage: number, pageSize: number) {
  console.info({ currentPage, pageSize });
}
</script>

<style scoped></style>
