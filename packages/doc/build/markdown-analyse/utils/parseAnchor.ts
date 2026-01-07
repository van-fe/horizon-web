import type {
  ApiGeneratorAnalysedComponentDetail,
  ApiGeneratorAnalysedDirectiveDetail,
  ApiGeneratorAnalysedMethodDetail,
} from '@aurora/utils';
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
        content += `<h-anchor-link title="${pluginInfo.name} Props" href="#${pluginInfo.name} Props"></h-anchor-link>`;
      }

      if ('emits' in pluginInfo && pluginInfo.emits.length) {
        content += `<h-anchor-link title="${pluginInfo.name} Emits" href="#${pluginInfo.name} Emits"></h-anchor-link>`;
      }

      if ('slots' in pluginInfo && pluginInfo.slots.length) {
        content += `<h-anchor-link title="${pluginInfo.name} Slots" href="#${pluginInfo.name} Slots"></h-anchor-link>`;
      }

      if ('exposes' in pluginInfo && pluginInfo.exposes.length) {
        content += `<h-anchor-link title="${pluginInfo.name} Exposes" href="#${pluginInfo.name} Exposes"></h-anchor-link>`;
      }
      break;
    case 'directives':
      if ('options' in pluginInfo && pluginInfo.options.length) {
        content += `<h-anchor-link title="${pluginInfo.name} Options" href="#${pluginInfo.name} Options"></h-anchor-link>`;
      }
      break;
    case 'methods':
      if ('options' in pluginInfo && pluginInfo.options.length) {
        content += `<h-anchor-link title="${pluginInfo.name} Options" href="#${pluginInfo.name} Options"></h-anchor-link>`;
      }
      if ('methods' in pluginInfo && pluginInfo.methods.length) {
        content += `<h-anchor-link title="${pluginInfo.name} Methods" href="#${pluginInfo.name} Methods"></h-anchor-link>`;
      }
  }

  return renderMainAnchor
    ? `<h-anchor-link title="${pluginInfo.name} Api" href="#${pluginInfo.name} Api">${content}</h-anchor-link>`
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
    <h-anchor scroll-container=".scroller-view" size="medium" style="margin: 0;">
      <h-anchor-link title="Demos" href="#Demos">
        ${rightMenus.map(curr => `<h-anchor-link href="#${curr}" title="${curr}" />`).join('\n')}
      </h-anchor-link>
      ${dependencePlugins
        .map(curr => getApiAnchor(curr, dependencePlugins.length > 1, pluginType))
        .join('')}
    </h-anchor>
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
    <h-anchor scroll-container=".scroller-view" size="medium" style="margin: 0;">
      <h-anchor-link title="Demos" href="#Demos">
        ${rightMenus.map(curr => `<h-anchor-link href="#${curr}" title="${curr}" />`).join('\n')}
      </h-anchor-link>
    </h-anchor>
  </div>`,
  };
}
