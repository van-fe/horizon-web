<script setup lang="ts">
import { IconEdit, IconRubbish } from '@aurora/icon';
import { $message } from '@aurora/horizon-web';
import { ref } from 'vue';

const disabled = ref(true);

function onCommand(type: 'edit' | 'del') {
  switch (type) {
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
    <n-form-item label="disabled">
      <n-switch v-model="disabled" />
    </n-form-item>
  </n-form>

  <n-hover v-slot="{ hover }">
    <div class="square">
      Mouse move here
      <n-mask :absolute="true" :value="hover" :content-full-size="true">
        <n-controls theme="light" :disabled="disabled" @command="onCommand">
          <n-control label="edit" :icon="IconEdit" text="编辑" />
          <n-control label="del" :icon="IconRubbish" text="删除" />
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
}
</style>
