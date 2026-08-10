<script setup lang="ts">
function pad(value: number | undefined) {
  return String(value ?? 0).padStart(2, '0');
}
</script>

<template>
  <h-time :time="183845">
    <template #default="time">
      <span class="duration">
        <strong>{{ time.dd ?? 0 }}</strong>
        天
        <strong>{{ pad(time.hh) }}</strong>
        小时
        <strong>{{ pad(time.mm) }}</strong>
        分
        <strong>{{ pad(time.ss) }}</strong>
        秒
      </span>
    </template>
  </h-time>
</template>

<style scoped>
.duration {
  display: flex;
  align-items: baseline;
  gap: var(--h-spacing-1);
  flex-wrap: wrap;
  color: var(--h-text-secondary);
  font-size: 12px;
}

.duration strong {
  margin-left: var(--h-spacing-2);
  color: var(--h-text-primary);
  font-size: 20px;
  font-variant-numeric: tabular-nums;
}
</style>
