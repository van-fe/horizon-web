<script setup lang="ts">
import { ref } from 'vue';

const selected = ref('请选择目标空间');
</script>

<template>
  <div class="dropdown-group-demo">
    <h-dropdown @command="selected = `已移动到：${$event}`">
      <h-button>移动到</h-button>
      <template #dropdown>
        <h-dropdown-menu>
          <h-dropdown-group>
            <template #title>团队空间</template>
            <h-dropdown-item command="产品团队 / 路线图">路线图</h-dropdown-item>
            <h-dropdown-item command="研发团队 / 发布记录">发布记录</h-dropdown-item>
          </h-dropdown-group>
          <h-dropdown-item command="个人草稿">个人草稿</h-dropdown-item>
        </h-dropdown-menu>
      </template>
    </h-dropdown>
    <p role="status">{{ selected }}</p>
  </div>
</template>

<style scoped>
.dropdown-group-demo {
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
  .dropdown-group-demo {
    gap: 10px;
  }
}
</style>
