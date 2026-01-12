<template>
  <h-row>
    <h-col :span="24">
      <h-button @click="start">Start</h-button>
    </h-col>
  </h-row>

  <h-dialog v-model="dialogVisible" title="信息填写" @close="onCloseDialog" @opened="onOpened">
    <h-form>
      <h-form-item label="姓名">
        <h-input ref="inputRef" v-model="name" @keypress.enter="onInputBlur" />
      </h-form-item>
      <h-form-item label="年龄">
        <h-input-number ref="inputNumberRef" v-model="age" @keypress.enter="onInputAgeBlur" />
      </h-form-item>
    </h-form>
    <template #footer>
      <h-button @click="dialogVisible = false">取消</h-button>
      <h-button ref="confirmBtnRef" @click="onSubmit">确定</h-button>
    </template>
  </h-dialog>

  <h-guide ref="guideRef" v-model:visible="visible" :use-controls="false" @close="onClose" @finish="onFinish">
    <h-guide-item :target="inputRef" title="第一步" content="请填写姓名，至少2位字符；填写完成后按下回车" />
    <h-guide-item :target="inputNumberRef" title="第二步" content="请填写年龄，在10-60区间；填写完成后按下回车" placement="top-start" />
    <h-guide-item :target="confirmBtnRef" title="第三步" content="点击确定提交" placement="right-start"></h-guide-item>
  </h-guide>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { $alert, $message, NGuide } from '@aurora/horizon-web';

const guideRef = shallowRef<typeof NGuide | null>(null);
const inputRef = shallowRef<HTMLElement | null>(null);
const inputNumberRef = shallowRef<HTMLElement | null>(null);
const confirmBtnRef = shallowRef<HTMLElement | null>(null);

const visible = ref(false);
const dialogVisible = ref(false);

const name = ref('');
const age = ref(0);

function start() {
  dialogVisible.value = true;
}

function onInputBlur() {
  if (name.value.length >= 2) {
    guideRef.value?.next();
  }
}

function onInputAgeBlur() {
  if (age.value >= 10 && age.value <= 60) {
    guideRef.value?.next();
  }
}

function onClose() {
  $message.warning('跳过了新手引导');
}

function onFinish() {
  $message.success('完成了新手引导');
  dialogVisible.value = false;
}

function onOpened() {
  visible.value = true;
}

function onCloseDialog() {
  visible.value = false;
}

function onSubmit() {
  $alert('填写结束').then(() => {
    guideRef.value?.next();
  });
}
</script>

<style scoped>
</style>
