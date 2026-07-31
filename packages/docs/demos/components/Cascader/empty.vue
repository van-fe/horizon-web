<template>
  <h-grid :gap="10">
    <h-grid-item :span="6">
      <div class="demo-title">默认</div>
      <h-cascader v-model="currentVal1" :options="[]" :to-body="false" />
    </h-grid-item>
    <h-grid-item :span="6">
      <div class="demo-title">自定义文案内容</div>
      <h-cascader
        v-model="currentVal1"
        :options="[]"
        empty-text="没有对应的内容"
        :to-body="false"
      />
    </h-grid-item>
    <h-grid-item :span="6">
      <div class="demo-title">empty 插槽自定义</div>
      <h-cascader v-model="currentVal1" :options="[]" :to-body="false">
        <template #empty>
          <h-empty description="没有对应的内容" />
        </template>
      </h-cascader>
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentVal1 = ref<string[]>([]);
</script>
