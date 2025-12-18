<template>
  <div>
    <div class="mb-2">
      <n-select v-model="itemSize">
        <n-option
          v-for="item in ['large', 'medium', 'small']"
          :key="item"
          :value="item"
          :label="item"
        />
      </n-select>
    </div>
    <div v-for="item in lists" :key="item.id" class="mb-2">
      <n-upload-preview-file-item
        :id="item.id"
        :file-type="item.fileType"
        :size="itemSize"
        :file-name="item.fileName"
        :file-size="item.fileSize"
        :upload-status="item.uploadStatus"
        :upload-progress="item.uploadProgress"
      />
    </div>

    <div v-for="item in lists" :key="item.id" class="mb-2">
      <n-upload-preview-img-item
        :id="item.id"
        :file-type="item.fileType"
        :size="itemSize"
        :file-name="item.fileName"
        :file-size="item.fileSize"
        :upload-status="item.uploadStatus"
        :upload-progress="item.uploadProgress"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const itemSize = ref('medium');
    const lists = ref([
      {
        id: 'a2fds',
        fileType: 'application/pdf',
        fileSize: 123456,
        fileName: 'abcd.pdf',
        uploadStatus: 'success',
      },
      {
        id: 'afds2',
        fileType: 'application/pdf',
        fileSize: 123456,
        fileName: 'abcd123.pdf',
        uploadProgress: 45,
        uploadStatus: 'paused',
      },
      {
        id: 'afd2s',
        fileType: 'application/pdf',
        fileSize: 123456,
        fileName: 'abcd1234.pdf',
        uploadProgress: 99,
        uploadStatus: 'uploading',
      },
      {
        id: 'a2fd23s',
        fileType: 'application/pdf',
        fileSize: 123456,
        fileName: 'abcd.pdf',
        uploadStatus: 'error',
      },
    ]);

    return {
      lists,
      itemSize,
    };
  },
});
</script>
