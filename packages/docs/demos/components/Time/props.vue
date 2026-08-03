<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

const mode = ref<'forward' | 'deadline' | 'calculative'>('forward');
const isReady = ref(false);
const deadline = ref(0);
const incidentStartedAt = ref(0);
const incidentEndedAt = ref(0);
const forwardFinished = ref(false);
const deadlineFinished = ref(false);

const status = computed(() => {
  if (mode.value === 'forward') return forwardFinished.value ? '计时已结束' : '正在计时';
  if (mode.value === 'deadline') return deadlineFinished.value ? '截止时间已到' : '距离截止时间';
  return '事故持续时长';
});

onMounted(() => {
  const now = Date.now();
  deadline.value = now + 30_000;
  incidentStartedAt.value = now - 3_665_000;
  incidentEndedAt.value = now;
  isReady.value = true;
});
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-segmented v-model:active-key="mode" size="small">
        <h-segmented-item key="forward" label="Forward" />
        <h-segmented-item key="deadline" label="End time" />
        <h-segmented-item key="calculative" label="Calculative" />
      </h-segmented>
    </div>

    <div class="time-value">
      <h-time v-if="mode === 'forward'" :time="20" forward @finished="forwardFinished = true" />
      <h-time
        v-else-if="mode === 'deadline' && isReady"
        :end-time="deadline"
        @finished="deadlineFinished = true"
      />
      <h-time
        v-else-if="isReady"
        :time="incidentStartedAt"
        :end-time="incidentEndedAt"
        calculative
      />
      <span v-else>--:--</span>
    </div>
    <p class="docs-demo__status">{{ status }}</p>
  </section>
</template>

<style scoped>
.time-value {
  color: var(--h-text-primary);
  font-size: 24px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
</style>
