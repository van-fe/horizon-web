<script setup lang="ts">
import { IconEdit, IconRubbish } from '@aurora/icon';
import { $message } from '@aurora/horizon-web';
import { computed, ref } from 'vue';

const editAccess = ref(true);
const deleteAccess = ref(false);

const accessList = computed(() => {
  const temp: string[] = [];

  editAccess.value && (temp.push('edit'));
  deleteAccess.value && (temp.push('del'));

  return temp;
});

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
  <h-form label-position="left" label-vertical-align="middle" label-width="120px">
    <h-form-item label="edit access">
      <h-switch v-model="editAccess" />
    </h-form-item>
    <h-form-item label="delete access">
      <h-switch v-model="deleteAccess" />
    </h-form-item>
  </h-form>

  <h-hover v-slot="{ hover }">
    <div class="square">
      Mouse move here
      <h-mask :absolute="true" :value="hover" :content-full-size="true">
        <h-controls theme="light" :access-list="accessList" @command="onCommand">
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
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius);
  display: flex;
  aligh-items: center;
  justify-content: center;
  color: var(--h-text-secondary);
}
</style>
