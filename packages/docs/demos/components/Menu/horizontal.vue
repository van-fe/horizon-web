<script setup lang="ts">
import { ref } from 'vue';

const selectedValue = ref('home');

const pages: Record<string, string> = {
  home: '首页',
  dashboard: '数据看板',
  realtime: '实时监控',
  reports: '分析报告',
  members: '成员管理',
  roles: '角色权限',
  settings: '系统设置',
};

const select = (value: string) => {
  selectedValue.value = value;
};
</script>

<template>
  <div class="docs-demo">
    <div class="horizontal-shell">
      <div class="horizontal-scroll">
        <h-menu
          mode="horizontal"
          :selected-value="selectedValue"
          max-width="980px"
          @selected="select"
        >
          <template #prepend>
            <div class="horizontal-brand">
              <span>H</span>
              <strong>Horizon</strong>
            </div>
          </template>
          <h-menu-item value="home">首页</h-menu-item>
          <h-sub-menu value="analytics">
            <template #title>数据中心</template>
            <h-menu-item value="dashboard">数据看板</h-menu-item>
            <h-sub-menu value="monitoring">
              <template #title>监控分析</template>
              <h-menu-item value="realtime">实时监控</h-menu-item>
              <h-menu-item value="reports">分析报告</h-menu-item>
            </h-sub-menu>
          </h-sub-menu>
          <h-sub-menu value="team">
            <template #title>团队</template>
            <h-menu-item value="members">成员管理</h-menu-item>
            <h-menu-item value="roles">角色权限</h-menu-item>
          </h-sub-menu>
          <h-menu-item value="settings">系统设置</h-menu-item>
        </h-menu>
      </div>
    </div>
    <p class="docs-demo__status" role="status">当前页面：{{ pages[selectedValue] }}</p>
  </div>
</template>

<style scoped>
.horizontal-shell {
  overflow: hidden;
  border: 1px solid var(--h-border-default);
  border-radius: 12px;
}

.horizontal-scroll {
  overflow-x: auto;
  overscroll-behavior-inline: contain;
}

.horizontal-scroll :deep(.h-menu) {
  min-width: 720px;
}

.horizontal-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 16px;
}

.horizontal-brand span {
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border-radius: 8px;
  color: var(--h-text-inverse);
  background: var(--h-bg-brand-default);
  font-weight: var(--h-weight-strong);
}
</style>
