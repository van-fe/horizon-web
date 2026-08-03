import type { UploadProps } from '../composables/useProps';
import type { ToRefs } from 'vue';
import { ref, watch } from 'vue';

export default class UploadHelperOptions {
  protected props?: ToRefs<Partial<UploadProps>>;
  protected id: string | undefined = undefined;
  protected maxUploadsAmountAtSameTime = Infinity;
  protected multipartMaxAmountUploadingAtSameTime = 5;
  protected handleSuccess: UploadProps['handleSuccess'] | undefined;
  protected header: Exclude<UploadProps['header'], undefined> = {};
  protected data: Exclude<UploadProps['data'], undefined> = {};
  protected beforeUpload: UploadProps['beforeUpload'] | undefined;
  protected multipart: UploadProps['multipart'] = false;
  protected method: UploadProps['method'] = 'POST';
  protected action: UploadProps['action'] = '';
  protected withCredentials: UploadProps['withCredentials'] = false;
  protected name: UploadProps['name'] = 'file';
  protected accept = ref<UploadProps['accept']>('*');
  protected acceptStrict = ref<UploadProps['acceptStrict']>(false);
  protected multiple = ref<UploadProps['multiple']>(false);
  protected autoSliceExceedFiles = ref<UploadProps['autoSliceExceedFiles']>(true);
  protected fileSizeLimit: UploadProps['fileSizeLimit'] | undefined;
  protected limit: UploadProps['limit'] = Infinity;
  protected autoUpload: UploadProps['autoUpload'] = false;
  protected beforeRemove: UploadProps['beforeRemove'] | undefined;
  protected beforeAbort: UploadProps['beforeAbort'] | undefined;
  protected multipartChunkSize: UploadProps['multipartChunkSize'] = 5;
  protected httpRequest: UploadProps['httpRequest'] | undefined;

  constructor(props?: ToRefs<Partial<UploadProps>>) {
    this.props = props;

    this.loadProps();

    watch(
      () => props,
      () => {
        this.loadProps();
      },
      {
        deep: true,
      },
    );
  }

  private loadProps() {
    this.id = this.props?.id?.value;
    this.maxUploadsAmountAtSameTime = this.props?.maxUploadsAmountAtSameTime?.value ?? Infinity;
    this.multipartMaxAmountUploadingAtSameTime =
      this.props?.multipartMaxAmountUploadingAtSameTime?.value ?? 5;
    this.handleSuccess = this.props?.handleSuccess?.value;
    this.header = this.props?.header?.value ?? {};
    this.data = this.props?.data?.value ?? {};
    this.beforeUpload = this.props?.beforeUpload?.value;
    this.multipart = this.props?.multipart?.value ?? false;
    this.method = this.props?.method?.value ?? 'POST';
    this.action = this.props?.action?.value ?? '';
    this.withCredentials = this.props?.withCredentials?.value ?? false;
    this.name = this.props?.name?.value ?? 'file';
    this.accept.value = this.props?.accept?.value ?? '*';
    this.acceptStrict.value = this.props?.acceptStrict?.value ?? false;
    this.multiple.value = this.props?.multiple?.value ?? false;
    this.autoSliceExceedFiles.value = this.props?.autoSliceExceedFiles?.value ?? true;
    this.fileSizeLimit = this.props?.fileSizeLimit?.value;
    this.limit = this.props?.limit?.value ?? Infinity;
    this.autoUpload = this.props?.autoUpload?.value ?? false;
    this.beforeRemove = this.props?.beforeRemove?.value;
    this.beforeAbort = this.props?.beforeAbort?.value;
    this.multipartChunkSize = this.props?.multipartChunkSize?.value ?? 5;
    this.httpRequest = this.props?.httpRequest?.value;
  }
}
