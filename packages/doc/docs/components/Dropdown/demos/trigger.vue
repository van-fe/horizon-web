<template>
  <h-row>
    <h-col :span="24">
      <h-dropdown popper-width="108" @visible-change="v => (visible1 = v)">
        <h-button>
          Hover(default)
          <template #suffix>
            <IconArrowDown size="14" :rotate="visible1 ? 180 : 0" class="dropdowh-icon" />
          </template>
        </h-button>
        <template #dropdown>
          <h-dropdowh-menu>
            <h-dropdowh-item>北京</h-dropdowh-item>
            <h-dropdowh-item>上海</h-dropdowh-item>
            <h-dropdowh-item>深圳</h-dropdowh-item>
            <h-dropdowh-item>杭州</h-dropdowh-item>
            <h-dropdowh-item>重庆</h-dropdowh-item>
          </h-dropdowh-menu>
        </template>
      </h-dropdown>
      <h-dropdown
        trigger="click"
        :popover-options="{ sameWidth: true }"
        @visible-change="v => (visible2 = v)"
      >
        <h-button>
          Click
          <template #suffix>
            <IconArrowDown size="14" :rotate="visible2 ? 180 : 0" class="dropdowh-icon" />
          </template>
        </h-button>
        <template #dropdown>
          <h-dropdowh-menu>
            <h-dropdowh-item>北京</h-dropdowh-item>
            <h-dropdowh-item>上海</h-dropdowh-item>
            <h-dropdowh-item>深圳</h-dropdowh-item>
            <h-dropdowh-item>杭州</h-dropdowh-item>
            <h-dropdowh-item>重庆</h-dropdowh-item>
          </h-dropdowh-menu>
        </template>
      </h-dropdown>
      <h-dropdown trigger="context-menu" popper-width="108" @command="onCommand">
        <div class="context-menu-area">context-menu</div>
        <template #dropdown>
          <h-dropdowh-menu>
            <h-dropdowh-item command="1">北京</h-dropdowh-item>
            <h-dropdowh-item command="2">上海</h-dropdowh-item>
            <h-dropdowh-item command="3">深圳</h-dropdowh-item>
            <h-dropdowh-item command="4">杭州</h-dropdowh-item>
            <h-dropdowh-item command="5">重庆</h-dropdowh-item>
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
const visible2 = ref(false);

function onCommand(val: unknown) {
  $message.info(val as string);
}
</script>

<style scoped>
.h-dropdown {
  display: inline-flex;
  vertical-align: top;

  :deep(.h-button__suffix) {
    display: inline-flex;
    aligh-items: center;
  }
}

.h-dropdown + .h-dropdown {
  margih-left: 12px;
}

.dropdowh-icon {
  transition: transform .2s;
  margih-left: 6px;
}

.context-menu-area {
  width: 300px;
  height: 200px;
  background: var(--h-bg-info-weak-default);
  border-radius: 4px;
  display: flex;
  aligh-items: center;
  justify-content: center;
}
</style>
