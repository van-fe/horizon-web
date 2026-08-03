<script setup lang="ts">
import { ref } from 'vue';

type ApplicationSize = 'small' | 'medium' | 'large';

const size = ref<ApplicationSize>('medium');
const notificationsEnabled = ref(true);
const projectName = ref('Aurora Launch');
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-segmented v-model:active-key="size" size="small">
        <h-segmented-item key="small" label="Small" />
        <h-segmented-item key="medium" label="Medium" />
        <h-segmented-item key="large" label="Large" />
      </h-segmented>
    </div>

    <h-application :size="size">
      <div class="application-fields">
        <h-input v-model="projectName" aria-label="项目名称" />
        <h-switch v-model="notificationsEnabled" aria-label="状态通知" />
        <h-button icon="check">保存</h-button>
      </div>
    </h-application>
  </section>
</template>

<style scoped>
.application-fields {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--h-spacing-3);
}
</style>
