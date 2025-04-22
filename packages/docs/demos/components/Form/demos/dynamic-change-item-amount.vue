<template>
  <n-form ref="formRef" :model="formData" :rules="rules" validate-trigger="blur" style="padding: 20px;" @submit="submit">
    <n-form-item label="操作域" prop="domain">
      <n-input v-model="formData.domain" placeholder="Please input domain">
        <template #append>.com</template>
      </n-input>
    </n-form-item>
    <n-form-item
      v-for="(_, index) of formData.users"
      :label="`用户 ${index + 1}`"
      :prop="`users[${index}].value`"
      :rules="{
          required: true,
          message: '用户必填',
        }"
      validate-trigger="change"
    >
      <n-row :gutter="0">
        <n-col :span="18">
          <n-input v-model="formData.users[index].value" />
        </n-col>
        <n-col :span="6" class="text-right">
          <n-space>
            <n-button v-show="index === formData.users.length - 1" icon="add" @click="addUser">增加</n-button>
            <n-button icon="rubbish" type="danger" @click="del(index)">删除</n-button>
          </n-space>
        </n-col>
      </n-row>
    </n-form-item>
    <div>
      <n-space>
        <n-button icon="check" native-type="submit">提交</n-button>
      </n-space>
    </div>
  </n-form>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import type { NFormInstance, NFormRule } from '@nio-fe/lego';
import { $message } from '@nio-fe/lego';
import { Arrayable } from '@nio-fe/shared';

const formRef = ref<NFormInstance | null>(null);
const formData = ref({
  domain: '',
  users: [{
    value: '',
  }],
});

const rules: Ref<Partial<Record<keyof typeof formData.value, Arrayable<NFormRule>>>> = ref({
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
        console.log('errors:', errors);
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
