<script setup lang="ts">
import { ref } from 'vue';

type SortOrder = 'order' | 'reverse';

const sort = ref<SortOrder>('order');
const foldConfig = {
  number: 2,
  content: '查看 2 条自动检查记录',
  dot: {
    type: 'circle' as const,
    icon: 'arrow_down',
    color: 'var(--h-bg-default)',
    borderColor: 'var(--h-border-default)',
    size: 'large' as const,
  },
};
</script>

<template>
  <section class="timeline-prop-demo">
    <h-segmented v-model:active-key="sort" size="small" block aria-label="时间线排序">
      <h-segmented-item key="order" label="Order" />
      <h-segmented-item key="reverse" label="Reverse" />
    </h-segmented>

    <h-timeline :sort="sort" :first="{ color: 'var(--h-bg-brand-default)' }">
      <h-timeline-item
        name="构建产物"
        timestamp="08-14 09:12"
        desc="镜像与签名验证均已通过"
        color="var(--h-bg-success-default)"
        placement="top"
        size="large"
        icon="check"
        :fold-config="foldConfig"
      />
      <h-timeline-item
        timestamp="08-14 10:05"
        color="var(--h-bg-brand-default)"
        placement="right"
        size="large"
      >
        <template #name>
          <span class="timeline-prop-demo__name">
            <strong>灰度发布</strong>
            <h-tag type="info" plain size="small" :clickable="false">Owner</h-tag>
          </span>
        </template>
        <template #desc>10% 流量运行稳定，等待质量负责人复核。</template>
      </h-timeline-item>
      <h-timeline-item
        name="等待全量"
        timestamp="08-14 18:30"
        desc="发布窗口尚未开始"
        dashed
        type="circle"
        placement="bottom"
        :tail="false"
      />
    </h-timeline>
  </section>
</template>

<style scoped>
.timeline-prop-demo {
  display: grid;
  gap: var(--h-spacing-4);
  max-inline-size: 720px;
}

.timeline-prop-demo__name {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--h-spacing-2);
}
</style>
