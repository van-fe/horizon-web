<template>
  <h-watermark content="Internal · Northstar" :opacity="0.14" :gap="[96, 56]">
    <div class="watermark-single-demo-document">
      <strong>Release readiness</strong>
      <p>Rollback rehearsal is awaiting approval.</p>
      <small>Updated 3 Aug 2026</small>
    </div>
  </h-watermark>
</template>

<style scoped>
.watermark-single-demo-document {
  min-height: 240px;
  padding: var(--h-spacing-6);
  background: var(--h-bg-weak-default);
}

.watermark-single-demo-document strong {
  font-size: var(--h-text-lg);
}

.watermark-single-demo-document p,
.watermark-single-demo-document small {
  color: var(--h-text-secondary);
}

@media (width <= 520px) {
  .watermark-single-demo-document {
    padding: var(--h-spacing-4);
  }
}
</style>
