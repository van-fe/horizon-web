<template>
  <div>
    <strong>文件单选</strong>
    <h-upload
      class="mb-2"
      :limit="3"
      :upload-options="uploadObjOptions"
      :listen-clip-borad="clipboradOptions"
      @overLimited="overLimited"
    />

    <strong>文件多选</strong>
    <div>
      此例中还展示了选择文件后通过change事件获取选中的文件，以及超过上传数量限制的文件，通过overLimited事件进行打印的场景
    </div>
    <h-upload
      class="mb-2"
      multiple
      :limit="3"
      :upload-options="uploadObjOptions"
      @change="onChange"
      @overLimited="overLimited"
    />

    <strong>禁用</strong>
    <h-upload class="mb-2" :upload-options="uploadObjOptions" disabled />

    <strong>限制类型，此例只允许上传图片</strong>
    <h-upload class="mb-2" accept="image/*" :limit="3" :upload-options="uploadObjOptions" />

    <strong>uploadOptions使用函数形式</strong>
    <div>
      uploadOptions是对UploadHelper的RequestOptions参数和CustomRequest参数的封装，其中NUpload实现了CustomRequest的onChange函数，具体可参考UploadHelper的文档
    </div>
    <h-upload class="mb-2" :limit="3" :upload-options="uploadFuncOptions" />

    <strong>v-model传入预置文件列表</strong>
    <h-upload
      v-model="fileList1"
      class="mb-2"
      :limit="3"
      :upload-options="uploadObjOptions"
      @update:modelValue="onUpdate"
    />
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { demoUrl } from './mock-server';

export default defineComponent({
  setup() {
    const uploadObjOptions = {
      requestOptions: {
        url: demoUrl,
      },
      customRequest: async ({ onChange }) => {
        await new Promise(ress => {
          setTimeout(ress, 2000);
        });
        onChange({ status: 'uploading', progress: 0 });
        setTimeout(() => {
          onChange({ status: 'success', progress: 100 });
        }, 2000);
        return {
          abort: () => {
            console.info('xxx');
          },
        };
      },
    };

    const uploadFuncOptions = () => {
      return new Promise(res => {
        res({
          requestOptions: {
            url: demoUrl,
          },
          customRequest: async ({ onChange }) => {
            await new Promise(ress => {
              setTimeout(ress, 2000);
            });
            onChange({ status: 'uploading', progress: 0 });
            setTimeout(() => {
              onChange({ status: 'success', progress: 100 });
            }, 2000);
            return {
              abort: () => {
                console.info('xxx');
              },
            };
          },
        });
      });
    };

    const fileList1 = ref([
      {
        name: 'a1.png',
        type: 'image/png',
        helpName: 'a1',
        size: 9185,
        status: 'success',
        progress: 100,
      },
    ]);

    watch(fileList1, val => {
      console.info(val, 'fileList1 change');
    });

    const overLimited = fileArr => {
      console.info(fileArr, 'overLimited');
    };

    const onUpdate = fileArr => {
      console.info(fileArr, 'onUpdate');
    };

    const onChange = fileArr => {
      console.info(fileArr, 'onChange');
    };

    return {
      uploadObjOptions,
      uploadFuncOptions,
      fileList1,
      overLimited,
      onChange,
      onUpdate,
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
