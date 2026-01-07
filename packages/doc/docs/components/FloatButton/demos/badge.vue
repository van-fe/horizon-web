<template>
  <h-form label-position="left" label-vertical-align="middle" label-width="80px" style="width: 400px">
    <h-form-item label="是否显示">
      <h-switch v-model="visible" :status="true" status-oh-text="显示" status-off-text="隐藏" />
    </h-form-item>
    <h-form-item label="类型">
      <h-radio-group v-model="type">
        <h-radio label="normal"></h-radio>
        <h-radio label="primary"></h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="形状">
      <h-radio-group v-model="shape">
        <h-radio label="circle"></h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="徽标值">
      <h-input-number v-model="badgeContent" :min="0" />
    </h-form-item>
    <h-form-item label="徽标值上限">
      <h-input-number v-model="badgeContentMax" :min="1" />
    </h-form-item>
  </h-form>

  <h-float-button :visible="visible" :shape="shape" :type="type" icon="reply" :badge="{}" />
  <h-float-button :visible="visible" :shape="shape" :type="type" description="消息" :badge="{}" />
  <h-float-button :visible="visible" :shape="shape" :type="type" icon="reply" :badge="{type: 'num', content: badgeContent, numMax: badgeContentMax}" />
  <h-float-button :visible="visible" :shape="shape" :type="type" description="消息" :badge="{type: 'num', content: badgeContent, numMax: badgeContentMax}" />
  <h-float-button :visible="visible" :shape="shape" :type="type" icon="reply" description="消息" :badge="{type: 'num', content: badgeContent, numMax: badgeContentMax}" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);

const shape = ref('circle');
const type = ref('normal');

const badgeContent = ref(9);
const badgeContentMax = ref(10);

</script>
