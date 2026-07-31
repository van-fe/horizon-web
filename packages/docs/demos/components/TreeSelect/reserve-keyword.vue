<template>
  <h-grid :gap="10">
    <h-grid-item :span="6">
      <div class="demo-title">
        保留关键字（默认）
      </div>
      <h-tree-select v-model="values1" :tree-data="baseTreeData" :filterable="true" :multiple="true" :to-body="false" />
    </h-grid-item>
    <h-grid-item :span="6">
      <div class="demo-title">
        不保留关键字
      </div>
      <h-tree-select v-model="values2" :tree-data="baseTreeData" :filterable="true" :multiple="true" :reserve-keyword="false" :to-body="false" />
    </h-grid-item>
    <h-grid-item :span="6">
      <div class="demo-title">
        仅在反选时保留，正选不保留
        <h-tooltip>
          <template #content>
            考虑了过滤时反选的操作便捷性
          </template>
          <a-icon name="help" />
        </h-tooltip>
      </div>
      <h-tree-select v-model="values3" :tree-data="baseTreeData" :filterable="true" :multiple="true" reserve-keyword="reserve-deselect" :to-body="false" />
    </h-grid-item>
    <h-grid-item :span="6">
      <div class="demo-title">
        不保留关键字，但过滤内容特殊处理
        <h-tooltip content="用户手动清空输入文字或失焦输入框后，才会改变过滤内容">
          <a-icon name="help" />
        </h-tooltip>
      </div>
      <h-tree-select v-model="values4" :tree-data="baseTreeData" :filterable="true" :multiple="true" reserve-keyword="reserve-special" :to-body="false" />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { AIcon } from '@aurora/icon';

const values1 = ref([]);
const values2 = ref([]);
const values3 = ref([]);
const values4 = ref([]);

const baseTreeData = ref([]);

onMounted(() => {
  fetch(new URL('/tree-data.json', import.meta.url).href)
    .then(res => res.json())
    .then(res => {
      baseTreeData.value = res;
    });
});

</script>
