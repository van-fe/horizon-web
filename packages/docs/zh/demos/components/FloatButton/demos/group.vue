<template>
  <div>
    <n-form label-position="left" label-vertical-align="middle" label-width="150px" helper-placement="after-label" helper-theme="dark" style="width: 400px">
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
          <n-radio label="square"></n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="是否开启折叠">
        <n-switch v-model="useCollapse" :status="true" status-on-text="开启" status-off-text="关闭" />
      </n-form-item>
      <n-form-item label="是否可拖拽">
        <n-switch v-model="draggable" :status="true" status-on-text="开启" status-off-text="关闭" />
      </n-form-item>
      <n-form-item label="是否允许吸附在底部" helper="如果拖拽距离离底部较近的话，则将其吸附在底部">
        <n-switch v-model="adsorbBottom" :status="true" status-on-text="允许" status-off-text="禁止" />
      </n-form-item>
      <n-form-item label="徽标值">
        <n-input-number v-model="badgeContent" :min="0" />
      </n-form-item>
      <n-form-item label="徽标值上限">
        <n-input-number v-model="badgeContentMax" :min="1" />
      </n-form-item>
    </n-form>

    <n-float-button-group
      :visible="visible"
      :type="type"
      :shape="shape"
      :use-collapse="useCollapse"
      :draggable="draggable"
      :adsorb-bottom="adsorbBottom"
      :badge="{type: 'num', content: badgeContent, numMax: badgeContentMax}"
      expand-tooltip="点击展开"
      fold-tooltip="点击折叠"
    >
      <n-float-button icon="like" tooltip="点赞"></n-float-button>
      <n-float-button icon="urgent_notice" tooltip="加电"></n-float-button>
      <n-float-button icon="star" tooltip="收藏"></n-float-button>
    </n-float-button-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(true);
const type = ref('normal');
const shape = ref('circle');
const useCollapse = ref(true);
const draggable = ref(true);
const adsorbBottom = ref(false);
const badgeContent = ref(9);
const badgeContentMax = ref(10);
</script>
