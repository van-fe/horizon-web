<template>
  <h-space>
    <h-button type="normal" @click="visible = true">打开抽屉</h-button>
    <h-checkbox v-model="destroyOnClose">关闭销毁</h-checkbox>
  </h-space>
  <h-drawer
    v-model:visible="visible"
    :destroy-oh-close="destroyOnClose"
    v2
    title="User Information"
    placement="right"
    @ok="onOk"
  >
    <UserForm ref="inst" />
  </h-drawer>
</template>

<script lang="tsx" setup>
import { ref, defineComponent, reactive } from 'vue';
import { $message, NForm, NFormInstance, NFormItem, NInput } from '@aurora/horizon-web';

const inst = ref<any>();
const destroyOnClose = ref(false);

const UserForm = defineComponent({
  setup(props, { expose }) {
    const formValues = reactive({ username: '' });
    const inst = ref<NFormInstance>();

    expose({
      validate: () => inst.value?.validate(),
      getValues: () => formValues,
    });

    return () => (
      <NForm ref="inst" model={formValues}>
        <NFormItem label="Name" prop="username">
          <NInput
            modelValue={formValues.username}
            onUpdate:modelValue={v => (formValues.username = v)}
          />
        </NFormItem>
      </NForm>
    );
  },
});

const onOk = async () => {
  await inst.value.validate();
  const values = inst.value.getValues();
  $message.success(`Submit：${values.username}`);
  visible.value = false;
};

const visible = ref(false);
</script>
