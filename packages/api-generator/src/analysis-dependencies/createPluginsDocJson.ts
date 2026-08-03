import type { SourceFile } from 'ts-morph';
import { Project, SyntaxKind } from 'ts-morph';
import { excludeFiles } from '../utils';
import type { ApiGeneratorExportedPlugin } from '@aurora/utils';
import * as fs from 'fs';
import merge from 'deepmerge';
import {
  docDescriptionOutput,
  horizonwebProjectRoot,
  apiGeneratorOutPut,
} from '@root/scripts/paths';
import { writeJsonFile } from '@root/scripts/writeJsonFile';
import { red } from '@root/scripts/log';

export interface ComponentDeclarationType {
  props: Record<string, string>;
  events: Record<string, string>;
  slots: Record<string, string>;
}
export interface DirectiveDeclarationType {
  options: Record<string, string>;
}

const availableLanguages: string[] = ['zh', 'en'];

function snakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (all, index) => {
    return (index === 0 ? '' : '-') + all.toLowerCase();
  });
}

export default async function(exportedPlugins: Record<string, ApiGeneratorExportedPlugin>) {
  const project = new Project({
    compilerOptions: {
      emitDeclarationOnly: true,
      outDir: apiGeneratorOutPut,
      baseUrl: horizonwebProjectRoot,
      preserveSymlinks: true,
    },
    tsConfigFilePath: horizonwebProjectRoot + '/tsconfig.json',
    skipAddingFilesFromTsConfig: true,
  });

  const filePaths = excludeFiles([
    ...new Set(Object.values(exportedPlugins).map(item => item.entrancePath)),
  ]).sort();

  const sourceFiles: SourceFile[] = [];

  filePaths.map(async path => {
    const sourceFile = project.addSourceFileAtPath(path);
    sourceFiles.push(sourceFile);
  });

  const componentsDescription: Record<string, ComponentDeclarationType> = {};

  sourceFiles.forEach(sourceFile => {
    const pluginPath = sourceFile.getFilePath();
    const pluginName =
      pluginPath.match(/(?<=(components|directives)\/)(([A-Z]|v-)\w+)/g)?.[0] || '';
    const isComponent = pluginPath.includes('components');

    if (!pluginName) {
      red(`This path is not direct to a component or directive: ${pluginPath}`);
      return;
    }

    if (isComponent) {
      const allExportedComponentNames: string[] = [];
      Object.entries(exportedPlugins).forEach(([key, info]) => {
        if (info.fileName === pluginName) {
          allExportedComponentNames.push(key);
        }
      });

      allExportedComponentNames.forEach(comName => {
        const noPrefixComName = comName.replace(/^H/, '');
        const componentDeclaration: ComponentDeclarationType = {
          props: {},
          events: {},
          slots: {},
        };

        const propsVariableName = `use${noPrefixComName}Props`;
        const emitsVariableName = `use${noPrefixComName}Emits`;
        const slotsVariableName = `use${noPrefixComName}Slots`;

        const props = sourceFile.getVariableStatement(propsVariableName);
        const emits = sourceFile.getVariableStatement(emitsVariableName);
        const slots = sourceFile.getVariableStatement(slotsVariableName);

        props?.getDeclarations().forEach(declaration => {
          declaration
            .getType()
            .getProperties()
            .forEach(property => {
              componentDeclaration.props[property.getName()] = '';
            });
        });

        emits?.getDeclarations().forEach(declaration => {
          declaration
            .getType()
            .getProperties()
            .forEach(property => {
              componentDeclaration.events[property.getName()] = '';
            });
        });

        slots
          ?.getDeclarations()[0]
          .forEachChildAsArray()
          .filter(item => item.getKind() === SyntaxKind.ArrayLiteralExpression)
          .forEach(child => {
            (eval(child.getText()) as string[]).forEach(item => {
              componentDeclaration.slots[item] = '';
            });
          });

        componentsDescription[noPrefixComName] = componentDeclaration;
      });
    } else {
      // todo:: directives
    }
  });

  Object.entries(componentsDescription).forEach(([key, value]) => {
    availableLanguages.forEach(lang => {
      const path = docDescriptionOutput + '/' + lang;
      fs.mkdirSync(path, { recursive: true });

      const fileName = snakeCase(key) + '.json';
      fs.readFile(path + '/' + fileName, { encoding: 'utf-8' }, (err, fileContent) => {
        if (err) {
          fileContent = '';
        }

        if (fileContent) {
          const json = JSON.parse(fileContent);

          value = merge(value, json);
        }

        writeJsonFile(path, fileName, JSON.stringify(value, null, 2));
      });
    });
  });
}
