<template>
  <n-switch v-model="disabled" label="禁用" status />
  <n-form :model="formModel" :rules="rules">
    <n-form-item label="Input" prop="val1">
      <n-input v-model="formModel.val1" :disabled="disabled" :maxlength="10" show-limit />
    </n-form-item>
    <n-form-item label="Input enable out of exceeded" prop="val2">
      <n-input
        v-model="formModel.val2"
        :disabled="disabled"
        :maxlength="10"
        show-limit
        enable-out-of-exceeded
      />
    </n-form-item>
    <n-form-item label="Textarea" prop="val3">
      <n-input
        v-model="formModel.val3"
        :disabled="disabled"
        type="textarea"
        :maxlength="100"
        :rows="3"
        show-limit
      />
    </n-form-item>
    <n-form-item label="Textarea enable out of exceeded" prop="val4">
      <n-input
        v-model="formModel.val4"
        :disabled="disabled"
        type="textarea"
        :maxlength="100"
        :rows="1"
        show-limit
        enable-out-of-exceeded
      />
    </n-form-item>
  </n-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { NFormRule } from '@nio-fe/lego';

export default defineComponent({
  setup() {
    const disabled = ref(false);
    const formModel = ref({
      val1: '',
      val2: '',
      val3: '',
      val4: '',
    });

    const rules = ref<Record<string, NFormRule | NFormRule[]>>({
      val1: {
        max: 10,
        message: 'Please enter less than 10 characters',
      },
      val2: {
        max: 10,
        message: 'Please enter less than 10 characters',
      },
      val3: {
        max: 100,
        message: 'Please enter less than 100 characters',
      },
      val4: {
        max: 100,
        message: 'Please enter less than 100 characters',
      },
    });

    return {
      formModel,
      rules,
      disabled,
    };
  },
});
</script>
