<template>
  <n-row>
    <n-col :span="24">
      <n-button @click="start">Start</n-button>
    </n-col>
  </n-row>

  <n-dialog v-model="dialogVisible" title="信息填写" @close="onCloseDialog" @opened="onOpened">
    <n-form>
      <n-form-item label="姓名">
        <n-input ref="inputRef" v-model="name" @keypress.enter="onInputBlur" />
      </n-form-item>
      <n-form-item label="年龄">
        <n-input-number ref="inputNumberRef" v-model="age" @keypress.enter="onInputAgeBlur" />
      </n-form-item>
    </n-form>
    <template #footer>
      <n-button @click="dialogVisible = false">取消</n-button>
      <n-button ref="confirmBtnRef" @click="onSubmit">确定</n-button>
    </template>
  </n-dialog>

  <n-guide ref="guideRef" v-model:visible="visible" :use-controls="false" @close="onClose" @finish="onFinish">
    <n-guide-item :target="inputRef" title="第一步" content="请填写姓名，至少2位字符；填写完成后按下回车" />
    <n-guide-item :target="inputNumberRef" title="第二步" content="请填写年龄，在10-60区间；填写完成后按下回车" placement="top-start" />
    <n-guide-item :target="confirmBtnRef" title="第三步" content="点击确定提交" placement="right-start"></n-guide-item>
  </n-guide>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { $alert, $message, NGuide } from '@nio-fe/lego';

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
