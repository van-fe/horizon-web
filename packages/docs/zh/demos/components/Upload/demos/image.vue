<template>
  <div>
    <strong>各种尺寸和比例</strong>
    <div class="flex-box">
      <h-select v-model="size" class="mr-2">
        <h-option
          v-for="item in ['large', 'medium', 'small']"
          :key="item"
          :value="item"
          :label="item"
        ></h-option>
      </h-select>
      <h-select v-model="proportion">
        <h-option
          v-for="item in ['square', 'rectangle']"
          :key="item"
          :value="item"
          :label="item"
        ></h-option>
      </h-select>
    </div>
    <div>带展示列表和上传按钮</div>
    <h-upload-img
      class="mb-4"
      :upload-file-list="uploadFileList"
      :size="size"
      :proportion="proportion"
      :listen-clip-borad="clipboradOptions"
      @change="onChange"
    />
    <div>通过readonly属性设置，只展示列表，不展示上传按钮</div>
    <h-upload-img
      :upload-file-list="uploadFileList"
      :size="size"
      :proportion="proportion"
      readonly
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { NUpload } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    const size = ref('medium');
    const proportion = ref('rectangle');

    const uploadFileList = ref([
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
      {
        name: 'ghi.pptx',
        type: 'pptx',
        helpName: 'ghi',
        size: 12345,
        displayType: 'file',
        status: 'success',
      },
    ]);

    return {
      size,
      proportion,
      uploadFileList,
      onChange(fileArr) {
        console.info(fileArr, 'onChange');
        uploadFileList.value = uploadFileList.value.concat(
          fileArr.map(v => ({
            name: v.name,
            type: v.type,
            size: v.size,
            helpName: NUpload.nanoid(),
            displayType: 'file',
            status: 'success',
          })),
        );
      },
      clipboradOptions: {
        enable: true,
        filter: files => {
          console.info(files, 'xxxxx');
          return files.filter(v => v.type.startsWith('image'));
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
