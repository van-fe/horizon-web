import fs from 'node:fs';
import path from 'node:path';
import {
  adaptManifestFields,
  alertManifest,
  avatarManifest,
  badgeManifest,
  breadcrumbManifest,
  buttonManifest,
  cardManifest,
  checkboxManifest,
  collapseItemManifest,
  collapseManifest,
  countManifest,
  createReactComponentManifest,
  createVueComponentManifest,
  dividerManifest,
  dialogManifest,
  dropdownGroupManifest,
  dropdownItemManifest,
  dropdownManifest,
  dropdownMenuManifest,
  dropdownSubmenuManifest,
  emptyManifest,
  inputManifest,
  linkManifest,
  paginationManifest,
  popContentManifest,
  popconfirmManifest,
  popoverManifest,
  progressManifest,
  rateManifest,
  radioManifest,
  resultManifest,
  segmentedManifest,
  selectManifest,
  skeletonManifest,
  sliderManifest,
  spaceManifest,
  statisticManifest,
  stepsManifest,
  switchManifest,
  tabManifest,
  tabsManifest,
  timelineManifest,
  tooltipManifest,
  typographyManifest,
} from '../packages/core/src';
import type { ManifestFieldAdaptation } from '../packages/core/src';

const manifests = [
  alertManifest,
  avatarManifest,
  badgeManifest,
  breadcrumbManifest,
  buttonManifest,
  cardManifest,
  checkboxManifest,
  collapseManifest,
  collapseItemManifest,
  countManifest,
  dividerManifest,
  dialogManifest,
  dropdownManifest,
  dropdownMenuManifest,
  dropdownGroupManifest,
  dropdownItemManifest,
  dropdownSubmenuManifest,
  emptyManifest,
  inputManifest,
  linkManifest,
  paginationManifest,
  popconfirmManifest,
  popoverManifest,
  popContentManifest,
  progressManifest,
  rateManifest,
  radioManifest,
  resultManifest,
  segmentedManifest,
  selectManifest,
  skeletonManifest,
  sliderManifest,
  spaceManifest,
  statisticManifest,
  stepsManifest,
  switchManifest,
  tabsManifest,
  tabManifest,
  timelineManifest,
  tooltipManifest,
  typographyManifest,
] as const;

interface RendererApiAdaptation {
  props?: ManifestFieldAdaptation;
  events?: ManifestFieldAdaptation;
  regions?: ManifestFieldAdaptation;
  commands?: ManifestFieldAdaptation;
}

const vueApiAdaptations: Readonly<Record<string, RendererApiAdaptation>> = {
  Alert: { regions: { rename: { content: 'default' } } },
  Avatar: {
    props: { rename: { fallbackSrc: 'default' } },
    regions: { rename: { content: 'default', fallback: 'error' } },
  },
  Badge: {
    regions: { rename: { content: 'default' }, omit: ['icon'] },
  },
  Breadcrumb: {
    props: {
      rename: { items: 'texts' },
      override: {
        separator: { type: 'string | Component' },
        items: { type: 'BreadcrumbItem[]' },
      },
    },
    regions: { rename: { content: 'default' } },
  },
  Button: { props: { rename: { variant: 'type', asyncState: 'debounceType' } } },
  Card: { regions: { rename: { content: 'default' } } },
  Checkbox: {
    props: {
      rename: {
        value: 'modelValue',
        optionValue: 'label',
        trueValue: 'trueLabel',
        falseValue: 'falseLabel',
        readOnly: 'viewable',
        bordered: 'border',
      },
      omit: ['defaultValue', 'variant', 'fill'],
    },
    events: {
      omit: ['change'],
      extend: [
        {
          name: 'change',
          type: 'CheckboxValue',
          description: { zh: '值变化', en: 'Value changed' },
        },
        {
          name: 'update:modelValue',
          type: 'CheckboxValue',
          description: { zh: '更新绑定值', en: 'Updates the bound value' },
        },
      ],
    },
    regions: { rename: { label: 'default' } },
  },
  Collapse: {
    props: { rename: { value: 'activeKey' }, omit: ['defaultValue'] },
    events: {
      extend: [
        {
          name: 'update:activeKey',
          type: 'CollapseValue',
          description: { zh: '更新绑定展开项', en: 'Updates the bound expanded panels' },
        },
      ],
    },
    regions: { rename: { content: 'default' } },
  },
  CollapseItem: { regions: { rename: { content: 'default' } } },
  Divider: {
    props: { rename: { variant: 'type' } },
    regions: { rename: { title: 'default' } },
  },
  Dialog: {
    props: {
      rename: { open: 'visible' },
      omit: ['defaultOpen'],
      override: {
        okButtonProps: { type: 'boolean | Partial<ButtonProps>' },
        cancelButtonProps: { type: 'boolean | Partial<ButtonProps>' },
      },
      extend: [
        {
          name: 'to',
          type: 'string | HTMLElement | null',
          description: { zh: '挂载目标', en: 'Teleport destination' },
        },
        {
          name: 'ariaLabel',
          type: 'string',
          description: { zh: '可访问名称', en: 'Accessible name' },
        },
        {
          name: 'classNames',
          type: 'DialogClassNames',
          description: { zh: '内置区域 class', en: 'Classes for built-in regions' },
        },
      ],
    },
    events: {
      omit: ['openChange'],
      extend: [
        {
          name: 'update:visible',
          type: 'boolean',
          description: { zh: '更新绑定显隐', en: 'Updates bound visibility' },
        },
      ],
    },
    regions: { rename: { content: 'default' } },
  },
  Dropdown: {
    props: {
      rename: {
        open: 'visible',
        width: 'popperWidth',
        portal: 'toBody',
        showDelay: 'showAfter',
        hideDelay: 'hideAfter',
        hideEvent: 'hideEventType',
      },
      omit: ['defaultOpen'],
      extend: [
        { name: 'menu', type: 'VNode', description: { zh: '菜单 VNode', en: 'Menu VNode' } },
        {
          name: 'popperClass',
          type: 'string',
          description: { zh: '浮层类名', en: 'Floating class name' },
        },
        {
          name: 'teleportTo',
          type: "TeleportProps['to']",
          defaultValue: 'body',
          description: { zh: '挂载目标', en: 'Teleport destination' },
        },
        {
          name: 'popoverOptions',
          type: 'Partial<PopoverProps>',
          description: { zh: 'Popover 参数', en: 'Popover options' },
        },
      ],
    },
    events: {
      rename: { openChange: 'visibleChange' },
      extend: [
        {
          name: 'update:visible',
          type: 'boolean',
          description: { zh: '显隐双向绑定', en: 'Visibility model update' },
        },
      ],
    },
    regions: { rename: { trigger: 'default', menu: 'dropdown' } },
    commands: { rename: { open: 'handleOpen', close: 'handleClose' }, omit: ['focusFirst'] },
  },
  DropdownMenu: { regions: { rename: { content: 'default' } } },
  DropdownGroup: {
    props: {
      extend: [
        {
          name: 'titleTooltipOptions',
          type: 'Partial<TooltipProps>',
          description: { zh: '标题 Tooltip 参数', en: 'Title Tooltip options' },
        },
      ],
    },
    regions: { rename: { content: 'default' } },
  },
  DropdownItem: {
    props: {
      rename: { allowImmediatePropagation: 'forbidEvtStop' },
      extend: [
        { name: 'icon', type: 'IconPropType', description: { zh: '图标', en: 'Icon' } },
        {
          name: 'tooltipOptions',
          type: 'Partial<TooltipProps>',
          description: { zh: 'Tooltip 参数', en: 'Tooltip options' },
        },
      ],
    },
    events: { rename: { press: 'click' } },
    regions: { rename: { content: 'default' } },
  },
  DropdownSubmenu: {
    props: {
      extend: [
        { name: 'icon', type: 'IconPropType', description: { zh: '图标', en: 'Icon' } },
        {
          name: 'popoverOptions',
          type: 'Partial<PopoverProps>',
          description: { zh: 'Popover 参数', en: 'Popover options' },
        },
      ],
    },
    events: { rename: { press: 'click' } },
    regions: { rename: { content: 'title', submenu: 'default' } },
  },
  Empty: { regions: { rename: { footer: 'default' } } },
  Input: {
    props: {
      rename: {
        value: 'modelValue',
        readOnly: 'readonly',
        maxLength: 'maxlength',
        allowOverflow: 'enableOutOfExceeded',
        minLength: 'minlength',
        variant: 'inputStyle',
      },
      omit: ['defaultValue'],
      extend: [
        {
          name: 'prefixIcon',
          type: 'IconMaybeFalsy',
          description: { zh: '前缀图标', en: 'Prefix icon' },
        },
        {
          name: 'suffixIcon',
          type: 'IconMaybeFalsy',
          description: { zh: '后缀图标', en: 'Suffix icon' },
        },
        {
          name: 'embedded',
          type: 'boolean',
          defaultValue: 'false',
          description: { zh: '无外观嵌入模式', en: 'Unstyled embedded mode' },
        },
        {
          name: 'fitContent',
          type: 'boolean',
          defaultValue: 'false',
          description: { zh: '按内容适配宽度', en: 'Fits content width' },
        },
      ],
    },
    events: {
      rename: {
        valueChange: 'update:modelValue',
        keyDown: 'keydown',
        keyPress: 'keypress',
        keyUp: 'keyup',
        compositionStart: 'compositionstart',
        compositionUpdate: 'compositionupdate',
        compositionEnd: 'compositionend',
      },
    },
  },
  Link: {
    props: {
      rename: { variant: 'type', route: 'to' },
      extend: [
        {
          name: 'icon',
          type: 'IconMaybeFalsy',
          description: { zh: '后缀图标', en: 'Trailing icon' },
        },
        {
          name: 'iconSize',
          type: 'string | number',
          description: { zh: '图标尺寸', en: 'Icon size' },
        },
        {
          name: 'scrollTarget',
          type: 'string | Element',
          defaultValue: "'body'",
          description: { zh: '锚点滚动容器', en: 'Anchor scroll container' },
        },
      ],
    },
    regions: { rename: { content: 'default' } },
  },
  Pagination: {
    props: {
      rename: { value: 'currentPage', variant: 'type' },
      omit: ['defaultValue', 'defaultPageSize', 'labels'],
      override: {
        value: { defaultValue: '1' },
        pageSize: { defaultValue: '10' },
        layout: {
          type: "string | Array<'pager' | 'sizes' | 'jumper' | 'total'>",
          defaultValue: "'pager, sizes, jumper, total'",
        },
      },
      extend: [
        {
          name: 'label',
          type: 'PaginationLabelType',
          description: { zh: '兼容文案覆盖', en: 'Legacy label overrides' },
        },
        {
          name: 'pageSizesToBody',
          type: 'boolean',
          defaultValue: 'false',
          description: { zh: '每页数量面板传送至 body', en: 'Teleports the size panel to body' },
        },
      ],
    },
    events: {
      rename: {
        change: 'modify',
        pageChange: 'currentChange',
        pageSizeChange: 'sizeChange',
        previous: 'clickPrevPage',
        currentPageClick: 'clickCurrentPage',
        next: 'clickNextPage',
      },
      extend: [
        {
          name: 'update:currentPage',
          type: 'number',
          description: { zh: '更新当前页', en: 'Updates the current page' },
        },
        {
          name: 'update:pageSize',
          type: 'number',
          description: { zh: '更新每页数量', en: 'Updates the page size' },
        },
      ],
    },
    regions: { rename: { previous: 'prev' } },
  },
  Progress: { regions: { rename: { label: 'default' } } },
  Rate: {
    props: {
      rename: { value: 'modelValue', readOnly: 'readonly' },
      omit: ['defaultValue'],
    },
    events: {
      extend: [
        {
          name: 'update:modelValue',
          type: 'number',
          description: { zh: '更新绑定值', en: 'Updates the bound value' },
        },
      ],
    },
    regions: { rename: { icon: 'default' } },
  },
  Radio: {
    props: {
      rename: {
        value: 'modelValue',
        optionValue: 'value',
        readOnly: 'viewable',
        bordered: 'border',
      },
      omit: ['defaultValue', 'variant', 'fill'],
      override: { value: { defaultValue: "''" } },
    },
    events: {
      extend: [
        {
          name: 'update:modelValue',
          type: 'ChoiceValue',
          description: { zh: '更新绑定值', en: 'Updates the bound value' },
        },
      ],
    },
    regions: { rename: { label: 'default' } },
  },
  Result: {},
  Segmented: {
    props: { rename: { value: 'activeKey', defaultValue: 'defaultActiveKey' } },
    events: {
      extend: [
        {
          name: 'update:activeKey',
          type: 'SegmentedValue',
          description: { zh: '更新激活值', en: 'Updates the active value' },
        },
      ],
    },
    regions: { rename: { content: 'default' } },
  },
  Select: { props: { rename: { value: 'modelValue' }, omit: ['defaultValue', 'open'] } },
  Slider: {
    props: {
      rename: {
        value: 'modelValue',
        showSeparators: 'showSeparator',
        tone: 'type',
        showInput: 'inputEnable',
        keyboard: 'keyboardEnable',
        showTooltip: 'tooltipEnable',
        formatTooltip: 'tooltipFormatter',
      },
      omit: ['defaultValue'],
      extend: [
        {
          name: 'inputProps',
          type: 'Partial<InputNumberProps>',
          description: { zh: '传给 InputNumber 的属性', en: 'Props passed to InputNumber' },
        },
      ],
    },
    events: {
      rename: { change: 'update:modelValue' },
    },
  },
  Skeleton: { regions: { rename: { content: 'default', placeholder: 'loadingTemplate' } } },
  Statistic: { regions: { rename: { value: 'default' } } },
  Space: {
    props: {
      extend: [
        {
          name: 'fragment',
          type: 'boolean',
          defaultValue: 'true',
          description: { zh: '展开 Fragment 子节点', en: 'Flattens Fragment children' },
        },
        {
          name: 'separator',
          type: 'boolean',
          defaultValue: 'false',
          description: { zh: '启用默认分隔符', en: 'Enables the default separator' },
        },
      ],
    },
    regions: { rename: { content: 'default' } },
  },
  Steps: {
    props: { rename: { value: 'modelValue' }, omit: ['defaultValue'] },
    events: {
      extend: [
        {
          name: 'update:modelValue',
          type: 'number',
          description: { zh: '更新绑定步骤', en: 'Updates the bound step' },
        },
        {
          name: 'update:current',
          type: 'number',
          description: { zh: '更新历史步骤别名', en: 'Updates the legacy step alias' },
        },
      ],
    },
    regions: { rename: { content: 'default' } },
  },
  Switch: {
    props: { rename: { value: 'modelValue', readOnly: 'readonly' }, omit: ['defaultValue'] },
  },
  Tabs: {
    props: { rename: { value: 'activeKey', defaultValue: 'defaultActiveKey', variant: 'type' } },
    events: {
      extend: [
        {
          name: 'update:activeKey',
          type: 'TabsKey',
          description: { zh: '更新绑定选中项', en: 'Updates the bound selected tab' },
        },
      ],
    },
    regions: { rename: { content: 'default' } },
  },
  Tab: {
    props: { omit: ['value'] },
    regions: { rename: { content: 'default' } },
  },
  Popover: {
    props: {
      rename: {
        open: 'visible',
        portal: 'toBody',
        showDelay: 'hoverShowDelay',
        hideDelay: 'hoverHideDelay',
        hideEvent: 'hideEventType',
        mask: 'showWithMask',
      },
      omit: ['defaultOpen'],
      extend: [
        {
          name: 'popperClass',
          type: 'string',
          description: { zh: '浮层类名', en: 'Floating class name' },
        },
        {
          name: 'popperStyle',
          type: 'CSSProperties',
          description: { zh: '浮层样式', en: 'Floating styles' },
        },
        {
          name: 'to',
          type: "TeleportProps['to']",
          description: { zh: '挂载目标', en: 'Teleport destination' },
        },
        {
          name: 'referenceClass',
          type: 'string',
          description: { zh: '触发器包装类名', en: 'Reference wrapper class' },
        },
        {
          name: 'transitionName',
          type: "TransitionName | 'none'",
          defaultValue: 'fade-in',
          description: { zh: '过渡名称', en: 'Transition name' },
        },
        {
          name: 'transitionSpeed',
          type: 'TransitionSpeed',
          defaultValue: 'slow',
          description: { zh: '过渡速度', en: 'Transition speed' },
        },
      ],
    },
    events: { omit: ['openChange'] },
    regions: { rename: { trigger: 'reference', content: 'popper' } },
    commands: {
      omit: ['open', 'close'],
      extend: [
        {
          name: 'switchVisible',
          type: '(visible: boolean) => void',
          description: { zh: '切换显隐', en: 'Sets visibility' },
        },
        {
          name: 'referenceDom',
          type: 'HTMLSpanElement',
          description: { zh: '触发器 DOM', en: 'Reference DOM' },
        },
        {
          name: 'popoverDom',
          type: 'HTMLSpanElement',
          description: { zh: '浮层 DOM', en: 'Floating DOM' },
        },
      ],
    },
  },
  Popconfirm: {
    props: {
      rename: { open: 'visible' },
      omit: ['defaultOpen'],
      override: {
        confirmButtonProps: { type: 'Partial<ButtonProps>' },
        cancelButtonProps: { type: 'Partial<ButtonProps>' },
      },
    },
    events: {
      omit: ['openChange'],
      extend: [
        {
          name: 'update:visible',
          type: 'boolean',
          description: { zh: '更新绑定显隐', en: 'Updates bound visibility' },
        },
      ],
    },
    regions: { rename: { trigger: 'reference', content: 'default' } },
  },
  PopContent: { regions: { rename: { content: 'default' } } },
  Timeline: {
    props: {
      override: {
        first: { type: 'TimelineItemDotType' },
        last: { type: 'TimelineItemDotType' },
      },
    },
    regions: { rename: { content: 'default' } },
  },
  Tooltip: {
    props: {
      rename: { open: 'visible', showDelay: 'showAfter', hideDelay: 'hideAfter' },
      omit: ['defaultOpen'],
    },
    regions: { rename: { trigger: 'default' } },
  },
  Typography: {
    props: {
      rename: { value: 'modelValue', variant: 'type' },
      omit: ['defaultValue'],
    },
    events: { rename: { valueChange: 'update:modelValue' } },
    regions: { rename: { content: 'default' } },
  },
};

const reactApiAdaptations: Readonly<Record<string, RendererApiAdaptation>> = {
  Alert: {
    events: { rename: { close: 'onClose' } },
    regions: { rename: { content: 'children' } },
  },
  Avatar: {
    events: { rename: { error: 'onError' } },
    regions: { rename: { content: 'children' } },
  },
  Badge: { regions: { rename: { content: 'children' } } },
  Breadcrumb: {
    props: {
      override: {
        separator: { type: 'ReactNode' },
        items: { type: 'readonly BreadcrumbItemData[]' },
      },
    },
    events: { rename: { itemClick: 'onItemClick' } },
    regions: { rename: { content: 'children' }, omit: ['separator'] },
  },
  Button: {
    events: {
      rename: {
        press: 'onClick',
        actionFinished: 'onActionFinished',
        actionError: 'onActionError',
      },
    },
    regions: { rename: { default: 'children' } },
  },
  Card: { regions: { rename: { content: 'children' } } },
  Checkbox: {
    events: { rename: { change: 'onChange', blur: 'onBlur', click: 'onClick' } },
    regions: { rename: { label: 'children' } },
  },
  Collapse: {
    events: { rename: { change: 'onChange' } },
    regions: { rename: { content: 'children' } },
  },
  CollapseItem: {
    props: {
      override: { title: { type: 'ReactNode' }, expandIcon: { type: 'ReactNode' } },
    },
    regions: { rename: { content: 'children' }, omit: ['title', 'icon'] },
  },
  Count: { events: { rename: { change: 'onChange' } } },
  Divider: { regions: { rename: { title: 'children' } } },
  Dialog: {
    props: {
      omit: ['iconName', 'iconColor'],
      override: {
        title: { type: 'ReactNode' },
        okButtonProps: { type: 'boolean | Partial<ButtonProps>' },
        cancelButtonProps: { type: 'boolean | Partial<ButtonProps>' },
      },
      extend: [
        { name: 'icon', type: 'ReactNode', description: { zh: '标题图标', en: 'Title icon' } },
        {
          name: 'ariaLabel',
          type: 'string',
          description: { zh: '可访问名称', en: 'Accessible name' },
        },
        {
          name: 'portalContainer',
          type: 'PortalTarget',
          defaultValue: "'body'",
          description: { zh: 'Portal 容器', en: 'Portal destination' },
        },
        {
          name: 'portal',
          type: 'boolean',
          defaultValue: 'true',
          description: { zh: '使用 Portal', en: 'Uses a Portal' },
        },
        {
          name: 'classNames',
          type: 'DialogClassNames',
          description: { zh: '内置区域 class', en: 'Classes for built-in regions' },
        },
      ],
    },
    events: {
      omit: ['confirmDebounceFinished', 'cancelDebounceFinished'],
      rename: {
        openChange: 'onOpenChange',
        ok: 'onOk',
        cancel: 'onCancel',
        open: 'onOpen',
        opened: 'onOpened',
        close: 'onClose',
        closed: 'onClosed',
        closeIconClick: 'onCloseIconClick',
        maskClick: 'onMaskClick',
      },
    },
    regions: { rename: { content: 'children', footer: 'footer' }, omit: ['title'] },
  },
  Dropdown: {
    events: { rename: { openChange: 'onOpenChange', command: 'onCommand' } },
    regions: { rename: { trigger: 'children', menu: 'menu' } },
  },
  DropdownMenu: { regions: { rename: { content: 'children' } } },
  DropdownGroup: { regions: { rename: { content: 'children', title: 'titleContent' } } },
  DropdownItem: {
    events: { rename: { press: 'onPress' } },
    regions: { rename: { content: 'children', icon: 'icon' } },
  },
  DropdownSubmenu: {
    events: { rename: { press: 'onPress' } },
    regions: { rename: { content: 'children', icon: 'icon', submenu: 'submenu' } },
  },
  Empty: { regions: { rename: { footer: 'children' } } },
  Input: {
    props: {
      extend: [
        {
          name: 'inputProps',
          type: 'InputHTMLAttributes<HTMLInputElement>',
          description: { zh: '原生 input 属性', en: 'Native input attributes' },
        },
        {
          name: 'textareaProps',
          type: 'TextareaHTMLAttributes<HTMLTextAreaElement>',
          description: { zh: '原生 textarea 属性', en: 'Native textarea attributes' },
        },
      ],
    },
    events: {
      rename: {
        valueChange: 'onValueChange',
        click: 'onClick',
        input: 'onInput',
        change: 'onChange',
        focus: 'onFocus',
        blur: 'onBlur',
        clear: 'onClear',
        keyDown: 'onKeyDown',
        keyPress: 'onKeyPress',
        keyUp: 'onKeyUp',
        compositionStart: 'onCompositionStart',
        compositionUpdate: 'onCompositionUpdate',
        compositionEnd: 'onCompositionEnd',
      },
    },
  },
  Link: {
    props: {
      rename: { route: 'to' },
      extend: [
        {
          name: 'icon',
          type: 'ReactNode',
          description: { zh: '后缀图标或内容', en: 'Trailing icon or content' },
        },
        {
          name: 'iconSize',
          type: 'string | number',
          description: { zh: '图标尺寸', en: 'Icon size' },
        },
        {
          name: 'scrollTarget',
          type: 'string | Element',
          defaultValue: "'body'",
          description: { zh: '锚点滚动容器', en: 'Anchor scroll container' },
        },
      ],
    },
    events: { rename: { click: 'onClick' } },
    regions: { rename: { content: 'children' } },
  },
  Pagination: {
    events: {
      rename: {
        change: 'onChange',
        pageChange: 'onPageChange',
        pageSizeChange: 'onPageSizeChange',
        previous: 'onPrevious',
        currentPageClick: 'onCurrentPageClick',
        next: 'onNext',
        jump: 'onJump',
      },
    },
  },
  Progress: { regions: { rename: { label: 'children' } } },
  Rate: {
    events: { rename: { change: 'onChange', blur: 'onBlur' } },
    regions: { rename: { icon: 'renderIcon' } },
  },
  Radio: {
    events: { rename: { change: 'onChange', blur: 'onBlur' } },
    regions: { rename: { label: 'children' } },
  },
  Result: {
    events: {
      rename: { primaryClick: 'onPrimaryClick', secondaryClick: 'onSecondaryClick' },
    },
  },
  Segmented: {
    events: { rename: { change: 'onChange' } },
    regions: { rename: { content: 'children' } },
  },
  Select: {
    events: { rename: { change: 'onChange', openChange: 'onOpenChange' } },
    regions: {
      rename: {
        option: 'renderOption',
        empty: 'emptyContent',
        header: 'panelHeader',
        footer: 'panelFooter',
      },
    },
  },
  Slider: {
    props: {
      extend: [
        {
          name: 'inputProps',
          type: 'InputHTMLAttributes<HTMLInputElement>',
          description: { zh: '原生数字输入属性', en: 'Native number-input attributes' },
        },
      ],
    },
    events: { rename: { change: 'onChange', focus: 'onFocus', blur: 'onBlur' } },
  },
  Skeleton: { regions: { rename: { content: 'children' } } },
  Statistic: { regions: { rename: { value: 'children' } } },
  Space: {
    props: {
      extend: [
        {
          name: 'separator',
          type: 'boolean | ReactNode',
          defaultValue: 'false',
          description: {
            zh: '默认或自定义分隔内容',
            en: 'Default or custom separator content',
          },
        },
      ],
    },
    regions: { rename: { content: 'children' }, omit: ['separator'] },
  },
  Steps: {
    props: { rename: { beforeChange: 'onBeforeChange' } },
    events: { rename: { change: 'onChange' } },
    regions: { rename: { content: 'children' } },
  },
  Switch: {
    events: { rename: { change: 'onChange' } },
    regions: { omit: ['status'] },
  },
  Tabs: {
    events: {
      rename: { change: 'onChange', add: 'onAdd', close: 'onClose', sort: 'onSort' },
    },
    regions: { rename: { content: 'children' } },
  },
  Tab: {
    props: { override: { label: { type: 'ReactNode' }, icon: { type: 'ReactNode' } } },
    events: { rename: { click: 'onClick', close: 'onClose' } },
    regions: { rename: { content: 'children' }, omit: ['icon'] },
  },
  Popover: {
    events: {
      rename: {
        openChange: 'onOpenChange',
        show: 'onShow',
        hide: 'onHide',
        enterReference: 'onEnterReference',
        leaveReference: 'onLeaveReference',
        click: 'onClick',
      },
    },
    regions: { rename: { trigger: 'children', content: 'content' } },
  },
  Popconfirm: {
    props: {
      override: {
        confirmButtonProps: { type: 'Partial<ButtonProps>' },
        cancelButtonProps: { type: 'Partial<ButtonProps>' },
      },
      extend: [
        {
          name: 'portalContainer',
          type: 'PortalTarget',
          defaultValue: "'body'",
          description: { zh: 'Portal 容器', en: 'Portal destination' },
        },
        {
          name: 'portal',
          type: 'boolean',
          defaultValue: 'true',
          description: { zh: '使用 Portal', en: 'Uses a Portal' },
        },
        {
          name: 'zIndex',
          type: 'number',
          defaultValue: '1000',
          description: { zh: '浮层层级', en: 'Floating z-index' },
        },
      ],
    },
    events: {
      rename: { openChange: 'onOpenChange', confirm: 'onConfirm', cancel: 'onCancel' },
      extend: [
        {
          name: 'onConfirmError',
          type: '(error: unknown) => void',
          description: { zh: '确认守卫失败', en: 'Confirmation guard rejected' },
        },
      ],
    },
    regions: { rename: { trigger: 'children', content: 'content', icon: 'icon' } },
  },
  PopContent: { regions: { rename: { content: 'children' } } },
  Timeline: {
    props: {
      override: {
        first: { type: 'TimelineDotProps' },
        last: { type: 'TimelineDotProps' },
      },
      extend: [
        {
          name: 'locale',
          type: 'string',
          defaultValue: 'en',
          description: { zh: 'Day.js 格式化语言', en: 'Day.js formatting locale' },
        },
      ],
    },
    regions: { rename: { content: 'children' } },
  },
  Tooltip: {
    props: { rename: { showDelay: 'showAfter', hideDelay: 'hideAfter' } },
    events: { rename: { openChange: 'onOpenChange' } },
    regions: { rename: { trigger: 'children' } },
  },
  Typography: {
    events: {
      rename: { valueChange: 'onValueChange', change: 'onChange', copy: 'onCopy' },
    },
    regions: { rename: { content: 'children' } },
  },
};

const vue = manifests.map(manifest => {
  const adaptation = vueApiAdaptations[manifest.name];
  return createVueComponentManifest(manifest, {
    props: adaptManifestFields(manifest.contract.props, adaptation?.props),
    emits: adaptManifestFields(manifest.contract.emits, adaptation?.events),
    slots: adaptManifestFields(manifest.contract.slots, adaptation?.regions),
    exposes: adaptManifestFields(manifest.contract.exposes, adaptation?.commands),
  });
});

const react = manifests.map(manifest => {
  const adaptation = reactApiAdaptations[manifest.name];
  return createReactComponentManifest(manifest, {
    props: adaptManifestFields(manifest.contract.props, adaptation?.props),
    callbacks: adaptManifestFields(manifest.contract.emits, adaptation?.events),
    renderers: adaptManifestFields(manifest.contract.slots, adaptation?.regions),
    ref: adaptManifestFields(manifest.contract.exposes, adaptation?.commands),
  });
});

const output = path.resolve(__dirname, '../packages/docs/.vitepress/generated');
fs.mkdirSync(output, { recursive: true });
fs.writeFileSync(path.join(output, 'vue-components.json'), JSON.stringify(vue, null, 2));
fs.writeFileSync(path.join(output, 'react-components.json'), JSON.stringify(react, null, 2));
console.info(`Generated ${vue.length} Vue and ${react.length} React component contracts.`);
