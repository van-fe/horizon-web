<script setup lang="ts">
import { ref } from 'vue';

const collapse = ref(false);
const resizeToCollapse = ref(true);
const selectedValue = ref('overview');
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <label class="resize-option">
        <span>拖到最窄时自动折叠</span>
        <h-switch v-model="resizeToCollapse" status />
      </label>
    </div>

    <h-container class="menu-frame">
      <h-aside width="auto">
        <h-menu
          v-model:collapse="collapse"
          collapse-button
          :selected-value="selectedValue"
          :exclusive-expand="false"
          height="360px"
          resizable
          :resize-to-collapse="resizeToCollapse"
          @selected="selectedValue = $event"
        >
          <template #prepend="isCollapse">
            <div class="menu-brand">
              <span>H</span>
              <h-transition name="collapse-horizontal">
                <strong v-show="!isCollapse.value">Workspace</strong>
              </h-transition>
            </div>
          </template>
          <h-menu-item value="overview" icon="material">项目概览</h-menu-item>
          <h-sub-menu value="content" icon="table_folder">
            <template #title>内容管理</template>
            <h-menu-item value="documents">文档</h-menu-item>
            <h-menu-item value="assets">资源库</h-menu-item>
          </h-sub-menu>
          <h-menu-item value="members" icon="friend">团队成员</h-menu-item>
          <h-menu-item value="settings" icon="settings_two">项目设置</h-menu-item>
        </h-menu>
      </h-aside>
      <h-main class="resize-stage">拖动菜单右侧边缘</h-main>
    </h-container>
    <p class="docs-demo__status">{{ collapse ? '菜单已折叠' : '菜单处于展开状态' }}</p>
  </div>
</template>

<style scoped>
.menu-frame {
  height: 360px;
  overflow: hidden;
  border: 1px solid var(--h-border-default);
  border-radius: 12px;
}

.menu-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 48px;
  padding: 0 14px;
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

.resize-option {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--h-text-secondary);
  font-size: 13px;
}

.resize-stage {
  display: grid;
  min-width: 0;
  place-content: center;
  color: var(--h-text-secondary);
  background: var(--h-bg-secondary);
  font-size: 13px;
  text-align: center;
}
</style>
