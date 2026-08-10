<template>
  <section class="form-custom-control-demo">
    <h-form
      ref="formRef"
      :model="formData"
      validate-trigger="blur"
      spacing="dynamic"
      @submit="submit"
    >
      <h-form-item
        label="Service name"
        prop="service"
        :rules="serviceRules"
        validate-trigger="change"
      >
        <CustomInput
          v-model="formData.service"
          label="Service name"
          placeholder="release-service"
        />
      </h-form-item>
      <h-form-item label="Owner email" prop="ownerEmail" :rules="emailRules">
        <CustomInput
          v-model="formData.ownerEmail"
          label="Owner email"
          placeholder="owner@example.com"
        />
      </h-form-item>
      <h-form-item label="Operational note">
        <h-input v-model="formData.note" type="textarea" placeholder="Optional handoff context" />
      </h-form-item>
      <h-form-item><h-button native-type="submit">Validate custom controls</h-button></h-form-item>
    </h-form>
    <p class="form-custom-control-demo__status" aria-live="polite">{{ status }}</p>
  </section>
</template>

<script setup lang="ts">
import {
  HFormItemErrorInjectedKey,
  HFormItemTriggerInjectedKey,
  type HFormInstance,
  type HFormRule,
} from '@aurora/horizon-web';
import { defineComponent, h, inject, reactive, ref, watch } from 'vue';

const CustomInput = defineComponent({
  name: 'FormDemoCustomInput',
  props: {
    modelValue: { type: String, default: '' },
    label: { type: String, required: true },
    placeholder: { type: String, default: '' },
  },
  emits: ['update:modelValue', 'blur'],
  setup(props, { emit }) {
    const value = ref(props.modelValue);
    const triggerValidation = inject(HFormItemTriggerInjectedKey);
    const error = inject(HFormItemErrorInjectedKey);

    watch(
      () => props.modelValue,
      nextValue => {
        if (nextValue !== value.value) value.value = nextValue;
      },
    );
    watch(value, nextValue => {
      emit('update:modelValue', nextValue);
      triggerValidation?.('change');
    });

    return () =>
      h('input', {
        class: ['form-custom-control-demo__input', { 'is-error': Boolean(error?.value) }],
        value: value.value,
        placeholder: props.placeholder,
        'aria-label': props.label,
        'aria-invalid': Boolean(error?.value),
        onInput(event: Event) {
          value.value = (event.target as HTMLInputElement).value;
        },
        onBlur() {
          emit('blur');
          triggerValidation?.('blur');
        },
      });
  },
});

const formRef = ref<HFormInstance | null>(null);
const formData = reactive({ service: '', ownerEmail: '', note: '' });
const status = ref('Custom controls are ready for input');
const serviceRules: HFormRule[] = [
  { required: true, message: 'Enter a service name' },
  { min: 3, message: 'Use at least 3 characters' },
];
const emailRules: HFormRule[] = [
  { required: true, message: 'Enter an owner email' },
  { type: 'email', message: 'Enter a valid email address' },
];

function submit() {
  formRef.value
    ?.validate()
    .then(() => {
      status.value = `Custom controls validated for ${formData.service}`;
    })
    .catch(() => {
      status.value = 'Review the custom control errors';
    });
}
</script>

<style scoped>
.form-custom-control-demo {
  display: grid;
  gap: var(--h-spacing-4);
}

.form-custom-control-demo__status {
  margin: 0;
  color: var(--h-text-secondary);
}

.form-custom-control-demo__input {
  box-sizing: border-box;
  width: 100%;
  height: var(--h-input-size-height);
  padding: 0 var(--h-spacing-3);
  border: 1px solid var(--h-border-default);
  border-radius: var(--h-radius-m);
  outline: none;
  color: var(--h-text-primary);
  background: var(--h-bg-default);
  font: inherit;
}

.form-custom-control-demo__input:focus-visible {
  border-color: var(--h-border-brand-default);
  box-shadow: 0 0 0 2px var(--h-bg-weak-default);
}

.form-custom-control-demo__input.is-error {
  border-color: var(--h-border-error-default);
}

.form-custom-control-demo__status {
  font-size: var(--h-text-sm);
}
</style>
