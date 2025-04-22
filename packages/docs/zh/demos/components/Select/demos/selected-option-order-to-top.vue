<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value1 = ref();
    const value2 = ref();
    const values1 = ref([]);
    const values2 = ref([]);

    return {
      value1,
      value2,
      values1,
      values2,
    };
  },
});
</script>

<template>
  <n-row :gutter="20">
    <n-col :span="6">
      <div class="demo-title">普通单选</div>
      <n-select v-model="value1" clearable :selected-option-order-to-top="true" :to-body="false">
        <n-option label="上海" :value="1" />
        <n-option :value="2" label="北京" />
        <n-option :value="3" label="合肥" name="hefei" />
        <n-option label="杭州" :value="4" />
        <n-option :value="5" label="成都" />
        <n-option :value="6" label="重庆" name="hefei" />
      </n-select>
    </n-col>
    <n-col :span="6">
      <div class="demo-title">普通多选</div>
      <n-select v-model="values1" :multiple="true" clearable :to-body="false" :selected-option-order-to-top="true">
        <n-option label="上海" :value="1" />
        <n-option :value="2" label="北京" />
        <n-option :value="3" label="合肥" name="hefei" />
        <n-option label="杭州" :value="4" />
        <n-option :value="5" label="成都" />
        <n-option :value="6" label="重庆" name="hefei" />
      </n-select>
    </n-col>
    <n-col :span="6">
      <div class="demo-title">单选 - 不具名分组</div>
      <n-select v-model="value2" clearable :selected-option-order-to-top="true" :to-body="false">
        <n-option-group>
          <n-option label="上海" :value="1" />
          <n-option :value="2" label="北京" />
          <n-option :value="3" label="合肥" name="hefei" />
        </n-option-group>
        <n-option label="杭州" :value="4" />
        <n-option :value="5" label="成都" />
        <n-option :value="6" label="重庆" name="hefei" />
      </n-select>
    </n-col>
    <n-col :span="6">
        <div class="demo-title">多选 - 具名分组</div>
        <n-select v-model="values2" clearable multiple :selected-option-order-to-top="true" :to-body="false">
          <n-option-group label="一线">
            <n-option label="上海" :value="1" />
            <n-option :value="2" label="北京" />
            <n-option :value="3" label="广州" name="hefei" />
          </n-option-group>
          <n-option-group label="二线">
            <n-option label="杭州" :value="4" />
            <n-option :value="5" label="成都" />
            <n-option :value="6" label="重庆" name="hefei" />
          </n-option-group>
        </n-select>
    </n-col>
  </n-row>
</template>
