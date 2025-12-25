<template>
  <div>
    <n-upload
      v-model="fileList"
      :multiple="true"
      :limit="5"
      :operators="['status', 'delete', 'download']"
      :upload-options="uploadOptions"
      :before-upload="beforeUpload"
      @preview="onPreview"
      @download="onDownload"
      @update:modelValue="onUpdate"
    />
    <n-button class="mr-2 mt-4" @click="getFileList">get fileList</n-button>
    <n-button @click="clear">clear</n-button>
    <!--  -->
    <n-viewer v-model="visibleRef" :sources="imagesRef" />
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
            method: 'xxx',
            headers: {
              a: 1,
              b: 2,
            },
            data: {
              name: '123123',
            },
          },
          customRequest: ({ onChange, url, method, withCredentials, headers, data }) => {
            console.info(url, method, withCredentials, headers, data);
            onChange({ status: 'uploading', progress: 0 });
            setTimeout(() => {
              onChange({ status: 'success', progress: 100 });
            }, 2000);

            return {
              abort: () => {
                console.info('abort');
              },
            };
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
          if (v.status === 'success' && v.response) {
            v.thumbnail = v.response.data;
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
