<script setup lang="ts">
import { ref } from 'vue';
import { $confirm } from '@aurora/horizon-web';

const collapse = ref(false);
const selectedValue = ref('staging');
const status = ref('当前环境：预发布环境');

const environments: Record<string, string> = {
  development: '开发环境',
  staging: '预发布环境',
  production: '生产环境',
  logs: '运行日志',
};

const beforeSelect = async (value: string) => {
  const target = environments[value] ?? value;
  try {
    const close = await $confirm(`确认切换到“${target}”吗？`, '切换环境');
    close();
    status.value = `已确认切换到：${target}`;
    return true;
  } catch {
    status.value = `已取消切换，仍停留在：${environments[selectedValue.value]}`;
    return false;
  }
};

const select = (value: string) => {
  selectedValue.value = value;
  status.value = `当前环境：${environments[value] ?? value}`;
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
          height="340px"
          :before-select="beforeSelect"
          @selected="select"
        >
          <template #prepend="isCollapse">
            <div class="menu-brand">
              <span>H</span>
              <h-transition name="collapse-horizontal">
                <strong v-show="!isCollapse.value">Deploy</strong>
              </h-transition>
            </div>
          </template>
          <h-sub-menu value="environments" icon="operation_mgmt">
            <template #title>运行环境</template>
            <h-menu-item value="development">开发环境</h-menu-item>
            <h-menu-item value="staging">预发布环境</h-menu-item>
            <h-menu-item value="production">生产环境</h-menu-item>
          </h-sub-menu>
          <h-menu-item value="logs" icon="file">运行日志</h-menu-item>
        </h-menu>
      </h-aside>
      <h-main class="menu-preview">
        <strong>{{ environments[selectedValue] }}</strong>
      </h-main>
    </h-container>
    <p class="docs-demo__status" role="status">{{ status }}</p>
  </div>
</template>

<style scoped>
.menu-frame {
  height: 340px;
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
  text-align: center;
}

.menu-preview strong {
  color: var(--h-text-primary);
  font-size: 18px;
}
</style>
