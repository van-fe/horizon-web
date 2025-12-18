import type { UploadV2Props } from '../composables/useProps';
import type { ToRefs } from 'vue';
import { ref, watch } from 'vue';

export default class UploadHelperOptions {
  protected props?: ToRefs<Partial<UploadV2Props>>;
  protected id: string | undefined = undefined;
  protected maxUploadsAmountAtSameTime = Infinity;
  protected multipartMaxAmountUploadingAtSameTime = 5;
  protected handleSuccess: UploadV2Props['handleSuccess'] | undefined;
  protected header: Exclude<UploadV2Props['header'], undefined> = {};
  protected data: Exclude<UploadV2Props['data'], undefined> = {};
  protected beforeUpload: UploadV2Props['beforeUpload'] | undefined;
  protected multipart: UploadV2Props['multipart'] = false;
  protected method: UploadV2Props['method'] = 'POST';
  protected action: UploadV2Props['action'] = '';
  protected withCredentials: UploadV2Props['withCredentials'] = false;
  protected name: UploadV2Props['name'] = 'file';
  protected accept = ref<UploadV2Props['accept']>('*');
  protected acceptStrict = ref<UploadV2Props['acceptStrict']>(false);
  protected multiple = ref<UploadV2Props['multiple']>(false);
  protected autoSliceExceedFiles = ref<UploadV2Props['autoSliceExceedFiles']>(true);
  protected fileSizeLimit: UploadV2Props['fileSizeLimit'] | undefined;
  protected limit: UploadV2Props['limit'] = Infinity;
  protected autoUpload: UploadV2Props['autoUpload'] = false;
  protected beforeRemove: UploadV2Props['beforeRemove'] | undefined;
  protected beforeAbort: UploadV2Props['beforeAbort'] | undefined;
  protected multipartChunkSize: UploadV2Props['multipartChunkSize'] = 5;
  protected httpRequest: UploadV2Props['httpRequest'] | undefined;

  constructor(props?: ToRefs<Partial<UploadV2Props>>) {
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
