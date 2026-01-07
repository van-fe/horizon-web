<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="size">
      <h-radio-group v-model="size">
        <h-radio label="small" />
        <h-radio label="medium" />
        <h-radio label="large" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="inputStyle">
      <h-radio-group v-model="inputStyle">
        <h-radio label="normal" />
        <h-radio label="emphasize" />
        <h-radio label="no-border" />
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">默认国际化配置</div>
      <h-modal-cascader
        v-model="currentVal1"
        :clearable="true"
        :to-body="false"
        :input-style="inputStyle"
        :options="baseData"
        :use-statistic="true"
        :multiple="true"
        :size="size"
      />
    </h-col>
    <h-col :xs="12" :md="8" :lg="6" :xl="6" :xxl="6">
      <div class="demo-title">自定义为”组件“</div>
      <h-modal-cascader
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
    </h-col>
  </h-row>

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
