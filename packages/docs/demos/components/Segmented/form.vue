<template>
  <h-form ref="instance" :model="values">
    <h-form-item label="Name" prop="name" style="width: 300px" required>
      <h-input v-model="values.name" />
    </h-form-item>
    <h-form-item label="Category" prop="category" required>
      <h-segmented v-model:active-key="values.category" form>
        <h-segmented-item v-for="v in options" :key="v" :label="v" />
      </h-segmented>
    </h-form-item>
    <h-space>
      <h-button @click="onSubmit">Submit</h-button>
      <h-button type="danger" @click="instance?.validate()">Validate</h-button>
    </h-space>
  </h-form>
</template>

<script setup lang="ts">
import { HFormInstance, $message } from '@aurora/horizon-web';
import { ref } from 'vue';

const values = ref({
  name: '',
  category: undefined,
});
const instance = ref<HFormInstance>();
const options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];

const onSubmit = async () => {
  await instance.value?.validate();
  $message.success('提交成功');
};
</script>

<style scoped></style>
