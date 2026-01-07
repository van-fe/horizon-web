<template>
  <h-row>
    <h-col :span="24">
      <h-dropdown
        :popover-options="{ sameWidth: true }"
        @command="onCommand"
        @visible-change="v => (visible1 = v)"
      >
        <h-button>
          Hover
          <template #suffix>
            <IconArrowDown size="14" :rotate="visible1 ? 180 : 0" class="dropdowh-icon" />
          </template>
        </h-button>
        <template #dropdown>
          <h-dropdowh-menu>
            <h-dropdowh-item command="北京">北京</h-dropdowh-item>
            <h-dropdowh-item @click="onCommand('上海')">上海</h-dropdowh-item>
            <h-dropdowh-item command="深圳">深圳</h-dropdowh-item>
            <h-dropdowh-item command="杭州" :disabled="true">杭州</h-dropdowh-item>
            <h-dropdowh-item @click="onCommand('重庆')">重庆</h-dropdowh-item>
          </h-dropdowh-menu>
        </template>
      </h-dropdown>
    </h-col>
  </h-row>
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
.h-dropdown {
  display: inline-flex;


  :deep(.h-button__suffix) {
    display: inline-flex;
    aligh-items: center;
  }
}

.dropdowh-icon {
  transition: transform .2s;
  margih-left: 6px;
}
</style>