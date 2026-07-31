<template>
  <h-form ref="formRef" :model="formData" :rules="rules" validate-trigger="blur" style="padding: 20px;" @submit="submit">
    <h-form-item label="操作域" prop="domain">
      <h-input v-model="formData.domain" placeholder="Please input domain">
        <template #append>.com</template>
      </h-input>
    </h-form-item>
    <h-form-item
      v-for="(_, index) of formData.users"
      :label="`用户 ${index + 1}`"
      :prop="`users[${index}].value`"
      :rules="{
          required: true,
          message: '用户必填',
        }"
      validate-trigger="change"
    >
      <h-grid :gap="0">
        <h-grid-item :span="18">
          <h-input v-model="formData.users[index].value" />
        </h-grid-item>
        <h-grid-item :span="6" class="text-right">
          <h-space>
            <h-button v-show="index === formData.users.length - 1" icon="add" @click="addUser">增加</h-button>
            <h-button icon="rubbish" type="danger" @click="del(index)">删除</h-button>
          </h-space>
        </h-grid-item>
      </h-grid>
    </h-form-item>
    <div>
      <h-space>
        <h-button icon="check" native-type="submit">提交</h-button>
      </h-space>
    </div>
  </h-form>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import type { HFormInstance, HFormRule } from '@aurora/horizon-web';
import { $message } from '@aurora/horizon-web';
import { Arrayable } from '@aurora/utils';

const formRef = ref<HFormInstance | null>(null);
const formData = ref({
  domain: '',
  users: [{
    value: '',
  }],
});

const rules: Ref<Partial<Record<keyof typeof formData.value, Arrayable<HFormRule>>>> = ref({
  domain: {
    required: true,
    message: 'Domain is required!',
  },
});

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

function addUser() {
  formData.value.users.push({
    value: '',
  });
}

function del(index: number) {
  formData.value.users.splice(index, 1);
}
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
