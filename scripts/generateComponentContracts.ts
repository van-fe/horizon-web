import fs from 'node:fs';
import path from 'node:path';
import {
  affixManifest,
  anchorManifest,
  adaptManifestFields,
  alertManifest,
  applicationManifest,
  avatarManifest,
  backtopManifest,
  badgeManifest,
  breadcrumbManifest,
  buttonManifest,
  cardManifest,
  checkboxManifest,
  collapseItemManifest,
  collapseManifest,
  containerManifest,
  countManifest,
  createReactComponentManifest,
  createVueComponentManifest,
  dividerManifest,
  descriptionItemManifest,
  descriptionsManifest,
  dialogManifest,
  drawerManifest,
  dropdownGroupManifest,
  dropdownItemManifest,
  dropdownManifest,
  dropdownMenuManifest,
  dropdownSubmenuManifest,
  emptyManifest,
  footerManifest,
  floatButtonGroupManifest,
  floatButtonManifest,
  formItemManifest,
  formManifest,
  inputManifest,
  inputNumberManifest,
  gridItemManifest,
  gridManifest,
  hoverManifest,
  headerManifest,
  asideManifest,
  mainManifest,
  maskManifest,
  linkManifest,
  listItemManifest,
  listManifest,
  paginationManifest,
  panelManifest,
  panelsManifest,
  pageHeaderManifest,
  popContentManifest,
  popconfirmManifest,
  popoverManifest,
  progressManifest,
  qrCodeManifest,
  rateManifest,
  radioManifest,
  resultManifest,
  segmentedManifest,
  selectManifest,
  skeletonManifest,
  spinManifest,
  sliderManifest,
  spaceManifest,
  statisticManifest,
  stepsManifest,
  switchManifest,
  tabManifest,
  tabsManifest,
  timelineManifest,
  timeManifest,
  treeManifest,
  treeSelectManifest,
  tooltipManifest,
  typographyManifest,
} from '../packages/core/src';
import type { ManifestFieldAdaptation } from '../packages/core/src';

const manifests = [
  affixManifest,
  anchorManifest,
  alertManifest,
  applicationManifest,
  avatarManifest,
  backtopManifest,
  badgeManifest,
  breadcrumbManifest,
  buttonManifest,
  cardManifest,
  checkboxManifest,
  collapseManifest,
  collapseItemManifest,
  containerManifest,
  headerManifest,
  asideManifest,
  mainManifest,
  footerManifest,
  countManifest,
  dividerManifest,
  descriptionsManifest,
  descriptionItemManifest,
  dialogManifest,
  drawerManifest,
  dropdownManifest,
  dropdownMenuManifest,
  dropdownGroupManifest,
  dropdownItemManifest,
  dropdownSubmenuManifest,
  emptyManifest,
  floatButtonManifest,
  floatButtonGroupManifest,
  formManifest,
  formItemManifest,
  inputManifest,
  inputNumberManifest,
  gridManifest,
  gridItemManifest,
  hoverManifest,
  linkManifest,
  listManifest,
  listItemManifest,
  maskManifest,
  paginationManifest,
  panelsManifest,
  panelManifest,
  pageHeaderManifest,
  popconfirmManifest,
  popoverManifest,
  popContentManifest,
  progressManifest,
  qrCodeManifest,
  rateManifest,
  radioManifest,
  resultManifest,
  segmentedManifest,
  selectManifest,
  skeletonManifest,
  spinManifest,
  sliderManifest,
  spaceManifest,
  statisticManifest,
  stepsManifest,
  switchManifest,
  tabsManifest,
  tabManifest,
  timelineManifest,
  timeManifest,
  treeManifest,
  treeSelectManifest,
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
  Affix: { regions: { rename: { content: 'default' } } },
  Anchor: {
    props: {
      rename: { collapsed: 'collapse' },
      omit: ['defaultCollapsed'],
      override: { collapseText: { type: 'string | VNode' } },
      extend: [
        {
          name: 'style',
          type: 'CSSProperties',
          description: { zh: '根元素样式', en: 'Root element style' },
        },
      ],
    },
    events: { rename: { collapseChange: 'update:collapse' } },
    regions: { rename: { content: 'default' }, omit: ['collapseLabel'] },
  },
  Alert: { regions: { rename: { content: 'default' } } },
  Application: {
    props: {
      extend: [
        {
          name: 'getPopupContainer',
          type: '(triggerNode?: HTMLElement) => HTMLElement',
          description: { zh: '弹层挂载节点解析器', en: 'Popup container resolver' },
        },
      ],
    },
    regions: { rename: { content: 'default' } },
  },
  Avatar: {
    props: { rename: { fallbackSrc: 'default' } },
    regions: { rename: { content: 'default', fallback: 'error' } },
  },
  Backtop: {
    props: {
      extend: [
        {
          name: 'ariaLabel',
          type: 'string',
          description: { zh: '可访问名称', en: 'Accessible name' },
        },
      ],
    },
    regions: { rename: { content: 'default' } },
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
  Container: { regions: { rename: { content: 'default' } } },
  Header: { regions: { rename: { content: 'default' } } },
  Aside: { regions: { rename: { content: 'default' } } },
  Main: { regions: { rename: { content: 'default' } } },
  Footer: { regions: { rename: { content: 'default' } } },
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
  Drawer: {
    props: {
      rename: { open: 'visible' },
      omit: ['defaultOpen'],
      override: {
        okButton: { type: 'boolean | Partial<ButtonProps>' },
        cancelButton: { type: 'boolean | Partial<ButtonProps>' },
      },
      extend: [
        {
          name: 'to',
          type: 'string | HTMLElement | null',
          defaultValue: 'body',
          description: { zh: '挂载目标', en: 'Teleport destination' },
        },
        {
          name: 'ariaLabel',
          type: 'string',
          description: { zh: '可访问名称', en: 'Accessible name' },
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
  FloatButton: {
    props: {
      rename: { variant: 'type' },
      omit: ['defaultVisible'],
      override: {
        icon: { type: 'IconProp' },
        description: { type: 'string | VNode' },
        tooltip: { type: 'string | Partial<TooltipProps>' },
        badge: { type: 'boolean | Partial<BadgeProps>' },
      },
      extend: [
        {
          name: 'ariaLabel',
          type: 'string',
          description: { zh: '可访问名称', en: 'Accessible name' },
        },
      ],
    },
    events: { rename: { visibleChange: 'update:visible' } },
  },
  FloatButtonGroup: {
    props: {
      rename: { variant: 'type' },
      omit: ['defaultVisible'],
      override: {
        expandIcon: { type: 'IconProp' },
        foldIcon: { type: 'IconProp' },
        expandTooltip: { type: 'string | Partial<TooltipProps>' },
        foldTooltip: { type: 'string | Partial<TooltipProps>' },
        badge: { type: 'Partial<BadgeProps>' },
      },
    },
    events: {
      rename: {
        visibleChange: 'update:visible',
        expandedChange: 'update:expanded',
      },
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
  InputNumber: {
    props: {
      rename: {
        value: 'modelValue',
        variant: 'inputStyle',
        readOnly: 'readonly',
        longPress: 'enableLangPress',
        longPressInterval: 'langPressFrequency',
      },
      omit: ['defaultValue'],
    },
    events: {
      rename: {
        valueChange: 'update:modelValue',
        keyDown: 'keydown',
        keyPress: 'keypress',
        keyUp: 'keyup',
      },
    },
  },
  Mask: {
    props: {
      rename: {
        variant: 'type',
        visible: 'value',
        fuzzified: 'isFuzzification',
      },
      extend: [
        {
          name: 'scrimClass',
          type: 'string',
          description: { zh: '遮罩背景 class', en: 'Scrim class name' },
        },
        {
          name: 'scrimStyle',
          type: 'CSSProperties',
          description: { zh: '遮罩背景样式', en: 'Scrim style' },
        },
      ],
    },
    events: {
      omit: ['maskClick'],
      extend: [
        {
          name: 'clickMask',
          type: 'void',
          description: { zh: '点击遮罩背景', en: 'Scrim background pressed' },
        },
      ],
    },
    regions: { rename: { content: 'default' } },
  },
  Grid: { regions: { rename: { content: 'default' } } },
  GridItem: { regions: { rename: { content: 'default' } } },
  Hover: {
    props: { rename: { showDelay: 'hoverShowDelay', hideDelay: 'hoverHideDelay' } },
    regions: { rename: { content: 'default' } },
  },
  Form: { regions: { rename: { content: 'default' } } },
  FormItem: {
    props: { rename: { field: 'prop' } },
    regions: { rename: { content: 'default' } },
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
  QRCode: {
    regions: { rename: { expired: 'expired' } },
  },
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
  Descriptions: { regions: { rename: { content: 'default' } } },
  DescriptionItem: { regions: { rename: { content: 'default' } } },
  List: { regions: { rename: { content: 'default' } } },
  ListItem: {
    regions: {
      rename: {
        content: 'default',
        leading: 'sider',
        description: 'describe',
        actions: 'right',
      },
    },
  },
  PageHeader: {
    props: {
      omit: ['showBack'],
      extend: [
        {
          name: 'icon',
          type: 'Icon | string | null',
          description: {
            zh: '返回图标，null 隐藏返回操作',
            en: 'Back icon; null hides the action',
          },
        },
        {
          name: 'backAriaLabel',
          type: 'string',
          description: { zh: '返回操作可访问名称', en: 'Accessible name for the back action' },
        },
      ],
    },
    regions: {
      rename: {
        body: 'default',
        backIcon: 'icon',
        titleContainer: 'titleOuter',
        description: 'content',
        actions: 'extra',
      },
    },
  },
  Panels: {
    props: { rename: { value: 'modelValue' } },
    regions: { rename: { content: 'default' } },
  },
  Panel: {
    regions: { rename: { content: 'default' } },
  },
  Spin: { regions: { rename: { content: 'default' } } },
  Time: { regions: { rename: { content: 'default' } } },
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
  Tree: {
    props: {
      omit: ['defaultTreeData', 'defaultExpandValues', 'defaultSelectedValues'],
      extend: [
        {
          name: 'treeHelper',
          type: 'Tree<HTreeData, HTreeExtendsData>',
          description: { zh: 'TreeSelect 传入的树助手', en: 'Tree helper supplied by TreeSelect' },
        },
        {
          name: 'highlightMethod',
          type: 'HTreeHighlightMethod',
          description: { zh: '过滤高亮渲染方法', en: 'Filter highlight renderer' },
        },
        {
          name: 'filterInputProps',
          type: 'Partial<InputProps>',
          description: { zh: '过滤输入框属性', en: 'Filter input properties' },
        },
        {
          name: 'rootClassName',
          type: 'string',
          description: { zh: '根节点类名', en: 'Root element class name' },
        },
        {
          name: 'rootStyle',
          type: 'CSSProperties',
          description: { zh: '根节点样式', en: 'Root element styles' },
        },
      ],
    },
    events: {
      rename: {
        treeDataChange: 'update:treeData',
        expandValuesChange: 'update:expandValues',
        selectedValuesChange: 'update:selectedValues',
        visibleNodesChange: 'update:visibleNodes',
        filterValueChange: 'update:filterValue',
        nodeClick: 'click',
        nodeContextMenu: 'contextmenu',
      },
    },
    regions: { rename: { treeNode: 'treeNodeRender' } },
    commands: {
      rename: {
        getUnselectedNodes: 'getUnSelectedNodes',
        setExpandedStatus: 'setCollapseStatusByValue',
        setAllExpandedStatus: 'setAllCollapseStatus',
        getNodesByValue: 'getNodeByValues',
        deleteNodeByValue: 'delNodeByValue',
      },
      extend: [
        {
          name: 'treeTemplateRef',
          type: 'Ref<HTMLDivElement | null>',
          description: { zh: '树根元素引用', en: 'Tree root element ref' },
        },
        {
          name: 'keyboardEventDeal',
          type: '(event: KeyboardEvent) => void',
          description: { zh: '处理树键盘导航', en: 'Handles tree keyboard navigation' },
        },
      ],
    },
  },
  TreeSelect: {
    props: {
      rename: {
        value: 'modelValue',
        inputVariant: 'inputStyle',
        portal: 'toBody',
        panelWidth: 'treeWidth',
        popupClassName: 'popperClassName',
        confirmText: 'confirmButtonText',
        cancelText: 'cancelButtonText',
        useBuiltInPanelFilter: 'useBuildInPanelFilter',
        inputDebounce: 'inputEmitFrequency',
        filterInputValue: 'panelFilterInputValue',
        expandWrapperByChildren: 'expandPanelByChildren',
      },
      omit: [
        'defaultValue',
        'open',
        'defaultOpen',
        'filterValue',
        'defaultFilterValue',
        'defaultTreeData',
        'defaultExpandValues',
        'hideFilterInput',
      ],
      extend: [
        {
          name: 'inputAttrs',
          type: 'PickerNativeInputAttrs',
          description: {
            zh: '触发输入框原生属性',
            en: 'Native trigger-input attributes',
          },
        },
        {
          name: 'collapsedTagsProps',
          type: 'Partial<TagProps>',
          description: { zh: '折叠标签属性', en: 'Collapsed-tag properties' },
        },
        {
          name: 'popoverOptions',
          type: 'Partial<PopoverProps>',
          description: { zh: '浮层附加属性', en: 'Additional popup properties' },
        },
        {
          name: 'dropdownIcon',
          type: 'Icon | false',
          description: { zh: '下拉图标', en: 'Dropdown icon' },
        },
        {
          name: 'searchPanelWidth',
          type: 'string | number',
          description: { zh: '搜索面板宽度', en: 'Search-panel width' },
        },
        {
          name: 'searchIcon',
          type: 'Icon | false',
          description: { zh: '搜索图标', en: 'Search icon' },
        },
        {
          name: 'highlightMethod',
          type: 'HTreeHighlightMethod',
          description: { zh: '过滤高亮渲染方法', en: 'Filter highlight renderer' },
        },
        {
          name: 'selectedValues',
          type: 'HTreeUuidType[]',
          description: { zh: '树选择状态输入', en: 'Tree selection-state input' },
        },
        {
          name: 'rootClassName',
          type: 'string',
          description: { zh: '树根元素类名', en: 'Tree root class name' },
        },
        {
          name: 'rootStyle',
          type: 'CSSProperties',
          description: { zh: '树根元素样式', en: 'Tree root styles' },
        },
      ],
    },
    events: {
      rename: {
        treeDataChange: 'update:treeData',
        expandValuesChange: 'update:expandValues',
        valueChange: 'update:modelValue',
        openChange: 'visibleChange',
        nodeClick: 'click',
        nodeContextMenu: 'contextmenu',
      },
      omit: [
        'visibleNodesChange',
        'reachTop',
        'reachBottom',
        'pendingValueChange',
        'filterValueChange',
      ],
      override: {
        treeDataChange: { type: 'HTreeData[]' },
        expandValuesChange: { type: 'HTreeUuidType[]' },
        valueChange: { type: 'HTreeSelectModelValueType' },
        openChange: { type: 'boolean' },
        expand: { type: '[HTreeUuidType[], HTreeUuidType, HTreeExpandDetails]' },
        select: { type: '[HTreeUuidType[], HTreeUuidType, HTreeSelectDetails]' },
        nodeClick: { type: '[MouseEvent, HTreeUuidType, HTreeData, VNode?]' },
        nodeContextMenu: { type: '[MouseEvent, HTreeUuidType, HTreeData, VNode?]' },
        clear: { type: 'void' },
        confirm: { type: 'void' },
        cancel: { type: 'void' },
        focus: { type: 'void' },
        blur: { type: 'void' },
      },
      extend: [
        {
          name: 'change',
          type: 'HTreeSelectModelValueType',
          description: { zh: '已提交值变化', en: 'Committed value changed' },
        },
      ],
    },
    regions: {
      rename: {
        trigger: 'default',
        tag: 'tagRender',
        selection: 'selectRender',
        treeNode: 'treeNodeRender',
        panelHeader: 'panelHeaderRender',
        panelFooter: 'panelFooterRender',
        confirm: 'confirmRender',
      },
      override: {
        trigger: { type: '{ visible: Ref<boolean>; treeDataMap: Map<HTreeUuidType, HTreeData> }' },
        tag: { type: 'HTreeExtendsData' },
        selection: { type: 'HTreeExtendsData' },
        treeNode: { type: '{ data: HTreeNodeDataWithLevel; vnode: VNode }' },
        confirm: { type: '{ cancelHandle: () => void; confirmHandle: () => void }' },
      },
    },
    commands: {
      rename: {
        getUnselectedNodes: 'getUnSelectedNodes',
        setExpandedStatus: 'setCollapseStatusByValue',
        setAllExpandedStatus: 'setAllCollapseStatus',
        getNodesByValue: 'getNodeByValues',
        deleteNodeByValue: 'delNodeByValue',
        confirm: 'confirmHandle',
        cancel: 'cancelHandle',
        setOpen: 'changePanelVisible',
      },
      omit: ['setFilterValue', 'getPendingValue'],
    },
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
  Anchor: {
    props: { override: { collapseText: { type: 'ReactNode' } } },
    events: {
      rename: {
        click: 'onLinkClick',
        change: 'onChange',
        collapseChange: 'onCollapseChange',
      },
    },
    regions: { rename: { content: 'children' }, omit: ['collapseLabel'] },
  },
  Alert: {
    events: { rename: { close: 'onClose' } },
    regions: { rename: { content: 'children' } },
  },
  Application: {
    props: {
      extend: [
        {
          name: 'getPopupContainer',
          type: 'ApplicationPopupContainerGetter',
          description: { zh: '弹层挂载节点解析器', en: 'Popup container resolver' },
        },
      ],
    },
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
  Container: { regions: { rename: { content: 'children' } } },
  Header: { regions: { rename: { content: 'children' } } },
  Aside: { regions: { rename: { content: 'children' } } },
  Main: { regions: { rename: { content: 'children' } } },
  Footer: { regions: { rename: { content: 'children' } } },
  Hover: {
    events: {
      rename: {
        mouseEnter: 'onMouseEnter',
        mouseMove: 'onMouseMove',
        mouseLeave: 'onMouseLeave',
        visibleChange: 'onVisibleChange',
      },
    },
    regions: { rename: { content: 'children' } },
  },
  Form: {
    events: { rename: { submit: 'onSubmit', validate: 'onValidate' } },
    regions: { rename: { content: 'children' } },
  },
  FormItem: {
    regions: { rename: { content: 'children' } },
  },
  InputNumber: {
    events: {
      rename: {
        valueChange: 'onValueChange',
        input: 'onInput',
        change: 'onChange',
        focus: 'onFocus',
        blur: 'onBlur',
        clear: 'onClear',
        keyDown: 'onKeyDown',
        keyPress: 'onKeyPress',
        keyUp: 'onKeyUp',
        wheel: 'onWheel',
      },
    },
  },
  Mask: {
    props: {
      extend: [
        {
          name: 'scrimClassName',
          type: 'string',
          description: { zh: '遮罩背景 class', en: 'Scrim class name' },
        },
        {
          name: 'scrimStyle',
          type: 'CSSProperties',
          description: { zh: '遮罩背景样式', en: 'Scrim style' },
        },
      ],
    },
    events: { rename: { maskClick: 'onMaskClick' } },
    regions: { rename: { content: 'children' } },
  },
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
  Drawer: {
    props: {
      override: {
        title: { type: 'ReactNode' },
        header: { type: 'ReactNode | boolean' },
        footer: { type: 'ReactNode | boolean' },
        okButton: { type: 'boolean | Partial<ButtonProps>' },
        cancelButton: { type: 'boolean | Partial<ButtonProps>' },
      },
      extend: [
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
          name: 'zIndex',
          type: 'number',
          description: { zh: '浮层层级', en: 'Floating z-index' },
        },
        {
          name: 'classNames',
          type: 'DrawerClassNames',
          description: { zh: '内置区域 class', en: 'Classes for built-in regions' },
        },
      ],
    },
    events: {
      rename: {
        openChange: 'onOpenChange',
        ok: 'onOk',
        cancel: 'onCancel',
        open: 'onOpen',
        opened: 'onOpened',
        close: 'onClose',
        closed: 'onClosed',
        maskClick: 'onMaskClick',
        iconClick: 'onIconClick',
      },
    },
    regions: { rename: { content: 'children' }, omit: ['title', 'header', 'footer'] },
  },
  FloatButton: {
    props: {
      override: {
        icon: { type: 'ReactNode' },
        description: { type: 'ReactNode' },
        tooltip: { type: 'string | FloatButtonTooltipOptions' },
        badge: { type: 'boolean | FloatButtonBadgeOptions' },
      },
      extend: [
        {
          name: 'ariaLabel',
          type: 'string',
          description: { zh: '可访问名称', en: 'Accessible name' },
        },
      ],
    },
    events: {
      rename: {
        click: 'onClick',
        visibleChange: 'onVisibleChange',
        dragStart: 'onDragStart',
        dragging: 'onDragging',
        dragEnd: 'onDragEnd',
      },
    },
  },
  FloatButtonGroup: {
    props: {
      override: {
        expandIcon: { type: 'ReactNode' },
        foldIcon: { type: 'ReactNode' },
        expandTooltip: { type: 'string | FloatButtonTooltipOptions' },
        foldTooltip: { type: 'string | FloatButtonTooltipOptions' },
        badge: { type: 'FloatButtonBadgeOptions' },
      },
    },
    events: {
      rename: {
        visibleChange: 'onVisibleChange',
        expandedChange: 'onExpandedChange',
        expand: 'onExpand',
        fold: 'onFold',
        click: 'onClick',
      },
    },
    regions: { rename: { content: 'children' } },
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
  Grid: {
    props: { override: { tag: { type: 'ElementType' } } },
    regions: { rename: { content: 'children' } },
  },
  GridItem: { regions: { rename: { content: 'children' } } },
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
  QRCode: {
    events: { rename: { refresh: 'onRefresh', error: 'onError' } },
    regions: { rename: { expired: 'expiredContent' } },
  },
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
  Descriptions: {
    props: {
      extend: [
        {
          name: 'titleContent',
          type: 'ReactNode',
          description: { zh: '自定义标题内容', en: 'Custom title content' },
        },
      ],
    },
    regions: { rename: { content: 'children' }, omit: ['title'] },
  },
  DescriptionItem: {
    props: {
      extend: [
        {
          name: 'labelContent',
          type: 'ReactNode',
          description: { zh: '自定义标签内容', en: 'Custom label content' },
        },
      ],
    },
    regions: { rename: { content: 'children' }, omit: ['label'] },
  },
  List: {
    props: {
      extend: [
        {
          name: 'renderItem',
          type: '(item: Item, index: number) => ReactNode',
          description: { zh: '渲染数据项目', en: 'Renders a source item' },
        },
      ],
    },
    regions: { rename: { content: 'children' }, omit: ['item'] },
  },
  ListItem: {
    props: {
      extend: [
        {
          name: 'titleContent',
          type: 'ReactNode',
          description: { zh: '自定义标题内容', en: 'Custom title content' },
        },
        {
          name: 'descriptionContent',
          type: 'ReactNode',
          description: { zh: '自定义描述内容', en: 'Custom description content' },
        },
      ],
    },
    regions: {
      rename: { content: 'children', leading: 'leading', actions: 'actions' },
      omit: ['title', 'description'],
    },
  },
  PageHeader: {
    props: {
      extend: [
        {
          name: 'backAriaLabel',
          type: 'string',
          description: { zh: '返回操作可访问名称', en: 'Accessible name for the back action' },
        },
      ],
    },
    events: { rename: { back: 'onBack' } },
    regions: {
      rename: {
        body: 'children',
        backIcon: 'backIcon',
        header: 'header',
        title: 'titleContent',
        titleContainer: 'titleContainer',
        tags: 'tags',
        description: 'description',
        actions: 'actions',
        breadcrumb: 'breadcrumb',
      },
    },
  },
  Panels: {
    regions: { rename: { content: 'children' } },
  },
  Panel: {
    regions: { rename: { content: 'children' } },
  },
  Spin: {
    props: {
      extend: [
        {
          name: 'tipContent',
          type: 'ReactNode',
          description: { zh: '自定义提示内容', en: 'Custom tip content' },
        },
      ],
    },
    regions: { rename: { content: 'children' }, omit: ['tip'] },
  },
  Time: {
    events: { rename: { finished: 'onFinished' } },
    regions: { rename: { content: 'children' } },
  },
  Tree: {
    props: {
      rename: { defaultExpandValues: 'defaultExpandedValues' },
      omit: [
        'expandIcon',
        'expandWrapperByChildren',
        'filterInputValue',
        'foldIcon',
        'prefixIcon',
        'useVirtualScroll',
        'virtualScrollBuffer',
      ],
      extend: [
        {
          name: 'defaultFilterValue',
          type: 'string',
          defaultValue: "''",
          description: { zh: '非受控初始过滤文字', en: 'Initial uncontrolled filter text' },
        },
        {
          name: 'filterInputProps',
          type: "Omit<InputHTMLAttributes<HTMLInputElement>, 'disabled' | 'onChange' | 'placeholder' | 'value'>",
          description: { zh: '过滤输入框原生属性', en: 'Native filter input attributes' },
        },
      ],
    },
    events: {
      rename: {
        treeDataChange: 'onTreeDataChange',
        expandValuesChange: 'onExpandedValuesChange',
        selectedValuesChange: 'onSelectedValuesChange',
        visibleNodesChange: 'onVisibleNodesChange',
        filterValueChange: 'onFilterValueChange',
        expand: 'onExpand',
        select: 'onSelect',
        nodeClick: 'onNodeClick',
        nodeContextMenu: 'onNodeContextMenu',
        reachTop: 'onReachTop',
        reachBottom: 'onReachBottom',
      },
      extend: [
        {
          name: 'onLoadError',
          type: '(error: unknown, node: TreeNormalizedNode<TreeOption>) => void',
          description: { zh: '动态加载失败回调', en: 'Called when dynamic loading fails' },
        },
        {
          name: 'onDropError',
          type: '(error: unknown) => void',
          description: { zh: '异步放置失败回调', en: 'Called when an asynchronous drop fails' },
        },
      ],
    },
    regions: { rename: { treeNode: 'renderNode', empty: 'renderEmpty' } },
    commands: {
      extend: [
        {
          name: 'element',
          type: 'HTMLDivElement | null',
          description: { zh: '树根元素', en: 'Tree root element' },
        },
        {
          name: 'focus',
          type: '(value?: TreeValue) => void',
          description: {
            zh: '聚焦指定或首个可用节点',
            en: 'Focuses a value or the first enabled node',
          },
        },
      ],
    },
  },
  TreeSelect: {
    props: {
      rename: { defaultExpandValues: 'defaultExpandedValues' },
      omit: [
        'expandIcon',
        'expandWrapperByChildren',
        'filterInputValue',
        'fitContentInputMinWidth',
        'flip',
        'foldIcon',
        'hideFilterInput',
        'inputDebounce',
        'prefixIcon',
        'collapseTagsFillUp',
        'useBuiltInPanelFilter',
        'useVirtualScroll',
        'virtualScrollBuffer',
      ],
      extend: [
        {
          name: 'arrow',
          type: 'boolean',
          defaultValue: 'false',
          description: { zh: '显示浮层箭头', en: 'Shows the popup arrow' },
        },
        {
          name: 'distance',
          type: 'number',
          defaultValue: '4',
          description: { zh: '浮层主轴间距', en: 'Popup main-axis distance' },
        },
        {
          name: 'skidding',
          type: 'number',
          description: { zh: '浮层交叉轴偏移', en: 'Popup cross-axis offset' },
        },
        {
          name: 'portalContainer',
          type: 'PortalTarget',
          defaultValue: "'body'",
          description: { zh: 'Portal 容器', en: 'Portal destination' },
        },
        {
          name: 'inputProps',
          type: "Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'onClick'>",
          description: { zh: '原生输入框属性', en: 'Native input attributes' },
        },
        {
          name: 'confirmButtonProps',
          type: 'Partial<ButtonProps>',
          description: { zh: '确认按钮属性', en: 'Confirmation-button properties' },
        },
        {
          name: 'cancelButtonProps',
          type: 'Partial<ButtonProps>',
          description: { zh: '取消按钮属性', en: 'Cancellation-button properties' },
        },
        {
          name: 'panelStyle',
          type: 'CSSProperties',
          description: { zh: '面板样式', en: 'Popup panel styles' },
        },
        {
          name: 'className',
          type: 'string',
          description: { zh: '根元素类名', en: 'Root class name' },
        },
        {
          name: 'style',
          type: 'CSSProperties',
          description: { zh: '根元素样式', en: 'Root styles' },
        },
      ],
    },
    events: {
      rename: {
        treeDataChange: 'onTreeDataChange',
        expandValuesChange: 'onExpandedValuesChange',
        expand: 'onExpand',
        select: 'onSelect',
        nodeClick: 'onNodeClick',
        nodeContextMenu: 'onNodeContextMenu',
        valueChange: 'onValueChange',
        openChange: 'onOpenChange',
        filterValueChange: 'onFilterValueChange',
        clear: 'onClear',
        confirm: 'onConfirm',
        cancel: 'onCancel',
      },
      omit: [
        'visibleNodesChange',
        'reachTop',
        'reachBottom',
        'pendingValueChange',
        'focus',
        'blur',
        'input',
      ],
      override: {
        valueChange: { type: '(value: TreeSelectModelValue) => void' },
        openChange: { type: '(open: boolean, details: PickerOpenChangeDetails) => void' },
        filterValueChange: { type: '(value: string) => void' },
        expandValuesChange: { type: '(values: TreeValue[]) => void' },
        treeDataChange: { type: '(data: readonly TreeSelectOption[]) => void' },
        expand: { type: "TreeProps['onExpand']" },
        select: { type: "TreeProps['onSelect']" },
        nodeClick: { type: "TreeProps['onNodeClick']" },
        nodeContextMenu: { type: "TreeProps['onNodeContextMenu']" },
        clear: { type: '(value: TreeSelectModelValue) => void' },
        confirm: {
          type: '(value: TreeSelectModelValue, event?: MouseEvent<HTMLElement>) => void',
        },
        cancel: {
          type: '(value: TreeSelectModelValue, event?: MouseEvent<HTMLElement>) => void',
        },
      },
      extend: [
        {
          name: 'onLoadError',
          type: '(error: unknown, node: TreeNormalizedNode<TreeOption>) => void',
          description: { zh: '动态加载失败回调', en: 'Called when dynamic loading fails' },
        },
        {
          name: 'onDropError',
          type: '(error: unknown) => void',
          description: { zh: '异步放置失败回调', en: 'Called when an asynchronous drop fails' },
        },
      ],
    },
    regions: {
      rename: {
        trigger: 'renderTrigger',
        tag: 'renderTag',
        selection: 'renderSelection',
        treeNode: 'renderNode',
        panelHeader: 'panelHeader',
        panelFooter: 'panelFooter',
        empty: 'emptyContent',
      },
      omit: ['confirm'],
      override: {
        trigger: { type: '(context: TreeSelectTriggerContext) => ReactNode' },
        tag: { type: '(tag: TreeSelectTagData<TreeSelectOption>) => ReactNode' },
        selection: {
          type: '(nodes: readonly TreeNormalizedNode<TreeSelectOption>[], tags: readonly TreeSelectTagData<TreeSelectOption>[]) => ReactNode',
        },
        treeNode: { type: '(context: TreeNodeRenderContext) => ReactNode' },
        panelHeader: { type: 'ReactNode' },
        panelFooter: { type: 'ReactNode' },
        empty: { type: 'ReactNode' },
      },
    },
    commands: {
      omit: ['setOpen'],
      extend: [
        {
          name: 'input',
          type: 'HTMLInputElement | null',
          description: { zh: '默认触发器输入框', en: 'Default trigger input' },
        },
        {
          name: 'popup',
          type: 'HTMLDivElement | null',
          description: { zh: '浮层元素', en: 'Popup element' },
        },
        {
          name: 'focus',
          type: '() => void',
          description: { zh: '聚焦触发器', en: 'Focuses the trigger' },
        },
        {
          name: 'blur',
          type: '() => void',
          description: { zh: '移出触发器焦点', en: 'Blurs the trigger' },
        },
        {
          name: 'open',
          type: '() => void',
          description: { zh: '打开面板', en: 'Opens the popup' },
        },
        {
          name: 'close',
          type: '() => void',
          description: { zh: '关闭面板', en: 'Closes the popup' },
        },
        {
          name: 'clear',
          type: '() => void',
          description: { zh: '清空选择', en: 'Clears selection' },
        },
        {
          name: 'updatePosition',
          type: '() => Promise<void>',
          description: { zh: '重新计算浮层位置', en: 'Updates popup placement' },
        },
      ],
    },
  },
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
