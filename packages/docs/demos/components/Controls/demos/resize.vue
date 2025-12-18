<script setup lang="ts">
import { IconEdit, IconEye, IconRubbish } from '@aurora/icon';
import { $message } from '@aurora/horizon-web';
import { ref } from 'vue';

const size = ref(150);

function onCommand(type: 'edit' | 'del' | 'view') {
  switch (type) {
    case 'view':
      $message.success('查看');
      break;
    case 'edit':
      $message.info('编辑');
      break;
    case 'del':
      $message.error('删除');
      break;
  }
}
</script>

<template>
  <n-form label-position="left" label-vertical-align="middle" label-width="120px">
    <n-form-item label="size">
      <n-radio-group v-model="size">
        <n-radio :label="60">60px</n-radio>
        <n-radio :label="100">100px</n-radio>
        <n-radio :label="150">150px</n-radio>
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-hover v-slot="{ hover }">
    <div class="square" :style="{width: size + 'px', height: size + 'px'}">
      Mouse move here
      <n-mask :absolute="true" :value="hover" :content-full-size="true">
        <n-controls theme="light" @command="onCommand">
          <n-control :icon="IconEye" text="查看" label="view" />
          <n-control :icon="IconEdit" text="编辑" label="edit" />
          <n-control :icon="IconRubbish" text="删除" label="del" />
        </n-controls>
      </n-mask>
    </div>
  </n-hover>
</template>

<style scoped>
.square {
  position: relative;
  width: 150px;
  height: 150px;
  border: 1px solid var(--n-border-default);
  border-radius: var(--n-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--n-text-secondary);
  text-align: center;
}
</style>
