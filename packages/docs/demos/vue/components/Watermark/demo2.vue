<template>
  <h-watermark
    :content="['Northstar Labs', 'Draft · 2026-08-03']"
    :line-gap="8"
    :opacity="0.16"
    :gap="[110, 72]"
  >
    <div class="watermark-multiline-demo-document">
      <strong>Research consent</strong>
      <ul>
        <li>Participation is optional.</li>
        <li>Recordings stay private.</li>
        <li>Findings are anonymized.</li>
      </ul>
    </div>
  </h-watermark>
</template>

<style scoped>
.watermark-multiline-demo-document {
  min-height: 240px;
  padding: var(--h-spacing-6);
  background: var(--h-bg-weak-default);
}

.watermark-multiline-demo-document ul {
  display: grid;
  gap: var(--h-spacing-2);
  padding-left: var(--h-spacing-5);
  margin-top: var(--h-spacing-5);
}

@media (width <= 520px) {
  .watermark-multiline-demo-document {
    padding: var(--h-spacing-4);
  }
}
</style>
