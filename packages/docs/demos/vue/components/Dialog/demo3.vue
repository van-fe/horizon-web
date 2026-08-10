<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const withIcon = ref(true);
</script>

<template>
  <section class="dialog-icon-demo">
    <h-switch v-model="withIcon" label="Show warning icon" />
    <h-button @click="visible = true">覆盖配置</h-button>

    <h-dialog
      v-model:visible="visible"
      title="确认覆盖现有配置？"
      :icon-name="withIcon ? 'warning_filled' : ''"
      icon-color="var(--h-text-warning-default)"
      :ok-button-props="{ type: 'danger' }"
      ok-text="继续覆盖"
      @ok="visible = false"
    >
      <p class="dialog-copy">覆盖后无法恢复原有配置，请确认已完成备份。</p>
    </h-dialog>
  </section>
</template>

<style scoped>
.dialog-icon-demo {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--h-spacing-3);
}

.dialog-copy {
  margin: 0;
  color: var(--h-text-secondary);
}

@media (max-width: 390px) {
  .dialog-icon-demo {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
