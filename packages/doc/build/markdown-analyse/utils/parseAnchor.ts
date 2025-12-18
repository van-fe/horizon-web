import type {
  ApiGeneratorAnalysedComponentDetail,
  ApiGeneratorAnalysedDirectiveDetail,
  ApiGeneratorAnalysedMethodDetail,
} from '@aurora/shared';
import { getHeadingContent } from './utils';

function getApiAnchor(
  pluginInfo:
    | ApiGeneratorAnalysedComponentDetail
    | ApiGeneratorAnalysedDirectiveDetail
    | ApiGeneratorAnalysedMethodDetail,
  renderMainAnchor: boolean,
  type: 'components' | 'directives' | 'methods',
) {
  let content = '';

  switch (type) {
    case 'components':
      if ('props' in pluginInfo && pluginInfo.props?.length) {
        content += `<n-anchor-link title="${pluginInfo.name} Props" href="#${pluginInfo.name} Props"></n-anchor-link>`;
      }

      if ('emits' in pluginInfo && pluginInfo.emits.length) {
        content += `<n-anchor-link title="${pluginInfo.name} Emits" href="#${pluginInfo.name} Emits"></n-anchor-link>`;
      }

      if ('slots' in pluginInfo && pluginInfo.slots.length) {
        content += `<n-anchor-link title="${pluginInfo.name} Slots" href="#${pluginInfo.name} Slots"></n-anchor-link>`;
      }

      if ('exposes' in pluginInfo && pluginInfo.exposes.length) {
        content += `<n-anchor-link title="${pluginInfo.name} Exposes" href="#${pluginInfo.name} Exposes"></n-anchor-link>`;
      }
      break;
    case 'directives':
      if ('options' in pluginInfo && pluginInfo.options.length) {
        content += `<n-anchor-link title="${pluginInfo.name} Options" href="#${pluginInfo.name} Options"></n-anchor-link>`;
      }
      break;
    case 'methods':
      if ('options' in pluginInfo && pluginInfo.options.length) {
        content += `<n-anchor-link title="${pluginInfo.name} Options" href="#${pluginInfo.name} Options"></n-anchor-link>`;
      }
      if ('methods' in pluginInfo && pluginInfo.methods.length) {
        content += `<n-anchor-link title="${pluginInfo.name} Methods" href="#${pluginInfo.name} Methods"></n-anchor-link>`;
      }
  }

  return renderMainAnchor
    ? `<n-anchor-link title="${pluginInfo.name} Api" href="#${pluginInfo.name} Api">${content}</n-anchor-link>`
    : content;
}

export default function (
  content: string,
  dependencePlugins: Array<
    ApiGeneratorAnalysedComponentDetail | ApiGeneratorAnalysedDirectiveDetail
  >,
  pluginType: 'components' | 'directives' | 'methods',
) {
  const rightMenus: string[] = [];

  content = content.replace(/<h3>(.*?)<\/h3>/g, h3 => {
    const title = h3.replace(/<.*?>/g, '');
    rightMenus.push(title);

    return getHeadingContent(title, 'h3');
  });

  return {
    output: `${getHeadingContent('Demos')}${content}${getHeadingContent('Api')}`,
    rightMenu: `<div class="right-menu">
    <n-anchor scroll-container=".scroller-view" size="medium" style="margin: 0;">
      <n-anchor-link title="Demos" href="#Demos">
        ${rightMenus.map(curr => `<n-anchor-link href="#${curr}" title="${curr}" />`).join('\n')}
      </n-anchor-link>
      ${dependencePlugins
        .map(curr => getApiAnchor(curr, dependencePlugins.length > 1, pluginType))
        .join('')}
    </n-anchor>
  </div>`,
  };
}

export function parseNormalAnchor(content: string, withTopHeading = true) {
  const rightMenus: string[] = [];

  content = content.replace(/<h3>(.*?)<\/h3>/g, h3 => {
    const title = h3.replace(/<.*?>/g, '');
    rightMenus.push(title);

    return getHeadingContent(title, 'h3');
  });

  return {
    output: `${withTopHeading ? getHeadingContent('Demos') : ''}${content}`,
    rightMenu: `<div class="right-menu">
    <n-anchor scroll-container=".scroller-view" size="medium" style="margin: 0;">
      <n-anchor-link title="Demos" href="#Demos">
        ${rightMenus.map(curr => `<n-anchor-link href="#${curr}" title="${curr}" />`).join('\n')}
      </n-anchor-link>
    </n-anchor>
  </div>`,
  };
}
