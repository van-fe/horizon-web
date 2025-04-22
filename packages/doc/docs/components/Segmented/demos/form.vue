<template>
  <n-form ref="instance" :model="values">
    <n-form-item label="Name" prop="name" style="width: 300px" required>
      <n-input v-model="values.name" />
    </n-form-item>
    <n-form-item label="Category" prop="category" required>
      <n-segmented v-model:active-key="values.category" form>
        <n-segmented-item v-for="v in options" :key="v" :label="v" />
      </n-segmented>
    </n-form-item>
    <n-space>
      <n-button @click="onSubmit">Submit</n-button>
      <n-button type="danger" @click="instance?.validate()">Validate</n-button>
    </n-space>
  </n-form>
</template>

<script setup lang="ts">
import { NFormInstance, $message } from '@nio-fe/lego';
import { ref } from 'vue';

const values = ref({
  name: '',
  category: 'Daily',
});
const instance = ref<NFormInstance>();
const options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];

const onSubmit = async () => {
  await instance.value?.validate();
  $message.success('提交成功');
};
</script>

<style scoped></style>
