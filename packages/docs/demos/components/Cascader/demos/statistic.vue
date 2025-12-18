<template>
  <n-form label-position="left" label-vertical-align="middle">
    <n-form-item label="size">
      <n-radio-group v-model="size">
        <n-radio label="small" />
        <n-radio label="medium" />
        <n-radio label="large" />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="inputStyle">
      <n-radio-group v-model="inputStyle">
        <n-radio label="normal" />
        <n-radio label="emphasize" />
        <n-radio label="no-border" />
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-row>
    <n-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">默认国际化配置</div>
      <n-cascader
        v-model="currentVal1"
        :clearable="true"
        :to-body="false"
        :input-style="inputStyle"
        :options="baseData"
        :use-statistic="true"
        :multiple="true"
        :size="size"
      />
    </n-col>
    <n-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">自定义为”组件“</div>
      <n-cascader
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
    </n-col>
  </n-row>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const size = ref('medium');
const inputStyle = ref('normal');
const baseData = ref([]);

const currentVal1 = ref<string[][]>([]);
const currentVal2 = ref<string[][]>([]);

onMounted(async()=>{
  baseData.value = await fetch(`https://static.nio.com/fx-static/51/fixed/cascader-tree-data.prod.json?t=${Date.now()}`).then(r => r.json());
});
</script>

<style scoped>
</style>
