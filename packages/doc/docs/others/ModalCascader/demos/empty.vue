<template>
  <n-row :gutter="10">
    <n-col :span="6">
      <div class="demo-title">
        默认
      </div>
      <n-modal-cascader v-model="currentVal1" :options="[]" :to-body="false" />
    </n-col>
    <n-col :span="6">
      <div class="demo-title">
        自定义文案内容
      </div>
      <n-modal-cascader
          v-model="currentVal1"
          :options="[]"
          empty-content="没有对应的内容"
          :to-body="false"
      />
    </n-col>
    <n-col :span="6">
      <div class="demo-title">
        emptyRender 插槽自定义
      </div>
      <n-modal-cascader v-model="currentVal1" :options="[]" :to-body="false">
        <template #emptyRender>
          <n-empty description="没有对应的内容" />
        </template>
      </n-modal-cascader>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentVal1 = ref<string[]>([]);
</script>
