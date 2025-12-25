<template>
  <n-row :gutter="10">
    <n-col :span="6">
      <div class="demo-title">单选：默认</div>
      <n-select
        v-model="value1"
        filter-option
        need-dropdown-confirm
        show-selected-icon
        :to-body="false"
        @change="changeHandle"
      >
        <n-option label="齐齐哈尔" :value="''" />
        <n-option :value="2" label="那然色布斯台音布拉格" />
        <n-option
          :value="3"
          label="黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
        />
      </n-select>
    </n-col>
    <n-col :span="6">
      <div class="demo-title">单选：自定义按钮文字</div>
      <n-select
        v-model="value2"
        filter-option
        need-dropdown-confirm
        dropdown-confirm-btn-text="确定"
        dropdown-cancel-btn-text="取消"
        :to-body="false"
      >
        <n-option label="齐齐哈尔" :value="1" />
        <n-option :value="2" label="那然色布斯台音布拉格" />
        <n-option
          :value="3"
          label="黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
        />
      </n-select>
    </n-col>
    <n-col :span="6">
      <div class="demo-title">单选：使用插槽自定义确认框</div>
      <n-select
        ref="confirmRef"
        v-model="value3"
        filter-option
        need-dropdown-confirm
        :to-body="false"
      >
        <n-option label="齐齐哈尔" :value="1" />
        <n-option :value="2" label="那然色布斯台音布拉格" />
        <n-option
          :value="3"
          label="黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
        />
        <template #dropConfirmRender>
          <div style="display: flex; justify-content: flex-end; margin: 5px">
            <n-button size="small" class="mr-2" @click="confirmHandle">确定</n-button>
            <n-button size="small" type="normal" @click="cancelHandle">取消</n-button>
          </div>
        </template>
      </n-select>
    </n-col>
  </n-row>
  <n-row :gutter="10">
    <n-col :span="6">
      <div class="demo-title">多选：默认</div>
      <n-select v-model="values1" filter-option need-dropdown-confirm multiple :to-body="false">
        <n-option label="齐齐哈尔" :value="1" />
        <n-option :value="2" label="那然色布斯台音布拉格" />
        <n-option
          :value="3"
          label="黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
        />
      </n-select>
    </n-col>
    <n-col :span="6">
      <div class="demo-title">多选：自定义按钮文字</div>
      <n-select
        v-model="values2"
        multiple
        filter-option
        need-dropdown-confirm
        dropdown-confirm-btn-text="确定"
        dropdown-cancel-btn-text="取消"
        :to-body="false"
      >
        <n-option label="齐齐哈尔" :value="1" />
        <n-option :value="2" label="那然色布斯台音布拉格" />
        <n-option
          :value="3"
          label="黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
        />
      </n-select>
    </n-col>
    <n-col :span="6">
      <div class="demo-title">多选：使用插槽自定义确认框</div>
      <n-select
        ref="confirmRef2"
        v-model="values3"
        multiple
        filter-option
        need-dropdown-confirm
        :to-body="false"
      >
        <n-option label="齐齐哈尔" :value="1" />
        <n-option :value="2" label="那然色布斯台音布拉格" />
        <n-option
          :value="3"
          label="黄台甫马哈那坤弃他哇劳狄希阿由他亚马哈底陆浦欧叻辣塔尼布黎隆乌冬帕拉查尼卫马哈洒坦"
        />
        <template #dropConfirmRender>
          <div style="display: flex; justify-content: flex-end; margin: 5px">
            <n-button size="small" class="mr-2" @click="confirmHandle2">确定</n-button>
            <n-button size="small" type="normal" @click="cancelHandle2">取消</n-button>
          </div>
        </template>
      </n-select>
    </n-col>
  </n-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value1 = ref();
    const value2 = ref();
    const value3 = ref();
    const values1 = ref([]);
    const values2 = ref([]);
    const values3 = ref([]);
    const confirmRef = ref<any>(null);
    const confirmRef2 = ref<any>(null);

    const changeHandle = () => {
      console.info(value3.value);
    };

    return {
      value1,
      value2,
      value3,
      values1,
      values2,
      values3,
      confirmRef,
      confirmRef2,
      changeHandle,
      confirmHandle() {
        console.info('confirm');
        confirmRef.value.confirmHandle();
      },
      confirmHandle2() {
        console.info('confirm');
        confirmRef2.value.confirmHandle();
      },
      cancelHandle() {
        console.info('cancel');
        confirmRef.value.cancelHandle();
      },
      cancelHandle2() {
        console.info('cancel');
        confirmRef2.value.cancelHandle();
      },
    };
  },
});
</script>

<style scoped>
</style>
