<script setup lang="ts">
import { computed, ref } from 'vue';

type FooterMode = 'all' | 'primary' | 'none' | 'custom';

const visible = ref(false);
const mode = ref<FooterMode>('all');
const status = ref('选择底部操作形式');
const showPrimary = computed(() => mode.value === 'all' || mode.value === 'primary');
const showSecondary = computed(() => mode.value === 'all');

function finish(message: string) {
  visible.value = false;
  status.value = message;
}
</script>

<template>
  <section class="dialog-footer-demo">
    <h-segmented v-model:active-key="mode" size="small">
      <h-segmented-item key="all" label="Both" />
      <h-segmented-item key="primary" label="Primary" />
      <h-segmented-item key="none" label="None" />
      <h-segmented-item key="custom" label="Custom" />
    </h-segmented>
    <h-button @click="visible = true">打开对话框</h-button>
    <p role="status">{{ status }}</p>

    <h-dialog
      v-model:visible="visible"
      title="保存视图配置"
      :ok-button-props="mode === 'custom' ? false : showPrimary"
      :cancel-button-props="mode === 'custom' ? false : showSecondary"
      @ok="finish('视图配置已保存')"
    >
      <p class="dialog-copy">底部操作应与任务风险和决策成本相匹配。</p>
      <template v-if="mode === 'custom'" #footer>
        <h-space>
          <h-button type="normal" @click="visible = false">取消</h-button>
          <h-button @click="finish('设计评审已提交')">提交评审</h-button>
        </h-space>
      </template>
    </h-dialog>
  </section>
</template>

<style scoped>
.dialog-footer-demo {
  display: grid;
  justify-items: start;
  gap: var(--h-spacing-3);
}

.dialog-footer-demo > p,
.dialog-copy {
  margin: 0;
  color: var(--h-text-secondary);
}

@media (max-width: 390px) {
  .dialog-footer-demo {
    inline-size: 100%;
  }
}
</style>
