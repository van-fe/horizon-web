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
  <h-form label-position="left" label-vertical-align="middle" label-width="120px">
    <h-form-item label="size">
      <h-radio-group v-model="size">
        <h-radio :label="60">60px</h-radio>
        <h-radio :label="100">100px</h-radio>
        <h-radio :label="150">150px</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-hover v-slot="{ hover }">
    <div class="square" :style="{width: size + 'px', height: size + 'px'}">
      Mouse move here
      <h-mask :absolute="true" :value="hover" :content-full-size="true">
        <h-controls theme="light" @command="onCommand">
          <h-control :icon="IconEye" text="查看" label="view" />
          <h-control :icon="IconEdit" text="编辑" label="edit" />
          <h-control :icon="IconRubbish" text="删除" label="del" />
        </h-controls>
      </h-mask>
    </div>
  </h-hover>
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
