import type { ExtractPropTypes, PropType } from 'vue';

export const usePopconfirmProps = {
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: false,
  },
  type: {
    type: String as PropType<'none' | 'info' | 'success' | 'warning' | 'error'>,
    required: false,
  },
  /**
   * 自定义图标名称
   */
  iconName: {
    type: String,
    required: false,
  },
  /**
   * 自定义图标大小
   */
  iconSize: {
    type: String,
    required: false,
  },
  /**
   * 自定义图标颜色
   */
  iconColor: {
    type: String,
    required: false,
  },
  okText: {
    type: String,
    required: false,
  },
  okButtonProps: {
    type: Object,
    required: false,
  },
  cancelText: {
    type: String,
    required: false,
  },
  cancelButtonProps: {
    type: Object,
    required: false,
  },
  zIndex: {
    type: Number,
    required: false,
  },
};

export type PopconfirmProps = ExtractPropTypes<typeof usePopconfirmProps>;
