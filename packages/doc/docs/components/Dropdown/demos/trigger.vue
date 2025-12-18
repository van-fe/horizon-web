<template>
  <n-row>
    <n-col :span="24">
      <n-dropdown popper-width="108" @visible-change="v => (visible1 = v)">
        <n-button>
          Hover(default)
          <template #suffix>
            <IconArrowDown size="14" :rotate="visible1 ? 180 : 0" class="dropdown-icon" />
          </template>
        </n-button>
        <template #dropdown>
          <n-dropdown-menu>
            <n-dropdown-item>北京</n-dropdown-item>
            <n-dropdown-item>上海</n-dropdown-item>
            <n-dropdown-item>深圳</n-dropdown-item>
            <n-dropdown-item>杭州</n-dropdown-item>
            <n-dropdown-item>重庆</n-dropdown-item>
          </n-dropdown-menu>
        </template>
      </n-dropdown>
      <n-dropdown
        trigger="click"
        :popover-options="{ sameWidth: true }"
        @visible-change="v => (visible2 = v)"
      >
        <n-button>
          Click
          <template #suffix>
            <IconArrowDown size="14" :rotate="visible2 ? 180 : 0" class="dropdown-icon" />
          </template>
        </n-button>
        <template #dropdown>
          <n-dropdown-menu>
            <n-dropdown-item>北京</n-dropdown-item>
            <n-dropdown-item>上海</n-dropdown-item>
            <n-dropdown-item>深圳</n-dropdown-item>
            <n-dropdown-item>杭州</n-dropdown-item>
            <n-dropdown-item>重庆</n-dropdown-item>
          </n-dropdown-menu>
        </template>
      </n-dropdown>
      <n-dropdown trigger="context-menu" popper-width="108" @command="onCommand">
        <div class="context-menu-area">context-menu</div>
        <template #dropdown>
          <n-dropdown-menu>
            <n-dropdown-item command="1">北京</n-dropdown-item>
            <n-dropdown-item command="2">上海</n-dropdown-item>
            <n-dropdown-item command="3">深圳</n-dropdown-item>
            <n-dropdown-item command="4">杭州</n-dropdown-item>
            <n-dropdown-item command="5">重庆</n-dropdown-item>
          </n-dropdown-menu>
        </template>
      </n-dropdown>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { $message } from '@nio-fe/lego';
import { IconArrowDown } from '@nio-fe/icon';

const visible1 = ref(false);
const visible2 = ref(false);

function onCommand(val: unknown) {
  $message.info(val as string);
}
</script>

<style scoped>
.n-dropdown {
  display: inline-flex;
  vertical-align: top;

  :deep(.n-button__suffix) {
    display: inline-flex;
    align-items: center;
  }
}

.n-dropdown + .n-dropdown {
  margin-left: 12px;
}

.dropdown-icon {
  transition: transform .2s;
  margin-left: 6px;
}

.context-menu-area {
  width: 300px;
  height: 200px;
  background: var(--n-bg-info-weak-default);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
