<script setup lang="ts">
import { IconEdit, IconRubbish } from '@aurora/icon';
import { $message } from '@aurora/horizon-web';

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
  <h-hover v-slot="{ hover }">
    <div class="square">
      Mouse move here
      <h-mask :absolute="true" :value="hover" :content-full-size="true">
        <h-controls theme="light" @command="onCommand">
          <h-control label="edit" :icon="IconEdit" text="编辑" />
          <h-control label="del" :icon="IconRubbish" text="删除" />
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
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius);
  display: flex;
  aligh-items: center;
  justify-content: center;
  color: var(--h-text-secondary);
}
</style>
