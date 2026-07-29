import { escapeHtml, getHeadingContent } from './utils';
import type {
  ApiGeneratorAnalysedComponentDetail,
  ApiGeneratorAnalysedDirectiveDetail,
  ApiGeneratorAnalysedEmitType,
  ApiGeneratorAnalysedExposeType,
  ApiGeneratorAnalysedMethodDetail,
  ApiGeneratorAnalysedMethodType,
  ApiGeneratorAnalysedPropType,
  ApiGeneratorAnalysedSlotType,
  ApiGeneratorAnalysedOptionType,
} from '@aurora/utils';
import { kebabCase, isString } from '@aurora/utils';

function createDeprecatedTips(deprecated: string) {
  return `<deprecated-tips name="${deprecated}" />`;
}

function createVersionTips(version: string) {
  return `<version-tips desc="${version}" />`;
}

function analyseProps(
  props: ApiGeneratorAnalysedPropType[],
  emits: ApiGeneratorAnalysedEmitType[],
) {
  const tbody: string[] = [];

  props.forEach(prop => {
    let name = kebabCase(prop.name);

    if (name === 'model-value' && emits.some(emit => emit.name === 'update:modelValue')) {
      name = 'v-model';
    }

    tbody.push(`<tr>
        <td style="word-break: keep-all">${name}${
          isString(prop.deprecated) ? createDeprecatedTips(prop.deprecated) : ''
        }${isString(prop.version) ? createVersionTips(prop.version) : ''}</td>
        <td>${escapeHtml(prop.desc)}</td>
        <td><code>${escapeHtml(prop.type || prop.baseType)}</code></td>
        <td class="text-center">${prop.required ? '是' : '否'}</td>
        <td>${escapeHtml(prop.default.toString())}</td>
</tr>`);
  });

  return `<table class="md-table">
  <thead>
  <tr>
    <th>属性</th>
    <th>说明</th>
    <th>类型</th>
    <th style="min-width: 50px" class="text-center">必填</th>
    <th>默认值</th>
  </tr>
  </thead>
  <tbody>
  ${tbody.join('')}
  </tbody>
  </table>`;
}

function analyseEmits(emits: ApiGeneratorAnalysedEmitType[]) {
  const tbody: string[] = [];

  emits.forEach(emit => {
    if (emit.name === 'update:modelValue') {
      return;
    }

    tbody.push(`<tr>
        <td rowspan="${emit.params.length || 1}" style="word-break: keep-all">${kebabCase(
          emit.name,
        )}${isString(emit.deprecated) ? createDeprecatedTips(emit.deprecated) : ''}</td>
        <td rowspan="${emit.params.length || 1}">${escapeHtml(emit.desc)}</td>
        <td rowspan="${emit.params.length || 1}">(
${emit.params
  .map(param => {
    return `${param.field}: <code>${escapeHtml(param.value)}</code>`;
  })
  .join(', ')}
) => <code>void</code></td>
        ${
          emit.params.length > 0
            ? emit.params
                .map(param => {
                  return `<td style="word-break: keep-all">${escapeHtml(param.field)}</td>
            <td><code>${escapeHtml(param.value)}</code></td>
            <td>${escapeHtml(param.desc)}</td>
`;
                })
                .join('</tr><tr>')
            : `<td>-</td><td>-</td><td>-</td>`
        }
</tr>`);
  });

  return `<table class="md-table">
  <thead>
  <tr>
    <th>属性</th>
    <th>说明</th>
    <th>类型</th>
    <th>参数名</th>
    <th>参数类型</th>
    <th>参数说明</th>
  </tr>
  </thead>
  <tbody>
  ${tbody.join('')}
  </tbody>
  </table>`;
}

function analyseSlots(slots: ApiGeneratorAnalysedSlotType[]) {
  const tbody: string[] = [];

  slots.forEach(slot => {
    tbody.push(`<tr>
        <td rowspan="${slot.params.length || 1}" style="word-break: keep-all">${slot.name}${
          isString(slot.deprecated) ? createDeprecatedTips(slot.deprecated) : ''
        }</td>
        <td rowspan="${slot.params.length || 1}">${escapeHtml(slot.desc)}</td>
        <td rowspan="${slot.params.length || 1}">(
${slot.params
  .map(param => {
    return `${param.field}: <code>${escapeHtml(param.value)}</code>`;
  })
  .join(', ')}
) => <code>VNode</code></td>
        ${
          slot.params.length > 0
            ? slot.params
                .map(param => {
                  return `<td style="word-break: keep-all">${param.field}</td>
            <td><code>${escapeHtml(param.value)}</code></td>
            <td>${escapeHtml(param.desc)}</td>
`;
                })
                .join('</tr><tr>')
            : '<td>-</td><td>-</td><td>-</td>'
        }
</tr>`);
  });

  return `<table class="md-table">
  <thead>
  <tr>
    <th>属性</th>
    <th>说明</th>
    <th>类型</th>
    <th>参数名</th>
    <th>参数类型</th>
    <th>参数说明</th>
  </tr>
  </thead>
  <tbody>
  ${tbody.join('')}
  </tbody>
  </table>`;
}

function analyseExposes(exposes: ApiGeneratorAnalysedExposeType[]) {
  const tbody: string[] = [];

  exposes.forEach(expose => {
    const rowspan = (expose.params.length + expose.returns.length) || 1;
    const allParams = [...expose.params, ...expose.returns];
    tbody.push(`<tr>
        <td rowspan="${rowspan}" style="word-break: keep-all">${expose.name}${
          isString(expose.deprecated) ? createDeprecatedTips(expose.deprecated) : ''
        }</td>
        <td rowspan="${rowspan}">${escapeHtml(expose.desc)}</td>
        <td rowspan="${rowspan}">${
          expose.nativeType === 'function'
            ? `(
${expose.params
  .map(param => {
    return `${param.field}: <code>${escapeHtml(param.value)}</code>`;
  })
  .join(', ')}
) => <code>${escapeHtml(expose.returnText)}</code>`
            : `<code>${escapeHtml(expose.type)}</code>`
        }
</td>
${allParams.length > 0
    ? allParams
        .map(param => {
          return `<td style="word-break: keep-all">${param.field}</td>
            <td><code>${escapeHtml(param.value)}</code></td>
            <td>${escapeHtml(param.desc) || '-'}</td>
`;
        })
        .join('</tr><tr>')
    : '<td>-</td><td>-</td><td>-</td>'
}
</tr>`);
  });

  return `<table class="md-table">
  <thead>
  <tr>
    <th>属性</th>
    <th>说明</th>
    <th>类型</th>
    <th>入参/出参名</th>
    <th>入参/出参类型</th>
    <th>入参/出参说明</th>
  </tr>
  </thead>
  <tbody>
  ${tbody.join('')}
  </tbody>
  </table>`;
}

function analyseOptions(options: ApiGeneratorAnalysedOptionType[]) {
  const tbody: string[] = [];

  options.forEach(option => {
    tbody.push(`<tr>
        <td rowspan="${option.params?.length || 1}" style="word-break: keep-all">${option.name}${
          isString(option.deprecated) ? createDeprecatedTips(option.deprecated) : ''
        }</td>
        <td rowspan="${option.params?.length || 1}">${escapeHtml(option.desc)}</td>
        <td rowspan="${option.params?.length || 1}">${escapeHtml(
          option.required ? '是' : '否',
        )}</td>
        <td rowspan="${option.params?.length || 1}">${
          escapeHtml(option.default.toString()) || '-'
        }</td>
        <td rowspan="${option.params?.length || 1}"><code>
        ${
          option.options.length
            ? option.options.map(curr => `'${curr}'`).join(` | `)
            : option.type || option.baseType
        }</code>
</td>
${
  option.params?.length
    ? option.params
        .map(param => {
          return `<td style="word-break: keep-all">${param.field}</td>
            <td><code>${escapeHtml(param.value)}</code></td>
            <td>${escapeHtml(param.desc) || '-'}</td>
`;
        })
        .join('</tr><tr>')
    : '<td>-</td><td>-</td><td>-</td>'
}
</tr>`);
  });

  return `<table class="md-table">
  <thead>
  <tr>
    <th>属性</th>
    <th>说明</th>
    <th>是否必填</th>
    <th>默认值</th>
    <th>类型</th>
    <th>参数名</th>
    <th>参数类型</th>
    <th>参数说明</th>
  </tr>
  </thead>
  <tbody>
  ${tbody.join('')}
  </tbody>
  </table>`;
}

function analyseMethods(methods: ApiGeneratorAnalysedMethodType[]) {
  const tbody: string[] = [];

  methods.forEach(method => {
    tbody.push(`<tr>
        <td rowspan="${method.params.length || 1}" style="word-break: keep-all">${method.name}${
          isString(method.deprecated) ? createDeprecatedTips(method.deprecated) : ''
        }</td>
        <td rowspan="${method.params.length || 1}">${escapeHtml(method.desc)}</td>
        <td rowspan="${method.params.length || 1}">(
${method.params
  .map(param => {
    return `${param.field}: <code>${escapeHtml(param.value)}</code>`;
  })
  .join(', ')}
) => <code>${escapeHtml(method.return || '')}</code></td>
${
  method.params.length > 0
    ? method.params
        .map(param => {
          return `<td style="word-break: keep-all">${param.field}</td>
            <td><code>${escapeHtml(param.value)}</code></td>
            <td>${escapeHtml(param.desc) || '-'}</td>
`;
        })
        .join('</tr><tr>')
    : '<td>-</td><td>-</td><td>-</td>'
}
</tr>`);
  });

  return `<table class="md-table">
  <thead>
  <tr>
    <th>属性</th>
    <th>说明</th>
    <th>类型</th>
    <th>参数名</th>
    <th>参数类型</th>
    <th>参数说明</th>
  </tr>
  </thead>
  <tbody>
  ${tbody.join('')}
  </tbody>
  </table>`;
}

export default function (
  modeInfo:
    | ApiGeneratorAnalysedComponentDetail
    | ApiGeneratorAnalysedDirectiveDetail
    | ApiGeneratorAnalysedMethodDetail,
  renderMainApiHeading: boolean,
  type: 'components' | 'directives' | 'methods',
) {
  let content = renderMainApiHeading ? getHeadingContent(modeInfo.name + ' Api') : '';

  switch (type) {
    case 'components':
      {
        const componentInfo = modeInfo as ApiGeneratorAnalysedComponentDetail;
        if (componentInfo.props.length) {
          content += getHeadingContent(componentInfo.name + ' Props', 'h3');
          content += analyseProps(componentInfo.props, componentInfo.emits);
        }

        if (componentInfo.emits.length) {
          content += getHeadingContent(componentInfo.name + ' Emits', 'h3');
          content += analyseEmits(componentInfo.emits);
        }

        if (componentInfo.slots.length) {
          content += getHeadingContent(componentInfo.name + ' Slots', 'h3');
          content += analyseSlots(componentInfo.slots);
        }

        if (componentInfo.exposes.length) {
          content += getHeadingContent(componentInfo.name + ' Exposes', 'h3');
          content += analyseExposes(componentInfo.exposes);
        }
      }
      break;
    case 'directives':
      {
        const directiveInfo = modeInfo as ApiGeneratorAnalysedDirectiveDetail;

        if (directiveInfo.options.length) {
          content += getHeadingContent(directiveInfo.name + ' Options', 'h3');
          content += analyseOptions(directiveInfo.options);
        }
      }
      break;
    case 'methods':
      {
        const methodInfo = modeInfo as ApiGeneratorAnalysedMethodDetail;
        if (methodInfo.options.length) {
          content += getHeadingContent(methodInfo.name + ' Options', 'h3');
          content += analyseOptions(methodInfo.options);
        }
        if (methodInfo.methods.length) {
          content += getHeadingContent(methodInfo.name + ' Methods', 'h3');
          content += analyseMethods(methodInfo.methods);
        }
      }
      break;
  }

  return content
    .replace(/\\n\s*/g, '<br>')
    .replace(/\\{/g, '{')
    .replace(/\\}/g, '}')
    .replace(/<hr>/g, `<h-divider />`)
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\[(.*?)]\((.*?)\)/g, '<h-link href="$2">$1</h-link>');
}
