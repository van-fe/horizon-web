/**
 * web-types is a json file which just for Jetbrains's IDEs to provide autocomplete.
 * for more details: https://github.com/jetbrains/web-types
 */
import { apiGeneratorOutPut } from '@root/scripts/paths';
import { writeJsonFile } from '@root/scripts/writeJsonFile';
import type {
  ApiGeneratorAnalysedComponentDetail,
  ApiGeneratorAnalysedEmitParamType,
  ApiGeneratorAnalysedEmitType,
  ApiGeneratorAnalysedPropType,
  ApiGeneratorAnalysedSlotType,
  ApiGeneratorAnalysedDirectiveDetail,
  ApiGeneratorAnalysedOptionType,
} from '@aurora/utils';
import { capitalize, kebabCase } from '@aurora/utils';
import version from '../../../../versions.json';
import components from '../../dist/components-analysis.json';
import directives from '../../dist/directives-analysis.json';

export default async function createWebTypesJson() {
  const getDocUrl = (cmp: string, heading?: string, type = 'components') =>
    `https://aurora-design.nio.com/horizon-web/dev-component/vue/base/component/${cmp.toLowerCase()}${
      heading ? `#${capitalize(cmp)}${heading}` : ''
    }`;

  const createElements = (component: ApiGeneratorAnalysedComponentDetail) => {
    const createTagSlot = (slot: ApiGeneratorAnalysedSlotType) => {
      return {
        name: slot.name,
        pattern: undefined,
        description: slot.desc,
        'doc-url': getDocUrl(component.parentComponentName, 'slots'),
        // 'vue-properties':
        //   slot.props && Object.keys(slot.props).map(key => createTypedEntity(key, slot.props[key])),
      };
    };

    const createTagEvent = (event: ApiGeneratorAnalysedEmitType) => {
      return {
        name: event.name,
        description: event.desc,
        'doc-url': getDocUrl(component.parentComponentName, 'events'),
        arguments: [createTypedEntity('argument', event.params)],
      };
    };

    const createTagAttribute = (prop: ApiGeneratorAnalysedPropType) => {
      return {
        name: kebabCase(prop.name),
        source: {
          symbol: prop.name,
        },
        description: prop.desc,
        'doc-url': getDocUrl(component.parentComponentName, 'props'),
        default:
          prop.default === null
            ? 'null'
            : prop.default === undefined
            ? 'undefined'
            : prop.default.toString(),
        required: !prop.required ? undefined : true,
        value: createTagValue(prop.baseType),
        type: prop.type === 'boolean' ? 'boolean' : undefined, // this is deprecated but should be const 'boolean' for compatibility with 2019.2
      };
    };

    const createTagValue = (type: string) => {
      return {
        kind: 'expression',
        type,
      };
    };

    return {
      name: `n-${kebabCase(component.name)}`,
      source: {
        symbol: `N${component.name}`,
      },
      'doc-url': getDocUrl(component.parentComponentName),
      attributes: component.props.map(createTagAttribute),
      js: {
        events: component.emits.map(createTagEvent),
      },
      slots: component.slots.map(createTagSlot),
    };
  };

  const createTypedEntity = (name: string, type: ApiGeneratorAnalysedEmitParamType[]) => {
    return {
      name,
      type: JSON.stringify(type),
    };
  };

  const createAttribute = (directive: ApiGeneratorAnalysedDirectiveDetail) => {
    const createAttributeVueArgument = (argument: ApiGeneratorAnalysedOptionType) => {
      return {
        name: argument.name,
        description: argument.desc || '',
        'doc-url': getDocUrl(directive.name, 'options', 'directives'),
        default: argument.default,
        value: {
          kind: 'expression',
          type: argument.baseType,
        },
        type: argument.type,
      };
    };

    return {
      name: `v-${kebabCase(directive.name)}`,
      source: {
        symbol: directive.name,
      },
      description: directive.desc,
      'doc-url': getDocUrl(directive.name, '', 'directives'),
      value: {
        kind: 'expression',
      },
      attributes: directive.options.map(createAttributeVueArgument),
    };
  };

  const elements = (components as ApiGeneratorAnalysedComponentDetail[]).map(createElements);
  const attributes = (directives as ApiGeneratorAnalysedDirectiveDetail[]).map(createAttribute);

  const webTypes = {
    $schema: 'https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json',
    framework: 'vue',
    name: 'horizon-web',
    version: version['horizon-web'],
    'js-types-syntax': 'typescript',
    'description-markup': 'markdown',
    contributions: {
      html: {
        elements,
        attributes,
      },
    },
  };

  writeJsonFile(apiGeneratorOutPut, 'web-types.json', JSON.stringify(webTypes));
}
