import { inject } from 'vue';
import {
  HTagGroupCloseCallbackInjectKey,
  HTagGroupDoCollapseInjectKey,
  HTagGroupEditCallbackInjectKey,
  HTagGroupEditingNoticeInjectKey,
  HTagGroupNoticeTagMountedInjectKey,
  HTagGroupNoticeTagUnmountedInjectKey,
  HTagGroupPropsInjectKey,
  HTagGroupSizeInjectKey,
} from '../utils/injectKeys';

/** Reads the optional TagGroup renderer context consumed by an individual Tag. */
export function useTagGroupContext() {
  return {
    parentProps: inject(HTagGroupPropsInjectKey, undefined),
    parentSize: inject(HTagGroupSizeInjectKey, undefined),
    onEditingNotice: inject(HTagGroupEditingNoticeInjectKey, undefined),
    onEditNotice: inject(HTagGroupEditCallbackInjectKey, undefined),
    onCloseNotice: inject(HTagGroupCloseCallbackInjectKey, undefined),
    onMountedNotice: inject(HTagGroupNoticeTagMountedInjectKey, undefined),
    onUnmountedNotice: inject(HTagGroupNoticeTagUnmountedInjectKey, undefined),
    doCollapse: inject(HTagGroupDoCollapseInjectKey, undefined),
  };
}
