<template>
  <div class="mb-4">
    <h-upload-button icon="rubbish" text="自定义图标" @change="onChange"></h-upload-button>
    <div>自定义渲染按钮内的部分</div>
    <h-upload-button @change="onChange">
      <template #default="props">
        <h-button size="medium" type="danger" plain @click="props.onClick">上传</h-button>
      </template>
    </h-upload-button>
  </div>
  <div class="custom-render-all mb-4" @click="getFile">
    通过getUploadFile函数获取文件，完全自定义渲染，点击试一下
  </div>
  <!--  -->
  <strong>用n-upload-button和UploadHelper实现一个上传组件</strong>
  <h-upload-button
    multiple
    :limit="5"
    :upload-file-list="uploadFileList"
    @change="onChangeToUpload"
  ></h-upload-button>
</template>

<script>
import { defineComponent } from 'vue';
import { NUpload } from '@aurora/horizon-web';
import { demoUrl } from './mock-server';

export default defineComponent({
  data() {
    return {
      uploadFileList: [
        {
          name: 'abc.png',
          type: 'image/png',
          helpName: 'abc',
          size: 9185,
          displayType: 'img',
          status: 'success',
          thumbnail: 'https://groot-test.nioint.com/api/box/download?slug=62e4abb45b5a7a62f84f4b4b',
        },
        {
          name: 'def.png',
          type: 'image/png',
          helpName: 'def',
          size: 9185,
          displayType: 'img',
          status: 'uploading',
          progress: 35,
        },
      ],
      uploadHelper: {},
    };
  },
  mounted() {
    const _this = this;
    this.uploadHelper = new NUpload.UploadHelper({
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
          _this.uploadFileList = _this.uploadFileList.filter(v => v.helpName !== file.helpName);
        } else if ((idx = _this.uploadFileList.findIndex(v => v.helpName === file.helpName)) > -1) {
          _this.uploadFileList[idx] = { ...file };
        } else {
          _this.uploadFileList.push(file);
        }
      },
    });
  },
  methods: {
    getFile() {
      NUpload.getUploadFile({
        onChange: files => {
          console.info('got files with getUploadFile', files);
        },
      });
    },
    onChange(files) {
      console.info('got files', files);
    },
    onChangeToUpload(files) {
      if (files && files.length > 0) {
        this.uploadHelper.addFiles(files);
      }
    },
  },
});
</script>

<style scoped>
.custom-render-all {
  width: 260px;
  height: 100px;
  padding: 20px;
  border: 1px solid #000;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
