<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(true);
const blur = ref(true);
</script>

<template>
  <div class="docs-demo">
    <div class="docs-demo__controls">
      <label class="mask-toggle">
        <span>显示遮罩</span>
        <h-switch v-model="visible" status />
      </label>
      <label class="mask-toggle">
        <span>背景模糊</span>
        <h-switch v-model="blur" status :disabled="!visible" />
      </label>
    </div>
    <div class="image-stage">
      <img src="./1.png" alt="山水风景示例" />
      <div class="image-caption">
        <strong>夏季目的地</strong>
        <span>3 张照片 · 由内容团队上传</span>
      </div>
      <h-mask :value="visible" absolute :is-fuzzification="blur">
        <div class="locked-content">
          <strong>内容预览已锁定</strong>
          <span>{{ blur ? '背景已启用高斯模糊' : '仅显示普通遮罩' }}</span>
        </div>
      </h-mask>
    </div>
  </div>
</template>

<style scoped>
.mask-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--h-text-secondary);
  font-size: 13px;
}

.image-stage {
  position: relative;
  min-height: 260px;
  overflow: hidden;
  border-radius: 12px;
  background: var(--h-bg-secondary);
}

.image-stage > img {
  display: block;
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.image-caption {
  position: absolute;
  right: 16px;
  bottom: 16px;
  left: 16px;
  display: grid;
  gap: 4px;
  padding: 14px;
  border-radius: 9px;
  color: var(--h-text-inverse);
  background: var(--h-bg-overlay-default);
}

.image-caption span,
.locked-content span {
  font-size: 12px;
}

.locked-content {
  display: grid;
  justify-items: center;
  gap: 6px;
  color: var(--h-text-inverse);
  text-align: center;
}

@media (max-width: 560px) {
  .image-stage > img {
    height: 240px;
  }
}
</style>
