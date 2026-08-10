<template>
  <div class="loading-delay-demo">
    <header class="loading-delay-demo__toolbar">
      <div>
        <strong>延迟策略对比</strong>
        <p>同时触发两个加载区域，观察延迟配置如何避免短暂闪屏</p>
      </div>
      <span class="loading-delay-demo__status" :class="{ 'is-active': isShow }" aria-live="polite">
        <i></i>
        {{ isShow ? '请求处理中' : '等待操作' }}
      </span>
    </header>

    <h-grid :cols="{ xs: 1, sm: 2 }" :gap="16">
      <h-grid-item>
        <article class="delay-scenario-card">
          <header>
            <div>
              <strong>延迟显示</strong>
              <span>短请求不会出现加载遮罩</span>
            </div>
            <code>delay: 1000ms</code>
          </header>
          <div
            v-loading="{
              isShow,
              loadingType: 'dots',
              textOrient: 'row',
              text: '正在加载详情',
              size: 'medium',
              delay: 1000,
              bgc: 'var(--h-bg-secondary)',
            }"
            class="delay-scenario-card__body"
          >
            <div class="request-preview">
              <span class="request-preview__icon">01</span>
              <div>
                <strong>快速详情请求</strong>
                <p>预期 800ms 内返回，延迟遮罩无需出现。</p>
              </div>
            </div>
            <div class="request-preview__track"><i></i></div>
          </div>
        </article>
      </h-grid-item>

      <h-grid-item>
        <article class="delay-scenario-card">
          <header>
            <div>
              <strong>立即显示</strong>
              <span>请求开始时立刻给出反馈</span>
            </div>
            <code>delay: 0ms</code>
          </header>
          <div
            v-loading="{
              isShow,
              loadingType: 'circle',
              textOrient: 'row',
              text: '正在加载详情',
              size: 'medium',
              bgc: 'var(--h-bg-secondary)',
            }"
            class="delay-scenario-card__body"
          >
            <div class="request-preview">
              <span class="request-preview__icon">02</span>
              <div>
                <strong>标准数据请求</strong>
                <p>加载状态立即展示，适合耗时不确定的任务。</p>
              </div>
            </div>
            <div class="request-preview__track request-preview__track--immediate"><i></i></div>
          </div>
        </article>
      </h-grid-item>
    </h-grid>

    <footer class="loading-delay-demo__actions">
      <div>
        <h-button type="primary" @click="simulateFastRequest">模拟 800ms 快速请求</h-button>
        <h-button :disabled="isShow" @click="startLoading">持续加载</h-button>
        <h-button :disabled="!isShow" @click="finishLoading">结束加载</h-button>
      </div>
      <p>快速请求结束早于 1000ms 时，左侧遮罩不会显示。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';

const isShow = ref(false);
let requestTimer: ReturnType<typeof setTimeout> | undefined;

function clearRequestTimer() {
  if (requestTimer === undefined) return;

  clearTimeout(requestTimer);
  requestTimer = undefined;
}

function startLoading() {
  clearRequestTimer();
  isShow.value = true;
}

function finishLoading() {
  clearRequestTimer();
  isShow.value = false;
}

function simulateFastRequest() {
  clearRequestTimer();
  isShow.value = true;
  requestTimer = setTimeout(() => {
    isShow.value = false;
    requestTimer = undefined;
  }, 800);
}

onBeforeUnmount(clearRequestTimer);
</script>

<style scoped>
.loading-delay-demo {
  display: grid;
  gap: 16px;
}

.loading-delay-demo__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 15px 17px;
  border: 1px solid var(--h-border-default);
  border-radius: 12px;
  background: var(--h-bg-default);
}

.loading-delay-demo__toolbar strong {
  color: var(--h-text-primary);
  font-size: 14px;
}

.loading-delay-demo__toolbar p,
.loading-delay-demo__actions p {
  margin: 4px 0 0;
  color: var(--h-text-secondary);
  font-size: 11px;
  line-height: 1.5;
}

.loading-delay-demo__status {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 7px;
  padding: 5px 9px;
  border-radius: 999px;
  color: var(--h-text-secondary);
  background: var(--h-bg-secondary);
  font-size: 10px;
}

.loading-delay-demo__status i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--h-border-default);
}

.loading-delay-demo__status.is-active {
  color: var(--h-text-brand-default);
  background: var(--h-bg-weak-activated);
}

.loading-delay-demo__status.is-active i {
  background: var(--h-bg-brand-default);
  box-shadow: 0 0 0 3px var(--h-bg-weak-activated);
}

.delay-scenario-card {
  overflow: hidden;
  height: 100%;
  border: 1px solid var(--h-border-default);
  border-radius: 12px;
  background: var(--h-bg-default);
}

.delay-scenario-card > header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 13px 15px;
  border-bottom: 1px solid var(--h-border-default);
}

.delay-scenario-card > header div {
  display: grid;
  gap: 3px;
}

.delay-scenario-card > header strong {
  color: var(--h-text-primary);
  font-size: 12px;
}

.delay-scenario-card > header span {
  color: var(--h-text-secondary);
  font-size: 10px;
}

.delay-scenario-card > header code {
  flex: none;
  padding: 3px 7px;
  border-radius: 5px;
  color: var(--h-text-brand-default);
  background: var(--h-bg-weak-activated);
  font-size: 9px;
}

.delay-scenario-card__body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 22px;
  min-height: 168px;
  padding: 20px;
  box-sizing: border-box;
  background: var(--h-bg-secondary);
}

.request-preview {
  display: flex;
  align-items: center;
  gap: 12px;
}

.request-preview__icon {
  display: grid;
  flex: none;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  color: var(--h-text-brand-default);
  background: var(--h-bg-weak-activated);
  font-size: 11px;
  font-weight: 700;
}

.request-preview div {
  min-width: 0;
}

.request-preview strong {
  color: var(--h-text-primary);
  font-size: 12px;
}

.request-preview p {
  margin: 4px 0 0;
  color: var(--h-text-secondary);
  font-size: 10px;
  line-height: 1.5;
}

.request-preview__track {
  height: 5px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--h-bg-default);
}

.request-preview__track i {
  display: block;
  width: 72%;
  height: 100%;
  border-radius: inherit;
  background: var(--h-bg-brand-default);
  opacity: 0.28;
}

.request-preview__track--immediate i {
  width: 46%;
  opacity: 0.48;
}

.loading-delay-demo__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 2px;
}

.loading-delay-demo__actions > div {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.loading-delay-demo__actions p {
  max-width: 250px;
  margin: 0;
  text-align: right;
}

@media (max-width: 620px) {
  .loading-delay-demo__toolbar,
  .loading-delay-demo__actions {
    align-items: flex-start;
    flex-direction: column;
  }

  .loading-delay-demo__actions p {
    max-width: none;
    text-align: left;
  }
}
</style>
