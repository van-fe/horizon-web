<template>
  <h-form
    label-position="left"
    label-vertical-align="middle"
    label-width="80px"
    style="width: 400px"
  >
    <h-form-item label="是否显示">
      <h-switch v-model="visible" :status="true" status-on-text="显示" status-off-text="隐藏" />
    </h-form-item>
    <h-form-item label="类型">
      <h-radio-group v-model="type">
        <h-radio value="normal"></h-radio>
        <h-radio value="primary"></h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="形状">
      <h-radio-group v-model="shape">
        <h-radio value="circle"></h-radio>
        <h-radio value="square"></h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-float-button :visible="visible" :type="type" :shape="shape" icon="filter" />
  <h-float-button :visible="visible" :type="type" :shape="shape" description="消息" />
  <h-float-button
    :visible="visible"
    :type="type"
    :shape="shape"
    icon="message"
    description="消息"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const type = ref('normal');
const shape = ref('circle');
</script>

<style scoped></style>
