<script setup lang="ts">
import { ref } from 'vue';

const category = ref('design');
const options = [
  { label: '设计系统', value: 'design' },
  { label: '产品文档', value: 'product' },
  { label: '开发指南', value: 'develop' },
];
</script>

<template>
  <div class="docs-demo">
    <div class="popover-stage">
      <h-popover trigger="click" hide-event-type="mousedown">
        <template #reference><h-button>连续选择</h-button></template>
        <template #popper>
          <h-pop-content>
            <h-select v-model="category" clearable :to-body="false">
              <h-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </h-select>
          </h-pop-content>
        </template>
      </h-popover>
    </div>
    <p class="docs-demo__status">
      当前分类：{{ options.find(item => item.value === category)?.label }}
    </p>
  </div>
</template>

<style scoped>
.popover-stage {
  display: flex;
  justify-content: center;
  padding-block: 24px;
}
</style>
