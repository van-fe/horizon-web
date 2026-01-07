<template>
  <div>
    <h-upload
      v-model="fileList"
      type="img"
      :multiple="true"
      :limit="5"
      :operators="['status', 'delete', 'download']"
      :upload-options="uploadOptions"
      :before-upload="beforeUpload"
      @preview="onPreview"
      @download="onDownload"
      @update:modelValue="onUpdate"
    />
    <h-button class="mr-2 mt-4" @click="getFileList">get fileList</h-button>
    <h-button @click="clear">clear</h-button>
    <!--  -->
    <h-viewer v-model="visibleRef" :sources="imagesRef" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { demoUrl } from './mock-server';

export default defineComponent({
  setup() {
    const uploadOptions = () => {
      return new Promise(res => {
        res({
          requestOptions: {
            url: demoUrl,
          },
        });
      });
    };

    const fileList = ref([
      {
        name: 'a1.png',
        type: 'image/png',
        helpName: 'a1',
        size: 8998,
        displayType: 'img',
        status: 'success',
        thumbnail: 'https://groot-test.nioint.com/api/box/download?slug=62e4abb45b5a7a62f84f4b4b',
      },
      {
        name: 'a2.png',
        type: 'image/png',
        helpName: 'a2',
        size: 1420,
        displayType: 'img',
        status: 'success',
        thumbnail: 'https://groot-test.nioint.com/api/box/download?slug=62e4abde6baf8234493176cc',
      },
    ]);

    const getFileList = () => {
      console.info(fileList.value);
    };

    const beforeUpload = files => {
      return new Promise(res => {
        // 过滤掉非图片的文件
        const arr = [];
        // files是类数组，没有filter、forEach等方法
        for (let i = 0; i < files.length; i++) {
          if (files[i].size < 1024 * 1024 * 5) {
            arr.push(files[i]);
          }
        }
        res(arr);
      });
    };

    const clear = () => {
      fileList.value.forEach(v => {
        if (v.delete && typeof v.delete === 'function') {
          v.delete();
        }
      });
      fileList.value = [];
    };

    const overLimited = files => {
      if (files.length) {
        alert('以下文件超过上传数量限制：', files.map(v => v.name).join());
      }
    };

    const visibleRef = ref(false);
    const imagesRef = ref([]);

    const onPreview = file => {
      if (file.type.includes('image')) {
        imagesRef.value = [
          {
            type: 'image',
            thumbnail: file.thumbnail,
            cover: file.thumbnail,
            title: `Image`,
          },
        ];
        visibleRef.value = true;
      } else {
        console.info(file, 'preview');
      }
    };

    const onDownload = async file => {
      // 根据自己的实际情况获取下载链接
      const downloadUrl = (file.response && file.response.data) || file.thumbnail;
      if (downloadUrl) {
        const source = await fetch(downloadUrl);
        const sourceBlob = await source.blob();
        const sourceURL = URL.createObjectURL(sourceBlob);
        const link = document.createElement('a');
        link.href = sourceURL;
        link.download = file.name || String(Date.now());
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.info(file, 'download');
      }
    };

    const onUpdate = files => {
      files.forEach(v => {
        if (v.type.includes('image')) {
          v.displayType = 'img';
          // 根据接口的实际情况获取预览链接
          // if (v.status === 'success' && v.response) {
          //   v.thumbnail = v.response.data;
          // }
          // 自己本地生成
          if (v.status === 'success' && v.file) {
            v.thumbnail = window.URL.createObjectURL(v.file);
          }
        }
      });
    };

    return {
      uploadOptions,
      clear,
      fileList,
      getFileList,
      beforeUpload,
      overLimited,
      onPreview,
      onDownload,
      onUpdate,
      imagesRef,
      visibleRef,
    };
  },
});
</script>
