<script setup lang="ts">
import { IconEdit, IconRubbish } from '@aurora/icon';
import { $message } from '@aurora/horizon-web';
import { ref } from 'vue';

const useTooltip = ref(false);

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
  <div>
    <h-form label-position="left" label-vertical-align="middle" label-width="120px">
      <h-form-item label="use tooltip">
        <h-switch v-model="useTooltip" />
      </h-form-item>
    </h-form>
    <h-hover v-slot="{ hover }">
      <div class="square">
        Mouse move here
        <h-mask :absolute="true" :value="hover" :content-full-size="true">
          <h-controls theme="light" :use-tooltip="useTooltip" @command="onCommand">
            <h-control :icon="IconEdit" text="编辑" label="edit" />
            <h-control :icon="IconRubbish" text="删除" label="del" />
          </h-controls>
        </h-mask>
      </div>
    </h-hover>
  </div>
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
