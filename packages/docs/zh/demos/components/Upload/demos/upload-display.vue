<template>
  <div>
    <strong>改变大小</strong>
    <n-select v-model="size" class="mr-2">
      <n-option
        v-for="item in ['large', 'medium', 'small']"
        :key="item"
        :value="item"
        :label="item"
      ></n-option>
    </n-select>
    <strong>改变显示比例，仅对图片墙形式（NUploadImage、NUploadPreviewImgItem）生效</strong>
    <n-select v-model="proportion" class="mb-4">
      <n-option
        v-for="item in ['square', 'rectangle']"
        :key="item"
        :value="item"
        :label="item"
      ></n-option>
    </n-select>
    <!--  -->
    <strong>文件列表展示形式</strong>
    <div>此例中还展示了如何使用operators具名插槽来自定义操作按钮</div>
    <n-upload
      v-model="fileList"
      class="mb-4"
      type="list"
      :size="size"
      :limit="5"
      :operators="['status', 'delete']"
      :upload-options="uploadOptions"
      :before-upload="beforeUpload"
      @preview="onPreview"
      @update:modelValue="onUpdate"
    >
      <template #operators="file">
        <a-icon style="margin-left: 4px" name="download" color="red" @click="onDownload(file)" />
      </template>
    </n-upload>
    <!--  -->
    <strong>图片墙展示形式</strong>
    <n-upload
      v-model="fileList"
      type="img"
      :size="size"
      :proportion="proportion"
      :limit="5"
      :operators="['status', 'delete', 'download']"
      :upload-options="uploadOptions"
      :before-upload="beforeUpload"
      @preview="onPreview"
      @download="onDownload"
      @update:modelValue="onUpdate"
    />
    <!--  -->
    <n-viewer v-model="visibleRef" :sources="imagesRef" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { demoUrl } from './mock-server';
import { AIcon } from '@aurora/icon';

export default defineComponent({
  components: {
    AIcon,
  },
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

    const size = ref('medium');
    const proportion = ref('rectangle');

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
      size,
      proportion,
    };
  },
});
</script>
