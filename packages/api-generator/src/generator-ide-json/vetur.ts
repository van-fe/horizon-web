import { apiGeneratorOutPut } from '@root/scripts/paths';
import { writeJsonFile } from '@root/scripts/writeJsonFile';
import { kebabCase } from '@aurora/utils';
import components from '../../dist/components-analysis.json';
import directives from '../../dist/directives-analysis.json';

/**
 * vetur is a vscode plugin which provide vue autocomplete.
 * for more details: https://vuejs.github.io/vetur/
 */

export interface VeturTagType {
  attributes: string[];
  description: string;
}

export interface VeturAttributeType {
  type?: string;
  options?: (string | number)[];
  description?: string;
  global?: boolean;
}

export default async function createVeturJson() {
  const tags: Record<string, VeturTagType> = {};
  const attributes: Record<string, VeturAttributeType> = {};

  components.forEach(component => {
    tags[`n-${kebabCase(component.name)}`] = {
      attributes: component.props.map(prop => kebabCase(prop.name)),
      description: `[Docs](https://aurora-design.example.com/horizon-web/dev-component/vue/base/component/${component.parentComponentName.toLowerCase()})`,
    };

    component.props.forEach(prop => {
      attributes[`n-${kebabCase(component.name)}/${kebabCase(prop.name)}`] = {
        type: prop.baseType,
        options: prop.options,
        description: `${
          prop.desc
        }\n\n[Docs](https://aurora-design.example.com/horizon-web/dev-component/vue/base/component/${component.parentComponentName.toLowerCase()}#${
          component.name
        } Props)`,
      };
    });
  });

  directives.forEach(directive => {
    attributes[`v-${kebabCase(directive.name)}`] = { global: true, description: directive.desc };
  });

  writeJsonFile(apiGeneratorOutPut, 'tags.json', JSON.stringify(tags));
  writeJsonFile(apiGeneratorOutPut, 'attributes.json', JSON.stringify(attributes));
}
