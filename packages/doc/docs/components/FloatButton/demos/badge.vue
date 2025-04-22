<template>
  <n-form label-position="left" label-vertical-align="middle" label-width="80px" style="width: 400px">
    <n-form-item label="是否显示">
      <n-switch v-model="visible" :status="true" status-on-text="显示" status-off-text="隐藏" />
    </n-form-item>
    <n-form-item label="类型">
      <n-radio-group v-model="type">
        <n-radio label="normal"></n-radio>
        <n-radio label="primary"></n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="形状">
      <n-radio-group v-model="shape">
        <n-radio label="circle"></n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="徽标值">
      <n-input-number v-model="badgeContent" :min="0" />
    </n-form-item>
    <n-form-item label="徽标值上限">
      <n-input-number v-model="badgeContentMax" :min="1" />
    </n-form-item>
  </n-form>

  <n-float-button :visible="visible" :shape="shape" :type="type" icon="reply" :badge="{}" />
  <n-float-button :visible="visible" :shape="shape" :type="type" description="消息" :badge="{}" />
  <n-float-button :visible="visible" :shape="shape" :type="type" icon="reply" :badge="{type: 'num', content: badgeContent, numMax: badgeContentMax}" />
  <n-float-button :visible="visible" :shape="shape" :type="type" description="消息" :badge="{type: 'num', content: badgeContent, numMax: badgeContentMax}" />
  <n-float-button :visible="visible" :shape="shape" :type="type" icon="reply" description="消息" :badge="{type: 'num', content: badgeContent, numMax: badgeContentMax}" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);

const shape = ref('circle');
const type = ref('normal');

const badgeContent = ref(9);
const badgeContentMax = ref(10);

</script>
