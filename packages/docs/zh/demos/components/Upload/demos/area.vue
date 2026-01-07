<template>
  <div>
    <strong>只选择文件</strong>
    <h-upload-area class="mb-4" text="请上传文件" @change="changeHandle1" />

    <strong>组合n-upload-area和n-upload-preview-file-item来实现一个上传</strong>
    <div class="mb-2">
      <h-upload-area
        text="请上传文件"
        accept="image/*"
        multiple
        :listen-clip-borad="clipboradOptions"
        @change="changeHandle2"
      />
    </div>
    <div v-for="item in uploadFileList" :key="item.helpName" class="mb-2">
      <h-upload-preview-file-item
        :file="item"
        :operators="['status', 'delete']"
        @delete="delHandle"
        @retry="item.retry"
        @pause="item.pause"
        @resume="item.resume"
        @preview="previewHandle"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { NUpload } from '@aurora/horizon-web';
import { demoUrl } from './mock-server';

export default defineComponent({
  setup() {
    const uploadFileList = ref([]);
    const uploadHelper = new NUpload.UploadHelper({
      request({ file, onChange, data }) {
        const xhr = NUpload.xhrUpload({
          url: demoUrl,
          file,
          onChange: ({ status, progress, response, error }) => {
            onChange({ status, progress, response, error });
          },
          data,
        });

        return xhr;
      },
      onChange(file) {
        let idx;
        if (file.status === 'deleted') {
          uploadFileList.value = uploadFileList.value.filter(v => v.helpName !== file.helpName);
        } else if ((idx = uploadFileList.value.findIndex(v => v.helpName === file.helpName)) > -1) {
          uploadFileList.value[idx] = { ...file };
        } else {
          uploadFileList.value.push(file);
        }
      },
    });

    const changeHandle1 = files => {
      console.info(files, 'changeHandle1');
    };

    const changeHandle2 = files => {
      if (files && files.length > 0) {
        const arr = [];
        for (let i = 0; i < files.length; i++) {
          if (files[i].size < 1024 * 1024 * 5) {
            arr.push(files[i]);
          }
        }
        uploadHelper.addFiles(arr);
      }
    };

    const delHandle = file => {
      file.delete?.();
      uploadFileList.value = uploadFileList.value.filter(item => item.helpName !== file.helpName);
    };

    const previewHandle = file => {
      if (file.response && file.response.data) {
        window.open(file.response.data);
      }
    };

    return {
      uploadFileList,
      changeHandle1,
      changeHandle2,
      delHandle,
      previewHandle,
      clipboradOptions: {
        enable: false,
        filter: files => {
          console.info(files, 'xxxxx');
          return files;
        },
      },
    };
  },
});
</script>

<style scoped>
.flex-box {
  display: flex;
  height: 80px;
  align-items: center;
}
</style>
