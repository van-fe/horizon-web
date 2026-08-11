import type { ExtractPropTypes, PropType } from 'vue';
import type { Awaitable } from '@aurora/utils';
import { declarePropType } from '@aurora/utils';

export const useStepProps = declarePropType({
  /**
   * 标题
   * @en Configuration for title.
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * 副标题
   * @en Configuration for subtitle.
   */
  subtitle: {
    type: String,
  },
  /**
   * 步骤的详情描述
   * @en Configuration for description.
   */
  description: {
    type: String,
    default: '',
  },
  /**
   * 指定当前步骤的下标
   * 如果某些步骤是动态渲染的，会因为渲染顺序导致步骤进度非预期，所以需要自己设置 `index`
   * @en Configuration for index.
   */
  index: {
    type: Number,
  },
  /**
   * 是否可点击
   * @en Configuration for clickable.
   */
  clickable: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 是否禁用
   * @en Configuration for disabled.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
});

export const useStepsProps = declarePropType({
  /**
   * 指定当前步骤
   * @en Configuration for model value.
   */
  modelValue: {
    type: Number,
    default: 0,
  },
  /**
   * 指定步骤条方向
   * @en Configuration for direction.
   */
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
    validator: (val: string): boolean => ['horizontal', 'vertical'].includes(val),
  },
  /**
   * 指定标签放置位置，默认水平放图标右侧，可选 `vertical` 放图标下方
   * @en Configuration for label placement.
   */
  labelPlacement: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },
  /**
   * 指定大小，目前支持普通（medium）和小型(small)
   * @en Configuration for size.
   */
  size: {
    type: String as PropType<'medium' | 'small'>,
    required: false,
  },
  /**
   * 指定当前步骤的状态
   * @en Configuration for status.
   */
  status: {
    type: String as PropType<'wait' | 'process' | 'finish' | 'error'>,
    default: 'process',
    validator: (val: string): boolean => ['wait', 'process', 'finish', 'error'].includes(val),
  },
  /**
   * 设置点状步骤条
   * @en Configuration for progress dot.
   */
  progressDot: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否可以点击步骤
   * @en Configuration for clickable.
   */
  clickable: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否点击步骤是受控的，即点击后可以直接切换步骤
   * @en Configuration for controllable.
   */
  controllable: {
    type: Boolean,
    default: true,
  },
  /**
   * 起始序号，从 0 开始记数
   * @en Configuration for initial.
   */
  initial: {
    type: Number,
    default: 0,
  },
  /**
   * 文本对齐方式，在 `direction = 'horizontal'` 时有效
   * @en Configuration for label align.
   */
  labelAlign: {
    type: String as PropType<'center' | 'left'>,
    default: 'center',
  },
  /**
   * 手动点击 `h-step` 切换步骤前的回调
   * 如果返回 false 或 Promise.resolve(false) Promise.reject ，则不会进行切换步骤
   * @en Configuration for before change.
   */
  beforeChange: {
    type: Function as PropType<
      (
        next: number,
        current: number,
        nextProp: StepProps | undefined,
        currentProp: StepProps | undefined,
      ) => Awaitable<boolean>
    >,
  },
});

export type StepsProps = ExtractPropTypes<typeof useStepsProps>;
export type StepProps = ExtractPropTypes<typeof useStepProps>;
