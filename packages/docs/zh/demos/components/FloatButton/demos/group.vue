<template>
  <div>
    <h-form label-position="left" label-vertical-align="middle" label-width="150px" helper-placement="after-label" helper-theme="dark" style="width: 400px">
      <h-form-item label="是否显示">
        <h-switch v-model="visible" :status="true" status-on-text="显示" status-off-text="隐藏" />
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
          <h-radio label="square"></h-radio>
        </h-radio-group>
      </h-form-item>
      <h-form-item label="是否开启折叠">
        <h-switch v-model="useCollapse" :status="true" status-on-text="开启" status-off-text="关闭" />
      </h-form-item>
      <h-form-item label="是否可拖拽">
        <h-switch v-model="draggable" :status="true" status-on-text="开启" status-off-text="关闭" />
      </h-form-item>
      <h-form-item label="是否允许吸附在底部" helper="如果拖拽距离离底部较近的话，则将其吸附在底部">
        <h-switch v-model="adsorbBottom" :status="true" status-on-text="允许" status-off-text="禁止" />
      </h-form-item>
      <h-form-item label="徽标值">
        <h-input-number v-model="badgeContent" :min="0" />
      </h-form-item>
      <h-form-item label="徽标值上限">
        <h-input-number v-model="badgeContentMax" :min="1" />
      </h-form-item>
    </h-form>

    <h-float-button-group
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
      <h-float-button icon="like" tooltip="点赞"></h-float-button>
      <h-float-button icon="urgent_notice" tooltip="加电"></h-float-button>
      <h-float-button icon="star" tooltip="收藏"></h-float-button>
    </h-float-button-group>
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
