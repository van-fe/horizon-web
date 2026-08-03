<script setup lang="ts">
import { ref } from 'vue';

type MaskType = 'default' | 'weak' | 'strong' | 'inverse' | 'transparent';

const type = ref<MaskType>('default');
const visible = ref(false);
const types: MaskType[] = ['default', 'weak', 'strong', 'inverse', 'transparent'];
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <label class="docs-demo__control docs-demo__control--grow">
        <span class="docs-demo__control-label">
          类型 ·
          <code>type</code>
        </span>
        <h-segmented v-model:active-key="type" size="small">
          <h-segmented-item v-for="item in types" :key="item" :label="item" />
        </h-segmented>
      </label>
      <h-button @click="visible = true">查看效果</h-button>
    </div>

    <div class="mask-stage">
      <span>背景内容在遮罩下保持可见</span>
      <h-mask absolute :value="visible" :type="type">
        <h-button size="small" @click="visible = false">关闭遮罩</h-button>
      </h-mask>
    </div>
  </div>
</template>

<style scoped>
.mask-stage {
  position: relative;
  display: grid;
  min-height: 160px;
  overflow: hidden;
  place-items: center;
  border-radius: var(--h-radius-l);
  color: var(--h-text-secondary);
  background: var(--h-bg-secondary);
}
</style>
