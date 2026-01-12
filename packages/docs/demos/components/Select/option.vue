<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">自定义 option</div>
      <h-select v-model="value1" :to-body="false">
        <h-option label="中国" :value="1">
          <template #default="slotProps">
            <div class="select-custom-item china" :class="slotProps.active ? 'active' : ''">
              {{ slotProps.label }}
            </div>
          </template>
        </h-option>
        <h-option :value="2" label="美国" />
        <h-option :value="3" label="日本" />
        <template #optionRender="slotProps">
          <div class="select-custom-item" :class="slotProps.active ? 'active' : ''">
            {{ slotProps.label }}
          </div>
        </template>
      </h-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">自定义 Option 面板样式</div>
      <h-select
        v-model="value2"
        :external-panel-style="{ width: '100px', border: '1px solid #f00' }"
        :to-body="false"
      >
        <h-option label="中国" :value="1" />
        <h-option :value="2" label="美国" />
        <h-option :value="3" label="日本" />
      </h-select>
    </h-col>
  </h-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value1 = ref();
    const value2 = ref();
    const value3 = ref();
    const value4 = ref();
    const value5 = ref();
    const values1 = ref([]);
    const values2 = ref([]);
    const confirmRef = ref<any>(null);

    const changeHandle = () => {
      console.info(value3.value);
    };

    return {
      value1,
      value2,
      value3,
      value4,
      value5,
      values1,
      values2,
      confirmRef,
      changeHandle,
      confirmHandle() {
        console.info('confirm');
        confirmRef.value.confirmHandle();
      },
      cancleHandle() {
        console.info('cancle');
        confirmRef.value.cancelHandle();
      },
    };
  },
});
</script>

<style scoped>
.select-custom-item {
  height: 34px;
  line-height: 16px;
  width: 100%;
  background: #ff0;
  padding: 10px 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
  white-space: nowrap;
  margin: 5px 0;

  &.china {
    background: #f00;
    color: #fff;
  }

  &.active {
    background-color: #0ff;
    font-weight: bolder;
  }
}
</style>
