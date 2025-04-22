export { useZIndex, generatorInjectedKeyName, useNamespace, setNamespace } from '@nio-fe/shared';

export {
  default as LegoProvides,
  localizableProvide,
  defaultLocale,
  sensorTracker,
} from './provides';

export { LoadingService } from './directives/v-loading';

export {
  NUploadV2FileStatusEnum,
  NUploadV2FileTypeEnum,
  fileTypeMapping,
  fileTypeIconMapping,
} from './components/UploadV2';

export { default as dayjs } from './utils/useDayJs';

export * from './styles';
