<template>
  <n-row>
    <n-col :span="24">
      <n-dropdown
        :popover-options="{ sameWidth: true }"
        @command="onCommand"
        @visible-change="v => (visible1 = v)"
      >
        <n-button>
          Hover
          <template #suffix>
            <IconArrowDown size="14" :rotate="visible1 ? 180 : 0" class="dropdown-icon" />
          </template>
        </n-button>
        <template #dropdown>
          <n-dropdown-menu>
            <n-dropdown-item command="北京">北京</n-dropdown-item>
            <n-dropdown-item @click="onCommand('上海')">上海</n-dropdown-item>
            <n-dropdown-item command="深圳">深圳</n-dropdown-item>
            <n-dropdown-item command="杭州" :disabled="true">杭州</n-dropdown-item>
            <n-dropdown-item @click="onCommand('重庆')">重庆</n-dropdown-item>
          </n-dropdown-menu>
        </template>
      </n-dropdown>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { $message } from '@aurora/horizon-web';
import { IconArrowDown } from '@aurora/icon';

const visible1 = ref(false);

function onCommand(value: string) {
  $message.info(`点击了 ${value}`);
}
</script>

<style scoped>
.n-dropdown {
  display: inline-flex;


  :deep(.n-button__suffix) {
    display: inline-flex;
    align-items: center;
  }
}

.dropdown-icon {
  transition: transform .2s;
  margin-left: 6px;
}
</style>