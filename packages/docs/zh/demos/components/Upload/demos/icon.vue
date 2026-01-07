<template>
  <div>
    <strong>默认图标</strong>
    <div>列表形式</div>
    <div
      v-for="item in filetypes.map(v => ({
        helpName: v,
        type: v,
        name: `abcd.${v}`,
        size: '12345',
        status: 'success',
      }))"
      :key="item"
      class="mb-2"
    >
      <h-upload-preview-file-item :file="item" />
    </div>
    <div>图片形式</div>
    <div class="mb-4" style="display: flex; flex-wrap: wrap">
      <div
        v-for="item in filetypes.map(v => ({
          helpName: v,
          type: v,
          name: `abcd.${v}`,
          size: '12345',
          status: 'success',
        }))"
        :key="item"
        class="mb-2"
        style="margin-right: 10px"
      >
        <h-upload-preview-img-item :file="item" />
      </div>
    </div>

    <strong>自定义图标</strong>
    <div>列表形式</div>
    <h-upload-preview-file-item
      :file="{
        helpName: 'abcd',
        name: 'abcd.pdf',
        type: 'application/pdf',
        size: 1234,
        status: 'success',
      }"
      :mime-icons="{
        pdf: (fileType, fileName) => ({
          name: 'ticket',
          color: '#24A7B2',
        }),
      }"
    />
    <div>此例展示了specialFileType的使用</div>
    <h-upload-preview-file-item
      class="mb-4"
      :file="{
        helpName: 'abcd',
        name: 'abcd.pdf',
        type: 'application/pdf',
        size: 1234,
        status: 'success',
        specialFileType: 'weibo',
      }"
      :mime-icons="{
        weibo: (fileType, fileName) => ({
          name: 'weibo',
          color: '#24A7B2',
        }),
      }"
    />
    <div>图片形式</div>
    <h-upload-preview-img-item
      :file="{
        helpName: 'abcd',
        name: 'abcd.pdf',
        type: 'application/pdf',
        size: 1234,
        status: 'success',
      }"
      :mime-icons="{
        pdf: (fileType, fileName) => ({
          name: 'ticket',
          color: '#24A7B2',
        }),
      }"
    />
    <div>此例展示了specialFileType的使用</div>
    <h-upload-preview-img-item
      :file="{
        helpName: 'abcd',
        name: 'abcd.pdf',
        type: 'application/pdf',
        size: 1234,
        status: 'success',
        specialFileType: 'weibo',
      }"
      :mime-icons="{
        weibo: (fileType, fileName) => ({
          name: 'weibo',
          color: '#24A7B2',
        }),
      }"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const filetypes = ref([
      'application/pdf',
      'application/msword',
      'image/png',
      'image/jpeg',
      'application/vnd.ms-excel',
      'js',
      'application/zip',
      'video/mp4',
      'application/vnd.ms-powerpoint',
    ]);

    return {
      filetypes,
    };
  },
});
</script>
