<template>
  <n-row :gutter="10">
    <n-col :span="6">
      <div class="demo-title">
        选项超长
        <n-tooltip>
          <template #content>
            由于折叠需要执行宽度计算，在选项较多时，会对性能造成影响
          </template>
          <n-icon name="help" />
        </n-tooltip>
      </div>
      <n-modal-select v-model="values4" collapse multiple :to-body="false">
        <n-option label="齐齐哈尔" :value="1" />
        <n-option :value="2" label="那然色布斯台音布拉格" />
        <n-option label="上海" :value="3" />
        <n-option :value="4" label="北京" />
        <n-option :value="5" label="合肥" name="hefei" />
        <n-option
          :value="6"
          label="黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
        />
      </n-modal-select>
    </n-col>

    <n-col :span="6">
      <div class="demo-title">带过滤选项长度超长</div>
      <n-modal-select v-model="values5" filter-option collapse multiple :max-tag-width="200" :to-body="false">
        <n-option label="齐齐哈尔" :value="1" />
        <n-option :value="2" label="那然色布斯台音布拉格" />
        <n-option label="上海" :value="3" />
        <n-option :value="4" label="北京" />
        <n-option :value="5" label="合肥" name="hefei" />
        <n-option
          :value="6"
          label="黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
        />
      </n-modal-select>
    </n-col>

    <n-col :span="6">
      <div class="demo-title">允许创建</div>
      <n-modal-select v-model="values6" allow-create collapse multiple :to-body="false">
        <n-option label="齐齐哈尔" :value="1" />
        <n-option :value="2" label="那然色布斯台音布拉格" />
        <n-option label="上海" :value="3" />
        <n-option :value="4" label="北京" />
        <n-option :value="5" label="合肥" name="hefei" />
        <n-option
          :value="6"
          label="黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
        />
      </n-modal-select>
    </n-col>
  </n-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const values4 = ref([]);
    const values5 = ref([]);
    const values6 = ref([]);

    return {
      values4,
      values5,
      values6,
    };
  },
});
</script>
