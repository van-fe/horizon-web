<script setup lang="ts">
import { ref } from 'vue';
import { $confirm } from '@aurora/horizon-web';

const enabled = ref(false);
const status = ref('生产环境发布保护已开启');

const beforeChange = async (next: boolean) => {
  try {
    const close = await $confirm(
      next ? '关闭发布保护后，成员可以直接发布。是否继续？' : '重新开启发布保护？',
      '确认设置',
    );
    close();
    status.value = next ? '发布保护已关闭' : '发布保护已开启';
    return true;
  } catch {
    status.value = '已取消，本次设置未变更';
    return false;
  }
};
</script>

<template>
  <div class="docs-demo">
    <div class="switch-stage">
      <h-switch v-model="enabled" label="允许直接发布" :before-change="beforeChange" status />
    </div>
    <p class="docs-demo__status" role="status">{{ status }}</p>
  </div>
</template>

<style scoped>
.switch-stage {
  display: flex;
  align-items: center;
  min-height: 48px;
}
</style>
