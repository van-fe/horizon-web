<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">
        默认
      </div>
      <h-modal-cascader v-model="currentVal1" :options="[]" :to-body="false" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">
        自定义文案内容
      </div>
      <h-modal-cascader
          v-model="currentVal1"
          :options="[]"
          empty-content="没有对应的内容"
          :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">
        emptyRender 插槽自定义
      </div>
      <h-modal-cascader v-model="currentVal1" :options="[]" :to-body="false">
        <template #emptyRender>
          <h-empty description="没有对应的内容" />
        </template>
      </h-modal-cascader>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentVal1 = ref<string[]>([]);
</script>
