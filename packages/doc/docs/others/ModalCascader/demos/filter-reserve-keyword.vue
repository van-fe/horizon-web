<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">保留关键字（默认）</div>
      <h-modal-cascader
        v-model="currentVal1"
        :filterable="true"
        :options="options"
        :multiple="true"
        :reserve-keyword="true"
        :collapse-tags="true"
        :collapse-tags-fill-up="true"
        :to-body="false"
        @change="changeHandle"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">不保留关键字</div>
      <h-modal-cascader
        v-model="currentVal2"
        :filterable="true"
        :options="options"
        :multiple="true"
        :reserve-keyword="false"
        :collapse-tags="true"
        :collapse-tags-fill-up="true"
        :to-body="false"
        @change="changeHandle"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">在反选时保留，正选不保留</div>
      <h-modal-cascader
        v-model="currentVal3"
        :filterable="true"
        :options="options"
        :multiple="true"
        reserve-keyword="reserve-deselect"
        :collapse-tags="true"
        :collapse-tags-fill-up="true"
        :to-body="false"
        @change="changeHandle"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import type { HCascaderExtendOption } from '@aurora/horizon-web';
import { onMounted, ref } from 'vue';

const currentVal1 = ref<string[][]>([]);
const currentVal2 = ref<string[][]>([]);
const currentVal3 = ref<string[][]>([]);

const changeHandle = (value: boolean, option: HCascaderExtendOption) => {
  console.info(value, option);
};

const options = ref([]);
onMounted(async()=>{
  options.value = await fetch(`https://static.nio.com/fx-static/51/fixed/cascader-tree-data.prod.json?t=${Date.now()}`).then(r => r.json());
});
</script>

<style scoped>
.panel-filter-box {
  padding: 12px;
  border-bottom: 1px solid var(--h-divider-default);
}
</style>
