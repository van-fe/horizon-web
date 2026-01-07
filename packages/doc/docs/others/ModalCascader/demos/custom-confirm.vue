<template>
  <div>
    <h-row :gutter="10">
      <h-col :span="6">
        <div class="demo-title">
          自定义按钮文案
        </div>
        <h-modal-cascader
          v-model="currentVal1"
          :options="options"
          :need-confirm="true"
          confirm-bth-text="确定"
          cancel-bth-text="取消"
          :to-body="false"
        />
      </h-col>
      <h-col :span="6">
        <div class="demo-title">
          自定义 confirm render
          <h-tooltip content="使用自定义 render 时请确保 confirm 参数不是 false 或者 undefined">
            <a-icon name="help" />
          </h-tooltip>
        </div>
        <h-modal-cascader v-model="currentVal2" :options="options" :need-confirm="true" multiple :to-body="false">
          <template #confirmRender="slotProps">
            <div class="confirm-buttons">
              <span @click="slotProps.cancelHandle">取消</span>
              <span @click="slotProps.confirmHandle">确认</span>
            </div>
          </template>
        </h-modal-cascader>
      </h-col>
      <h-col :span="6">
        <div class="demo-title">
          通过 template ref 去获取组件暴露出来的事件
        </div>
        <h-modal-cascader ref="cascaderRef" v-model="currentVal3" :options="options" :need-confirm="true" multiple :to-body="false">
          <template #confirmRender>
            <div class="confirm-buttons">
              <span @click="confirmCancelHandle">取消</span>
              <span @click="confirmEnterHandle">确认</span>
            </div>
          </template>
        </h-modal-cascader>
      </h-col>
    </h-row>
  </div>
</template>

<script setup lang="ts">
import { ref} from 'vue';

const cascaderRef = ref<any>(null);
const currentVal1 = ref<string[]>([]);
const currentVal2 = ref<string[][]>([]);
const currentVal3 = ref<string[][]>([]);

const options = ref([]);
fetch(
  'https://static.nio.com/fx-static/horizon-web/clhoirqpc0000088sgljrau3o/cascader-options.json',
).then(res => {
  res.json().then(value => {
    options.value = value;
  });
});

const confirmCancelHandle = () => {
  cascaderRef.value?.exposeConfirm.cancelHandle();
};

const confirmEnterHandle = () => {
  cascaderRef.value?.exposeConfirm.confirmHandle();
};
</script>

<style scoped>
.confirm-buttons {
    display: flex;
    height: 50px;
    line-height: 30px;
    justify-content: center;
    padding: 10px;
    border-top: 1px solid var(--h-divider-default);
}

.confirm-buttons > span {
    margin: 0 10px;
    cursor: pointer;
    font-weight: var(--h-weight-strong);
}

.confirm-buttons > span:first-of-type {
    color: var(--h-text-secondary)
}

.confirm-buttons > span:last-of-type {
    color: var(--h-text-brand-default)
}
</style>
