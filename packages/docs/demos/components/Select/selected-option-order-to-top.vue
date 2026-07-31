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
  <h-grid :gap="20">
    <h-grid-item :span="6">
      <div class="demo-title">普通单选</div>
      <h-select v-model="value1" clearable :selected-option-order-to-top="true" :to-body="false">
        <h-option label="上海" :value="1" />
        <h-option :value="2" label="北京" />
        <h-option :value="3" label="合肥" name="hefei" />
        <h-option label="杭州" :value="4" />
        <h-option :value="5" label="成都" />
        <h-option :value="6" label="重庆" name="hefei" />
      </h-select>
    </h-grid-item>
    <h-grid-item :span="6">
      <div class="demo-title">普通多选</div>
      <h-select v-model="values1" :multiple="true" clearable :to-body="false" :selected-option-order-to-top="true">
        <h-option label="上海" :value="1" />
        <h-option :value="2" label="北京" />
        <h-option :value="3" label="合肥" name="hefei" />
        <h-option label="杭州" :value="4" />
        <h-option :value="5" label="成都" />
        <h-option :value="6" label="重庆" name="hefei" />
      </h-select>
    </h-grid-item>
    <h-grid-item :span="6">
      <div class="demo-title">单选 - 不具名分组</div>
      <h-select v-model="value2" clearable :selected-option-order-to-top="true" :to-body="false">
        <h-option-group>
          <h-option label="上海" :value="1" />
          <h-option :value="2" label="北京" />
          <h-option :value="3" label="合肥" name="hefei" />
        </h-option-group>
        <h-option label="杭州" :value="4" />
        <h-option :value="5" label="成都" />
        <h-option :value="6" label="重庆" name="hefei" />
      </h-select>
    </h-grid-item>
    <h-grid-item :span="6">
        <div class="demo-title">多选 - 具名分组</div>
        <h-select v-model="values2" clearable multiple :selected-option-order-to-top="true" :to-body="false">
          <h-option-group label="一线">
            <h-option label="上海" :value="1" />
            <h-option :value="2" label="北京" />
            <h-option :value="3" label="广州" name="hefei" />
          </h-option-group>
          <h-option-group label="二线">
            <h-option label="杭州" :value="4" />
            <h-option :value="5" label="成都" />
            <h-option :value="6" label="重庆" name="hefei" />
          </h-option-group>
        </h-select>
    </h-grid-item>
  </h-grid>
</template>
