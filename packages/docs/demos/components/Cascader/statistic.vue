<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="size">
      <h-radio-group v-model="size">
        <h-radio value="small" />
        <h-radio value="medium" />
        <h-radio value="large" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="inputStyle">
      <h-radio-group v-model="inputStyle">
        <h-radio value="normal" />
        <h-radio value="emphasize" />
        <h-radio value="no-border" />
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-grid :gap="12">
    <h-grid-item :span="{ xs: 12, md: 8, lg: 6, xl: 6, xxl: 6 }">
      <div class="demo-title">默认国际化配置</div>
      <h-cascader
        v-model="currentVal1"
        :clearable="true"
        :to-body="false"
        :input-style="inputStyle"
        :options="baseData"
        :use-statistic="true"
        :multiple="true"
        :size="size"
      />
    </h-grid-item>
    <h-grid-item :span="{ xs: 12, md: 8, lg: 6, xl: 6, xxl: 6 }">
      <div class="demo-title">自定义为”组件“</div>
      <h-cascader
        v-model="currentVal2"
        :clearable="true"
        :to-body="false"
        :input-style="inputStyle"
        :options="baseData"
        :use-statistic="true"
        statistic-text="组件"
        :multiple="true"
        :size="size"
      />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const size = ref('medium');
const inputStyle = ref('normal');
const baseData = ref([]);

const currentVal1 = ref<string[][]>([]);
const currentVal2 = ref<string[][]>([]);

onMounted(async () => {
  baseData.value = await fetch(new URL('/cascader-tree-data.json', import.meta.url).href).then(r =>
    r.json(),
  );
});
</script>

<style scoped></style>
