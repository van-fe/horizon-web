<script setup lang="ts">
import { ref } from 'vue';

const collapse = ref(false);
const selectedValue = ref('overview');

const labels: Record<string, string> = {
  overview: '项目概览',
  releases: '发布记录',
  components: '组件列表',
  tokens: '设计变量',
  members: '团队成员',
  permissions: '权限设置',
};

const select = (value: string) => {
  selectedValue.value = value;
};
</script>

<template>
  <div class="docs-demo">
    <h-container class="menu-frame">
      <h-aside width="auto">
        <h-menu
          v-model:collapse="collapse"
          collapse-button
          :selected-value="selectedValue"
          :exclusive-expand="false"
          height="390px"
          @selected="select"
        >
          <template #prepend="isCollapse">
            <div class="menu-brand">
              <span>H</span>
              <h-transition name="collapse-horizontal">
                <strong v-show="!isCollapse.value">Horizon</strong>
              </h-transition>
            </div>
          </template>
          <h-menu-item value="overview" icon="material">项目概览</h-menu-item>
          <h-sub-menu value="workspace" icon="matestore_filled">
            <template #title>研发工作区</template>
            <h-menu-item value="releases">发布记录</h-menu-item>
            <h-sub-menu value="assets">
              <template #title>设计资产</template>
              <h-menu-item value="components">组件列表</h-menu-item>
              <h-menu-item value="tokens">设计变量</h-menu-item>
            </h-sub-menu>
          </h-sub-menu>
          <h-sub-menu value="team" icon="friend">
            <template #title>团队管理</template>
            <h-menu-item value="members">团队成员</h-menu-item>
            <h-menu-item value="permissions">权限设置</h-menu-item>
          </h-sub-menu>
          <h-menu-item value="archive" icon="table_folder" disabled>归档空间</h-menu-item>
        </h-menu>
      </h-aside>
      <h-main class="menu-preview">
        <strong>{{ labels[selectedValue] ?? '项目概览' }}</strong>
      </h-main>
    </h-container>
    <p class="docs-demo__status" role="status">当前页面：{{ labels[selectedValue] }}</p>
  </div>
</template>

<style scoped>
.menu-frame {
  height: 390px;
  overflow: hidden;
  border: 1px solid var(--h-border-default);
  border-radius: 12px;
  background: var(--h-bg-default);
}

.menu-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 48px;
  padding: 0 14px;
  color: currentColor;
}

.menu-brand span {
  display: grid;
  width: 28px;
  height: 28px;
  flex: 0 0 28px;
  place-items: center;
  border-radius: 8px;
  color: var(--h-text-inverse);
  background: var(--h-bg-brand-default);
  font-weight: var(--h-weight-strong);
}

.menu-preview {
  display: grid;
  min-width: 0;
  place-content: center;
  padding: 24px;
  background: var(--h-bg-secondary);
}

.menu-preview strong {
  color: var(--h-text-primary);
  font-size: 18px;
}
</style>
