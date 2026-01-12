<template>
  <h-form ref="formRef" :model="formData" validate-trigger="blur">
    <h-form-item
      label="User name"
      prop="username"
      :rules="[
        {
          required: true,
          message: 'User name is required!',
        },
        {
          min: 3,
          max: 100,
          message: 'User name should be 3 to 100.',
        },
      ]"
      validate-trigger="change"
    >
      <custom-input v-model="formData.username" />
    </h-form-item>
    <h-form-item label="Email" prop="email" :rules="emailRules">
      <custom-input v-model="formData.email" />
    </h-form-item>
    <h-form-item label="Notes" prop="notes">
      <h-input v-model="formData.notes" type="textarea" />
    </h-form-item>
    <div>
      <h-button @click="submit">Submit</h-button>
    </div>
  </h-form>
</template>

<script lang="ts">
import { defineComponent, ref, h, watch, inject } from 'vue';
import type { NFormInstance } from '@aurora/horizon-web';
import { $message, NFormItemTriggerInjectedKey, NFormItemErrorInjectedKey } from '@aurora/horizon-web';
import { isString, isUndefined } from '@aurora/utils';

const CustomInput = defineComponent({
  name: 'CustomInput',
  props: {
    modelValue: {
      type: String,
    },
  },
  emits: {
    'update:modelValue': (val: string | undefined) => isString(val) || isUndefined(val),
    blur: () => true,
  },
  setup(props, { emit }) {
    const value = ref(props.modelValue);

    // form-item validate trigger
    const formItemTrigger = inject(NFormItemTriggerInjectedKey);
    const formItemError = inject(NFormItemErrorInjectedKey);

    watch(value, val => {
      emit('update:modelValue', val);
      formItemTrigger?.('change');
    });

    return () =>
      h('input', {
        class: { 'custom-input': true, 'is-error': !!formItemError?.value },
        value: value.value,
        onInput(evt: InputEvent) {
          value.value = (evt.target as HTMLInputElement).value;
        },
        onBlur() {
          emit('blur');
          formItemTrigger?.('blur');
        },
      });
  },
});

export default defineComponent({
  components: {
    CustomInput,
  },
  setup() {
    const formRef = ref<NFormInstance | null>(null);
    const formData = ref({
      username: '',
      email: '',
      notes: '',
    });
    const emailRules = ref([
      {
        required: true,
        message: 'Email is required!',
      },
      {
        type: 'email',
        message: 'Email format invalid!',
      },
      {
        validator(_: any, value: string) {
          if (!value.endsWith('@gmail.com')) {
            return new Error('Only support gmail!');
          }
          return true;
        },
      },
    ]);

    const submit = () => {
      if (formRef.value) {
        formRef.value?.validate()
          .then(() => {
            $message.success('Submit');
          })
          .catch(errors => {
            console.info('errors:', errors);
          });
      }
    };

    return {
      formData,
      emailRules,
      formRef,
      submit,
    };
  },
});
</script>

<style>
.custom-input {
  height: 30px;
  line-height: 30px;
  border: 1px solid #ccc;
  width: 100%;
  border-radius: 4px;
}

.custom-input.is-error {
  border-color: red;
}
</style>
