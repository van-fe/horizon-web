<script setup lang="ts">
import { ref } from 'vue';

const collapse = ref(false);
const selectedValue = ref('overview');

const pages: Record<string, string> = {
  overview: '运营总览',
  settings: '系统设置',
  partners: '合作伙伴',
  analytics: '数据分析',
  service: '服务管理',
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
          collapse-forever
          height="350px"
          @selected="selectedValue = $event"
        >
          <template #prepend="isCollapse">
            <div class="menu-brand">
              <span>H</span>
              <h-transition name="collapse-horizontal">
                <strong v-show="!isCollapse.value">Console</strong>
              </h-transition>
            </div>
          </template>
          <h-sub-menu value="overview" icon="material" selectable>
            <template #title>运营总览</template>
          </h-sub-menu>
          <h-sub-menu value="settings" icon="settings_two" selectable>
            <template #title>系统设置</template>
          </h-sub-menu>
          <h-sub-menu value="partners" icon="friend" selectable>
            <template #title>合作伙伴</template>
          </h-sub-menu>
          <h-sub-menu value="analytics" icon="operation_mgmt" selectable>
            <template #title>数据分析</template>
          </h-sub-menu>
          <h-sub-menu value="service" icon="tires" selectable>
            <template #title>服务管理</template>
          </h-sub-menu>
        </h-menu>
      </h-aside>
      <h-main class="menu-preview">
        <strong>{{ pages[selectedValue] }}</strong>
      </h-main>
    </h-container>
    <p class="docs-demo__status">{{ collapse ? '菜单已折叠' : '菜单已展开' }}</p>
  </div>
</template>

<style scoped>
.menu-frame {
  height: 350px;
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
