<template>
  <n-form label-position="top" @submit="submit">
    <n-form-item label="User name">
      <n-input v-model="formData.username" />
    </n-form-item>
    <n-form-item label="Tags">
      <template #labelAppend>
        <n-button link icon="add" size="small" @click="addTag">增加</n-button>
      </template>
      <n-tag-group>
        <n-tag v-for="item of tags" :key="item">Tag {{ item }}</n-tag>
      </n-tag-group>
    </n-form-item>
    <n-form-item>
      <n-button native-type="submit">Submit</n-button>
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { $message } from '@nio-fe/lego';

const formData = ref({
  username: '',
  email: '',
  notes: '',
});

const tags = ref<string[]>([]);

function addTag() {
  tags.value.push((tags.value.length + 1).toString());
}

const submit = () => {
  console.log('formData:', formData.value);
  $message.success('Submit');
};
</script>
