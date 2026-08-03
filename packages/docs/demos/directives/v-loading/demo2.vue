<template>
  <div
    v-loading="{
      isShow: fullscreenLoading,
      loadingType: 'circle',
      textOrient: 'column',
      text: '正在准备工作台',
      size: 'large',
      bgc: 'var(--h-bg-default)',
      fullscreen: true,
    }"
    class="loading-integration-demo"
  >
    <h-grid :cols="{ xs: 1, md: 2 }" :gap="16">
      <h-grid-item>
        <article class="loading-scenario-card">
          <header class="loading-scenario-card__header">
            <div>
              <span class="loading-scenario-card__index">01</span>
              <div>
                <strong>局部加载</strong>
                <p>适合卡片、表格等独立内容区</p>
              </div>
            </div>
            <h-switch v-model="localLoading" aria-label="切换局部加载状态" />
          </header>

          <div
            v-loading="{
              isShow: localLoading,
              loadingType: 'dots',
              textOrient: 'row',
              text: '正在同步记录',
              size: 'medium',
              bgc: 'var(--h-bg-secondary)',
            }"
            class="loading-scenario-card__body"
          >
            <div v-for="record in records" :key="record.name" class="sync-record">
              <span class="sync-record__avatar">{{ record.name.slice(0, 1) }}</span>
              <div>
                <strong>{{ record.name }}</strong>
                <span>{{ record.time }}</span>
              </div>
              <em>{{ record.status }}</em>
            </div>
          </div>
        </article>
      </h-grid-item>

      <h-grid-item>
        <article class="loading-scenario-card loading-scenario-card--fullscreen">
          <header class="loading-scenario-card__header">
            <div>
              <span class="loading-scenario-card__index">02</span>
              <div>
                <strong>全屏加载</strong>
                <p>适合页面初始化或工作区切换</p>
              </div>
            </div>
            <code>fullscreen</code>
          </header>

          <div class="loading-scenario-card__body loading-scenario-card__body--fullscreen">
            <div class="workspace-preview" aria-hidden="true">
              <i></i>
              <i></i>
              <span></span>
            </div>
            <div>
              <strong>演示页面级等待状态</strong>
              <p>加载层会在 2 秒后自动关闭，随时可以安全体验。</p>
              <h-button type="primary" :disabled="fullscreenLoading" @click="showFullscreenLoading">
                {{ fullscreenLoading ? '加载中…' : '演示全屏加载' }}
              </h-button>
            </div>
          </div>
        </article>
      </h-grid-item>
    </h-grid>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, ref } from 'vue';

const localLoading = ref(true);
const fullscreenLoading = ref(false);

const records = [
  { name: '客户洞察报告', time: '刚刚更新', status: '已同步' },
  { name: '季度经营看板', time: '2 分钟前', status: '已同步' },
  { name: '渠道分析数据', time: '5 分钟前', status: '已同步' },
];

let fullscreenTimer: ReturnType<typeof setTimeout> | undefined;

function showFullscreenLoading() {
  if (fullscreenLoading.value) return;

  fullscreenLoading.value = true;
  fullscreenTimer = setTimeout(() => {
    fullscreenLoading.value = false;
    fullscreenTimer = undefined;
  }, 2000);
}

onBeforeUnmount(() => {
  if (fullscreenTimer !== undefined) clearTimeout(fullscreenTimer);
});
</script>

<style scoped>
.loading-scenario-card {
  overflow: hidden;
  height: 100%;
  border: 1px solid var(--h-border-default);
  border-radius: 12px;
  background: var(--h-bg-default);
}

.loading-scenario-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 68px;
  padding: 12px 16px;
  box-sizing: border-box;
  border-bottom: 1px solid var(--h-border-default);
}

.loading-scenario-card__header > div {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.loading-scenario-card__index {
  display: grid;
  flex: none;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 9px;
  color: var(--h-text-brand-default);
  background: var(--h-bg-weak-activated);
  font-size: 11px;
  font-weight: 700;
}

.loading-scenario-card__header strong {
  display: block;
  color: var(--h-text-primary);
  font-size: 13px;
}

.loading-scenario-card__header p {
  margin: 3px 0 0;
  color: var(--h-text-secondary);
  font-size: 11px;
}

.loading-scenario-card__header code {
  flex: none;
  padding: 3px 7px;
  border-radius: 5px;
  color: var(--h-text-brand-default);
  background: var(--h-bg-weak-activated);
  font-size: 10px;
}

.loading-scenario-card__body {
  display: grid;
  gap: 10px;
  min-height: 206px;
  padding: 16px;
  box-sizing: border-box;
  background: var(--h-bg-secondary);
}

.sync-record {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid var(--h-border-default);
  border-radius: 9px;
  background: var(--h-bg-default);
}

.sync-record__avatar {
  display: grid;
  flex: none;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: var(--h-text-brand-default);
  background: var(--h-bg-weak-activated);
  font-size: 12px;
  font-weight: 700;
}

.sync-record > div {
  display: grid;
  flex: 1;
  gap: 3px;
  min-width: 0;
}

.sync-record strong {
  overflow: hidden;
  color: var(--h-text-primary);
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sync-record span,
.sync-record em {
  color: var(--h-text-secondary);
  font-size: 10px;
  font-style: normal;
}

.sync-record em {
  flex: none;
  color: var(--h-text-brand-default);
}

.loading-scenario-card__body--fullscreen {
  grid-template-columns: 116px minmax(0, 1fr);
  align-items: center;
  gap: 20px;
}

.workspace-preview {
  position: relative;
  display: grid;
  place-items: center;
  width: 108px;
  height: 108px;
}

.workspace-preview i {
  position: absolute;
  border: 1px solid var(--h-border-brand-default);
  border-radius: 50%;
  opacity: 0.28;
}

.workspace-preview i:first-child {
  width: 104px;
  height: 104px;
}

.workspace-preview i:nth-child(2) {
  width: 72px;
  height: 72px;
  opacity: 0.48;
}

.workspace-preview span {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: var(--h-bg-brand-default);
  box-shadow: 0 0 0 9px var(--h-bg-weak-activated);
}

.loading-scenario-card__body--fullscreen > div:last-child > strong {
  color: var(--h-text-primary);
  font-size: 14px;
}

.loading-scenario-card__body--fullscreen p {
  margin: 6px 0 16px;
  color: var(--h-text-secondary);
  font-size: 11px;
  line-height: 1.6;
}

@media (max-width: 520px) {
  .loading-scenario-card__header {
    align-items: flex-start;
    flex-direction: column;
  }

  .loading-scenario-card__body--fullscreen {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }
}
</style>
