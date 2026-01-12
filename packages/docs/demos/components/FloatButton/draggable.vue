<template>
  <div>
    <h-form label-position="left" label-vertical-align="middle" label-width="150px" helper-placement="after-label" helper-theme="dark" style="width: 400px">
      <h-form-item label="是否显示">
        <h-switch v-model="visible" :status="true" status-on-text="显示" status-off-text="隐藏" />
      </h-form-item>
      <h-form-item label="是否可拖拽">
        <h-switch v-model="draggable" :status="true" status-on-text="开启" status-off-text="关闭" />
      </h-form-item>
      <h-form-item label="是否允许吸附在底部" helper="如果拖拽距离离底部较近的话，则将其吸附在底部">
        <h-switch v-model="adsorbBottom" :status="true" status-on-text="允许" status-off-text="禁止" />
      </h-form-item>
    </h-form>

    <h-float-button :visible="visible" :adsorb-bottom="adsorbBottom" :draggable="draggable" icon="nomi1" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const draggable = ref(true);
const adsorbBottom = ref(false);
</script>
