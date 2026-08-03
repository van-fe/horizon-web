<script setup lang="ts">
import { ref } from 'vue';

interface DropdownExpose {
  handleOpen: () => void;
  handleClose: () => void;
}

const dropdown = ref<DropdownExpose | null>(null);
const visible = ref(false);
const selected = ref('两个菜单由同一个开关控制');

const toggle = () => {
  if (visible.value) dropdown.value?.handleClose();
  else dropdown.value?.handleOpen();
  visible.value = !visible.value;
};
</script>

<template>
  <div class="dropdown-manual-demo">
    <h-space wrap>
      <h-button @click="toggle">{{ visible ? '收起菜单' : '展开菜单' }}</h-button>

      <h-dropdown
        ref="dropdown"
        trigger="manual"
        :exclusive="false"
        @command="selected = `实例方法：${$event}`"
      >
        <h-button type="normal">实例方法</h-button>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-item command="复制链接">复制链接</h-dropdown-item>
            <h-dropdown-item command="生成快照">生成快照</h-dropdown-item>
          </h-dropdown-menu>
        </template>
      </h-dropdown>

      <h-dropdown
        trigger="manual"
        :visible="visible"
        :exclusive="false"
        @command="selected = `visible 属性：${$event}`"
      >
        <h-button type="normal">visible 属性</h-button>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-item command="标记已读">标记已读</h-dropdown-item>
            <h-dropdown-item command="稍后处理">稍后处理</h-dropdown-item>
          </h-dropdown-menu>
        </template>
      </h-dropdown>
    </h-space>
    <p role="status">{{ selected }}</p>
  </div>
</template>

<style scoped>
.dropdown-manual-demo {
  display: grid;
  justify-items: start;
  gap: 12px;
}

p {
  margin: 0;
  color: var(--h-text-secondary);
  font-size: 13px;
}

@media (max-width: 390px) {
  .dropdown-manual-demo {
    gap: 10px;
  }
}
</style>
