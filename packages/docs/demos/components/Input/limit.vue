<template>
  <h-switch v-model="disabled" label="禁用" status />
  <h-form :model="formModel" :rules="rules">
    <h-form-item label="Input" prop="val1">
      <h-input v-model="formModel.val1" :disabled="disabled" :maxlength="10" show-limit />
    </h-form-item>
    <h-form-item label="Input enable out of exceeded" prop="val2">
      <h-input
        v-model="formModel.val2"
        :disabled="disabled"
        :maxlength="10"
        show-limit
        enable-out-of-exceeded
      />
    </h-form-item>
    <h-form-item label="Textarea" prop="val3">
      <h-input
        v-model="formModel.val3"
        :disabled="disabled"
        type="textarea"
        :maxlength="100"
        :rows="3"
        show-limit
      />
    </h-form-item>
    <h-form-item label="Textarea enable out of exceeded" prop="val4">
      <h-input
        v-model="formModel.val4"
        :disabled="disabled"
        type="textarea"
        :maxlength="100"
        :rows="1"
        show-limit
        enable-out-of-exceeded
      />
    </h-form-item>
  </h-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { HFormRule } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    const disabled = ref(false);
    const formModel = ref({
      val1: '',
      val2: '',
      val3: '',
      val4: '',
    });

    const rules = ref<Record<string, HFormRule | HFormRule[]>>({
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
