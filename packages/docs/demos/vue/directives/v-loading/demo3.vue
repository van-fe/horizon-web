<template>
  <h-grid
    class="loading-config-demo"
    :cols="{ xs: 1, lg: 12 }"
    :column-gap="{ xs: 12, lg: 16 }"
    :row-gap="12"
  >
    <h-grid-item :span="{ xs: 1, lg: 7 }">
      <section class="loading-preview-card">
        <header class="loading-preview-card__header">
          <div>
            <strong>实时预览</strong>
            <span
              class="loading-preview-card__status"
              :class="{ 'loading-preview-card__status--ready': !loadingOptions.isShow }"
            >
              <i></i>
              {{ loadingOptions.isShow ? '加载中' : '内容已就绪' }}
            </span>
          </div>
          <code>v-loading</code>
        </header>

        <div v-loading="loadingOptions" class="loading-preview-card__canvas">
          <div class="report-heading">
            <div>
              <span>WEEKLY OVERVIEW</span>
              <strong>工作区数据趋势</strong>
            </div>
            <em>W32</em>
          </div>

          <div class="report-metrics">
            <div>
              <span>请求量</span>
              <strong>24,680</strong>
              <em>+12.6%</em>
            </div>
            <div>
              <span>成功率</span>
              <strong>98.72%</strong>
              <em>+0.8%</em>
            </div>
          </div>

          <div class="report-chart" aria-hidden="true">
            <i v-for="height in chart" :key="height" :style="{ height }"></i>
          </div>
        </div>

        <footer class="loading-preview-card__footer">
          <span>当前配置</span>
          <code>{{ optionSummary }}</code>
        </footer>
      </section>
    </h-grid-item>

    <h-grid-item :span="{ xs: 1, lg: 5 }">
      <section class="loading-config-panel">
        <header class="loading-config-panel__header">
          <strong>加载配置</strong>
          <span>修改选项后即时生效</span>
        </header>

        <div class="loading-config-panel__body">
          <div class="loading-config-field loading-config-field--inline">
            <div class="loading-config-field__label">
              <strong>显示状态</strong>
              <code>isShow</code>
            </div>
            <h-switch v-model="loadingOptions.isShow" aria-label="切换加载显示状态" />
          </div>

          <div class="loading-config-field">
            <div class="loading-config-field__label">
              <strong>动画类型</strong>
              <code>loadingType</code>
            </div>
            <h-segmented
              v-model:active-key="loadingOptions.loadingType"
              size="small"
              block
              aria-label="动画类型"
            >
              <h-segmented-item value="circle" label="圆环" />
              <h-segmented-item value="dots" label="圆点" />
            </h-segmented>
          </div>

          <div class="loading-config-field">
            <div class="loading-config-field__label">
              <strong>图文排列</strong>
              <code>textOrient</code>
            </div>
            <h-segmented
              v-model:active-key="loadingOptions.textOrient"
              size="small"
              block
              aria-label="图文排列"
            >
              <h-segmented-item value="column" label="纵向" />
              <h-segmented-item value="row" label="横向" />
            </h-segmented>
          </div>

          <div class="loading-config-field">
            <div class="loading-config-field__label">
              <strong>动画尺寸</strong>
              <code>size</code>
            </div>
            <h-segmented
              v-model:active-key="loadingOptions.size"
              size="small"
              block
              aria-label="动画尺寸"
            >
              <h-segmented-item value="small" label="小" />
              <h-segmented-item value="medium" label="中" />
              <h-segmented-item value="large" label="大" />
            </h-segmented>
          </div>

          <div class="loading-config-field">
            <label class="loading-config-field__label" for="loading-demo-text">
              <strong>提示文案</strong>
              <code>text</code>
            </label>
            <h-input
              id="loading-demo-text"
              v-model="loadingOptions.text"
              placeholder="请输入加载提示"
            />
          </div>

          <div class="loading-config-field">
            <div class="loading-config-field__label">
              <strong>遮罩背景</strong>
              <code>bgc</code>
            </div>
            <h-segmented
              v-model:active-key="loadingOptions.bgc"
              size="small"
              block
              aria-label="遮罩背景"
            >
              <h-segmented-item value="var(--h-bg-default)" label="页面色" />
              <h-segmented-item value="var(--h-bg-secondary)" label="次级色" />
              <h-segmented-item value="var(--h-bg-weak-default)" label="品牌弱色" />
            </h-segmented>
          </div>
        </div>
      </section>
    </h-grid-item>
  </h-grid>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';

interface DemoLoadingOptions {
  isShow: boolean;
  loadingType: 'circle' | 'dots';
  textOrient: 'column' | 'row';
  text: string;
  size: 'large' | 'medium' | 'small';
  bgc: string;
}

const loadingOptions = reactive<DemoLoadingOptions>({
  isShow: true,
  loadingType: 'circle',
  textOrient: 'column',
  text: '正在生成数据概览',
  size: 'medium',
  bgc: 'var(--h-bg-secondary)',
});

const chart = ['34%', '48%', '42%', '62%', '56%', '74%', '68%', '88%', '78%', '94%'];

const optionSummary = computed(
  () => `${loadingOptions.loadingType} · ${loadingOptions.size} · ${loadingOptions.textOrient}`,
);
</script>

<style scoped>
.loading-preview-card,
.loading-config-panel {
  overflow: hidden;
  height: 100%;
  border: 1px solid var(--h-border-default);
  border-radius: 12px;
  box-sizing: border-box;
  background: var(--h-bg-default);
}

.loading-preview-card__header,
.loading-config-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 58px;
  padding: 12px 16px;
  box-sizing: border-box;
  border-bottom: 1px solid var(--h-border-default);
}

.loading-preview-card__header > div {
  display: flex;
  align-items: center;
  gap: 10px;
}

.loading-preview-card__header strong,
.loading-config-panel__header strong {
  color: var(--h-text-primary);
  font-size: 13px;
}

.loading-preview-card__header > code,
.loading-preview-card__footer code {
  color: var(--h-text-brand-default);
  font-size: 10px;
}

.loading-preview-card__status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--h-text-brand-default);
  font-size: 10px;
}

.loading-preview-card__status i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--h-bg-brand-default);
  box-shadow: 0 0 0 3px var(--h-bg-weak-activated);
}

.loading-preview-card__status--ready {
  color: var(--h-text-secondary);
}

.loading-preview-card__status--ready i {
  background: var(--h-bg-secondary);
  box-shadow: 0 0 0 3px var(--h-bg-secondary);
}

.loading-preview-card__canvas {
  display: flex;
  flex-direction: column;
  min-height: 320px;
  padding: 24px;
  box-sizing: border-box;
  background:
    linear-gradient(145deg, var(--h-bg-weak-activated), transparent 64%), var(--h-bg-secondary);
}

.report-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.report-heading div {
  display: grid;
  gap: 5px;
}

.report-heading span {
  color: var(--h-text-brand-default);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.report-heading strong {
  color: var(--h-text-primary);
  font-size: 16px;
}

.report-heading em {
  padding: 4px 8px;
  border: 1px solid var(--h-border-default);
  border-radius: 6px;
  color: var(--h-text-secondary);
  background: var(--h-bg-default);
  font-size: 10px;
  font-style: normal;
}

.report-metrics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 28px;
}

.report-metrics > div {
  display: grid;
  gap: 5px;
  padding: 12px;
  border: 1px solid var(--h-border-default);
  border-radius: 9px;
  background: var(--h-bg-default);
}

.report-metrics span {
  color: var(--h-text-secondary);
  font-size: 10px;
}

.report-metrics strong {
  color: var(--h-text-primary);
  font-size: 18px;
}

.report-metrics em {
  color: var(--h-text-brand-default);
  font-size: 10px;
  font-style: normal;
}

.report-chart {
  display: flex;
  flex: 1;
  align-items: flex-end;
  gap: 8px;
  min-height: 84px;
  margin-top: 20px;
}

.report-chart i {
  flex: 1;
  min-width: 4px;
  border-radius: 4px 4px 1px 1px;
  background: var(--h-bg-brand-default);
  opacity: 0.24;
}

.report-chart i:nth-child(3n + 2) {
  opacity: 0.48;
}

.loading-preview-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 42px;
  padding: 9px 16px;
  box-sizing: border-box;
  border-top: 1px solid var(--h-border-default);
  color: var(--h-text-secondary);
  font-size: 10px;
}

.loading-config-panel__header {
  align-items: flex-start;
  flex-direction: column;
  gap: 3px;
}

.loading-config-panel__header span {
  color: var(--h-text-secondary);
  font-size: 10px;
}

.loading-config-panel__body {
  display: grid;
  gap: 16px;
  padding: 16px;
}

.loading-config-field {
  display: grid;
  gap: 8px;
}

.loading-config-field--inline {
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
}

.loading-config-field__label {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
}

.loading-config-field__label strong {
  color: var(--h-text-primary);
  font-size: 11px;
}

.loading-config-field__label code {
  color: var(--h-text-secondary);
  font-size: 9px;
}

@media (max-width: 520px) {
  .loading-preview-card__canvas {
    min-height: 280px;
    padding: 18px;
  }

  .report-metrics {
    margin-top: 20px;
  }

  .report-chart {
    gap: 5px;
  }
}
</style>
