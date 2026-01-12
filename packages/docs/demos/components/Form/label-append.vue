<template>
  <h-form label-position="top" @submit="submit">
    <h-form-item label="User name">
      <h-input v-model="formData.username" />
    </h-form-item>
    <h-form-item label="Tags">
      <template #labelAppend>
        <h-button link icon="add" size="small" @click="addTag">增加</h-button>
      </template>
      <h-tag-group>
        <h-tag v-for="item of tags" :key="item">Tag {{ item }}</h-tag>
      </h-tag-group>
    </h-form-item>
    <h-form-item>
      <h-button native-type="submit">Submit</h-button>
    </h-form-item>
  </h-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { $message } from '@aurora/horizon-web';

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
  console.info('formData:', formData.value);
  $message.success('Submit');
};
</script>
