<script setup lang="ts">
import { IconEdit, IconRubbish } from '@nio-fe/icon';
import { $message } from '@nio-fe/lego';
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
  <n-form label-position="left" label-vertical-align="middle" label-width="120px">
    <n-form-item label="edit access">
      <n-switch v-model="editAccess" />
    </n-form-item>
    <n-form-item label="delete access">
      <n-switch v-model="deleteAccess" />
    </n-form-item>
  </n-form>

  <n-hover v-slot="{ hover }">
    <div class="square">
      Mouse move here
      <n-mask :absolute="true" :value="hover" :content-full-size="true">
        <n-controls theme="light" :access-list="accessList" @command="onCommand">
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
}
</style>
