<template>
  <div class="responsive-demo">
    <div class="responsive-demo__hint">
      <span class="responsive-demo__signal"></span>
      调整浏览器宽度，观察 1 / 2 / 4 列之间的切换
    </div>

    <h-grid
      :cols="{ xs: 1, sm: 2, md: 4 }"
      :column-gap="{ xs: 8, sm: 12, md: 16 }"
      :row-gap="{ xs: 8, md: 16 }"
    >
      <h-grid-item v-for="(item, index) in items" :key="item">
        <article class="responsive-card">
          <span>0{{ index + 1 }}</span>
          <strong>{{ item }}</strong>
        </article>
      </h-grid-item>
    </h-grid>
  </div>
</template>

<script setup lang="ts">
const items = ['Analytics', 'Workspace', 'Automation', 'Settings'];
</script>

<style scoped>
.responsive-demo {
  display: grid;
  gap: 14px;
}

.responsive-demo__hint {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--h-text-secondary);
  font-size: 12px;
}

.responsive-demo__signal {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--h-bg-brand-default);
}

.responsive-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 112px;
  padding: 16px;
  box-sizing: border-box;
  border: 1px solid var(--h-border-default);
  border-radius: 10px;
  background: var(--h-bg-secondary);
}

@media (max-width: 560px) {
  .responsive-card {
    min-height: 88px;
  }
}

.responsive-card span {
  color: var(--h-text-brand-default);
  font-size: 12px;
  font-weight: 700;
}

.responsive-card strong {
  color: var(--h-text-primary);
  font-size: 14px;
}
</style>
