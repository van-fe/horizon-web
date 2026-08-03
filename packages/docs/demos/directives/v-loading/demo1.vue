<template>
  <div class="loading-basic-demo">
    <header class="loading-basic-demo__toolbar">
      <div>
        <strong>加载样式预览</strong>
        <p>对比两种动画在不同尺寸下的视觉效果</p>
      </div>
      <h-switch
        v-model="isShow"
        status
        status-on-text="加载中"
        status-off-text="已完成"
        aria-label="切换加载状态"
      />
    </header>

    <h-grid :cols="{ xs: 1, sm: 2 }" :gap="16">
      <h-grid-item v-for="item in variants" :key="`${item.loadingType}-${item.size}`">
        <article class="loading-variant-card">
          <header class="loading-variant-card__header">
            <div>
              <strong>{{ item.title }}</strong>
              <span>{{ item.description }}</span>
            </div>
            <code>{{ item.loadingType }} · {{ item.size }}</code>
          </header>

          <div
            v-loading="{
              isShow,
              loadingType: item.loadingType,
              textOrient: 'column',
              text: item.loadingText,
              size: item.size,
              bgc: 'var(--h-bg-secondary)',
            }"
            class="loading-variant-card__preview"
          >
            <div class="loading-variant-card__metric">
              <span>今日处理</span>
              <strong>{{ item.metric }}</strong>
            </div>
            <div class="loading-variant-card__chart" aria-hidden="true">
              <i v-for="(height, index) in item.chart" :key="index" :style="{ height }"></i>
            </div>
          </div>
        </article>
      </h-grid-item>
    </h-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

type LoadingSize = 'small' | 'medium' | 'large';
type LoadingType = 'circle' | 'dots';

interface LoadingVariant {
  title: string;
  description: string;
  loadingText: string;
  loadingType: LoadingType;
  size: LoadingSize;
  metric: string;
  chart: string[];
}

const isShow = ref(true);

const variants: LoadingVariant[] = [
  {
    title: '圆环加载',
    description: '轻量操作',
    loadingText: '正在加载',
    loadingType: 'circle',
    size: 'small',
    metric: '1,284',
    chart: ['32%', '48%', '42%', '64%', '56%', '78%'],
  },
  {
    title: '圆点加载',
    description: '轻量操作',
    loadingText: '正在同步',
    loadingType: 'dots',
    size: 'small',
    metric: '936',
    chart: ['28%', '42%', '36%', '54%', '62%', '72%'],
  },
  {
    title: '圆环加载',
    description: '常规内容区',
    loadingText: '正在汇总数据',
    loadingType: 'circle',
    size: 'medium',
    metric: '8,642',
    chart: ['46%', '58%', '52%', '72%', '68%', '84%'],
  },
  {
    title: '圆点加载',
    description: '常规内容区',
    loadingText: '正在更新数据',
    loadingType: 'dots',
    size: 'medium',
    metric: '6,320',
    chart: ['34%', '56%', '48%', '70%', '64%', '86%'],
  },
  {
    title: '圆环加载',
    description: '重点任务',
    loadingText: '正在生成报告',
    loadingType: 'circle',
    size: 'large',
    metric: '24,680',
    chart: ['38%', '52%', '66%', '58%', '82%', '90%'],
  },
  {
    title: '圆点加载',
    description: '重点任务',
    loadingText: '正在同步工作区',
    loadingType: 'dots',
    size: 'large',
    metric: '18,420',
    chart: ['44%', '50%', '62%', '74%', '68%', '92%'],
  },
];
</script>

<style scoped>
.loading-basic-demo {
  display: grid;
  gap: 16px;
}

.loading-basic-demo__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 18px;
  border: 1px solid var(--h-border-default);
  border-radius: 12px;
  background:
    linear-gradient(135deg, var(--h-bg-weak-activated), transparent 72%), var(--h-bg-default);
}

.loading-basic-demo__toolbar strong {
  color: var(--h-text-primary);
  font-size: 15px;
}

.loading-basic-demo__toolbar p {
  margin: 4px 0 0;
  color: var(--h-text-secondary);
  font-size: 12px;
  line-height: 1.5;
}

.loading-variant-card {
  overflow: hidden;
  height: 100%;
  border: 1px solid var(--h-border-default);
  border-radius: 12px;
  background: var(--h-bg-default);
}

.loading-variant-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border-bottom: 1px solid var(--h-border-default);
}

.loading-variant-card__header div {
  display: grid;
  gap: 3px;
}

.loading-variant-card__header strong {
  color: var(--h-text-primary);
  font-size: 13px;
}

.loading-variant-card__header span {
  color: var(--h-text-secondary);
  font-size: 11px;
}

.loading-variant-card__header code {
  flex: none;
  padding: 3px 7px;
  border-radius: 5px;
  color: var(--h-text-brand-default);
  background: var(--h-bg-weak-activated);
  font-size: 10px;
}

.loading-variant-card__preview {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 148px;
  padding: 18px;
  box-sizing: border-box;
  background: var(--h-bg-secondary);
}

.loading-variant-card__metric {
  display: grid;
  gap: 5px;
}

.loading-variant-card__metric span {
  color: var(--h-text-secondary);
  font-size: 11px;
}

.loading-variant-card__metric strong {
  color: var(--h-text-primary);
  font-size: 24px;
  line-height: 1;
}

.loading-variant-card__chart {
  display: flex;
  align-items: flex-end;
  gap: 7px;
  height: 48px;
}

.loading-variant-card__chart i {
  flex: 1;
  min-width: 4px;
  border-radius: 3px 3px 1px 1px;
  background: var(--h-bg-brand-default);
  opacity: 0.28;
}

.loading-variant-card__chart i:nth-child(2n) {
  opacity: 0.48;
}

@media (max-width: 520px) {
  .loading-basic-demo__toolbar {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
