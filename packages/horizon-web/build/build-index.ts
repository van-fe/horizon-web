import * as fs from 'fs';
import path, { resolve } from 'path';
import {
  apiGeneratorOutPut,
  componentRoot,
  directiveRoot,
  methodsRoot,
  styleRoot,
} from '@aurora/shared/plugins';
import * as shell from 'shelljs';
import type {
  ApiGeneratorExportedComponent,
  ApiGeneratorExportedDirectives,
  ApiGeneratorExportedMethod,
  ApiGeneratorExportedPluginType,
} from '@aurora/shared';
import { camelCase, kebabCase } from '@aurora/shared';

function capitalizeCamelCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const banner = `/**
 * {name}
 * This file is generated automatically by script: pnpm run build:index
 */\n\n`;

let componentDependencies: ApiGeneratorExportedComponent[] = [];
let directiveDependencies: ApiGeneratorExportedDirectives[] = [];
let methodDependencies: ApiGeneratorExportedMethod[] = [];
let typesDependencies: ApiGeneratorExportedPluginType[] = [];

function generateDependenciesJson() {
  shell.exec('pnpm run build:json');
  componentDependencies = require(apiGeneratorOutPut + `/components-dependencies.json`);
  directiveDependencies = require(apiGeneratorOutPut + `/directives-dependencies.json`);
  methodDependencies = require(apiGeneratorOutPut + `/methods-dependencies.json`);
  typesDependencies = require(apiGeneratorOutPut + `/types-dependencies.json`);
}

function buildComponentIndex() {
  let content = banner.replace('{name}', 'components');
  const components: Record<string, string[]> = {};

  componentDependencies.forEach(component => {
    if (!components[component.dirName]) {
      components[component.dirName] = [];
    }

    components[component.dirName].push(component.name);
  });

  Object.entries(components).forEach(([fileName, components]) => {
    content += `export { ${components.join(', ')} } from './${fileName}';\n`;
  });

  fs.writeFileSync(componentRoot + '/index.ts', content, 'utf-8');
}

function buildGlobalComponentsDeclaration() {
  let content = banner.replace('{name}', 'global components declaration');
  const components: Record<string, string[]> = {};

  componentDependencies.forEach(component => {
    if (!components[component.dirName]) {
      components[component.dirName] = [];
    }

    components[component.dirName].push(component.name);
  });

  Object.entries(components).forEach(([fileName, components]) => {
    content += `import type { ${components.join(', ')} } from './${fileName}';\n`;
  });

  content += `
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
`;

  componentDependencies.forEach(component => {
    content += `    ${component.name}: typeof ${component.name};\n`;
  });

  content += `  }
}\n`;

  fs.writeFileSync(componentRoot + '/globalComponents.ts', content, 'utf-8');
}

function buildStyleIndex() {
  let content = banner.replace('{name}', 'styles');
  const components = fs
    .readdirSync(componentRoot, { withFileTypes: true })
    .filter(dir => dir.isDirectory());
  const directives = fs
    .readdirSync(directiveRoot, { withFileTypes: true })
    .filter(dir => dir.isDirectory());
  const methods = fs
    .readdirSync(methodsRoot, { withFileTypes: true })
    .filter(dir => dir.isDirectory());

  content += `@forward './mixins';
@forward './presets/index';
@forward './presets/reset';
@forward './global-variables';

// components
`;

  const writeImport = (plugins: Array<fs.Dirent>, type = 'components', root = componentRoot) => {
    plugins.forEach(plugin => {
      const path = resolve(root, `${plugin.name}/src/style/index.scss`);

      if (fs.existsSync(path)) {
        content += `@forward '../${type}/${plugin.name}/src/style/index';\n`;
      }
    });
  };

  writeImport(components);
  content += '\n// directives\n';
  writeImport(directives, 'directives', directiveRoot);

  content += '\n// methods\n';
  writeImport(methods, 'methods', methodsRoot);

  fs.writeFileSync(styleRoot + '/index.scss', content, 'utf-8');
  fs.writeFileSync(
    styleRoot + '/index-no-reset.scss',
    content.replace(/@forward '\.\/presets\/reset';/g, ''),
    'utf-8',
  );
  fs.writeFileSync(
    styleRoot + '/index-basic.scss',
    content
      .replace(/@forward '\.\/presets\/reset';\n/g, '')
      .replace(/@forward '\.\/presets\/index';/g, "@forward './presets/font';"),
    'utf-8',
  );
  fs.writeFileSync(
    styleRoot + '/index-no-font.scss',
    content.replace(/@forward '\.\/presets\/index';/g, "@forward './presets/index-no-font';"),

    'utf-8',
  );
  fs.writeFileSync(
    styleRoot + '/index-basic-no-font.scss',
    content
      .replace(/@forward '\.\/presets\/reset';\n/g, '')
      .replace(/@forward '\.\/presets\/index';\n/g, ''),

    'utf-8',
  );
}

function buildGlobalVariables() {
  let content = banner.replace('{name}', 'global-variables');
  const components = fs
    .readdirSync(componentRoot, { withFileTypes: true })
    .filter(dir => dir.isDirectory());
  const directives = fs
    .readdirSync(directiveRoot, { withFileTypes: true })
    .filter(dir => dir.isDirectory());
  const methods = fs
    .readdirSync(methodsRoot, { withFileTypes: true })
    .filter(dir => dir.isDirectory());

  content += `@use './mixins/function';
@use './mixins/mixins';
@use './basic';
@use './element';
`;

  const functionQueries: string[] = [];
  const writeImport = (plugins: Array<fs.Dirent>, type = 'components', root = componentRoot) => {
    plugins.forEach(plugin => {
      const path = resolve(root, `${plugin.name}/src/style/variables.scss`);
      const kebabCaseName = kebabCase(plugin.name);

      if (fs.existsSync(path)) {
        content += `@use '../${type}/${plugin.name}/src/style/variables' as ${kebabCaseName};\n`;

        functionQueries.push(
          `function.flatten-variables(${kebabCaseName}.$values, '${kebabCaseName}')`,
        );
      }
    });
  };

  writeImport(components);
  writeImport(directives, 'directives', directiveRoot);
  writeImport(methods, 'methods', methodsRoot);

  content += `
$values: function.map-merge-multi(
  function.flatten-variables(basic.$values),
  function.flatten-variables(element.$values),
  ${functionQueries.join(',\n  ')}
);

@include mixins.create-root($values);
`;

  fs.writeFileSync(resolve(styleRoot, 'global-variables.scss'), content);
}

function buildDirectiveIndex() {
  let content = banner.replace('{name}', 'directives');
  const directives: Record<string, string[]> = {};

  directiveDependencies.forEach(directive => {
    if (!directives[directive.dirName]) {
      directives[directive.dirName] = [];
    }

    directives[directive.dirName].push(directive.name);
  });

  Object.entries(directives).forEach(([fileName, directive]) => {
    content += `export { ${directive.join(', ')}, default as ${camelCase(
      fileName.replace(/^v-/, ''),
    )} } from './${fileName}';\n`;
  });

  fs.writeFileSync(directiveRoot + '/index.ts', content, 'utf-8');
}
function buildMethodIndex() {
  let content = banner.replace('{name}', 'method');
  const methods: Record<string, string[]> = {};

  methodDependencies.forEach(method => {
    if (!methods[method.dirName]) {
      methods[method.dirName] = [];
    }

    methods[method.dirName].push(method.name);
  });

  content += `import type { App } from 'vue';\n`;

  // import statement
  Object.entries(methods).forEach(([fileName, methods]) => {
    content += `import { ${methods.join(', ')} } from './${fileName}';\n`;
  });

  content += '\n';

  // export variables
  methodDependencies.forEach(method => {
    content += `export const $${camelCase(method.name.replace(/^N/, ''))} = ${method.name};\n`;
  });

  // make install
  content += '\nexport default function (app: App) {\n';

  methodDependencies.forEach(method => {
    content += `  app.config.globalProperties.$${camelCase(method.name.replace(/^N/, ''))} = ${
      method.name
    };\n`;
    content += `  ${method.name}._context = app._context;\n\n`;
  });

  content += `  return app;\n}\n\n`;

  // declare type
  content += `declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {\n`;

  methodDependencies.forEach(method => {
    content += `    $${camelCase(method.name.replace(/^N/, ''))}: typeof ${method.name};\n`;
  });

  content += `  }
}`;

  fs.writeFileSync(methodsRoot + '/index.ts', content, 'utf-8');
}

function readDirAndGenerateExportedTypesOutputFile() {
  let content = banner.replace('{name}', 'components-type');

  typesDependencies.forEach(type => {
    type.types.length &&
      (content += `export type { ${type.types.join(', ')} } from './${type.dirName}';\n`);
  });

  fs.writeFileSync(componentRoot + '/globalTypes.ts', content);
}

function generateAllNeedExportedVariables() {
  let propsContent = banner.replace('{name}', 'components-props');
  let propsTypeContent = '';
  let emitsContent = banner.replace('{name}', 'components-emits');
  let emitsTypeContent = '';
  let slotsContent = banner.replace('{name}', 'components-slots');
  let slotsTypeContent = '';
  let exposesContent = banner.replace('{name}', 'components-exposes');
  let exposesTypeContent = '';
  const groupedProps: Map<string, Set<string>> = new Map();
  const groupedEmits: Map<string, Set<string>> = new Map();
  const groupedSlots: Map<string, Set<string>> = new Map();
  const groupedExposes: Map<string, Set<string>> = new Map();
  const groupedPropsType: Map<string, Set<string>> = new Map();
  const groupedEmitsType: Map<string, Set<string>> = new Map();
  const groupedSlotsType: Map<string, Set<string>> = new Map();
  const groupedExposesType: Map<string, Set<string>> = new Map();

  componentDependencies.forEach(comp => {
    if (comp.propsVariableFilePath) {
      groupedProps.set(
        comp.propsVariableFilePath,
        (groupedProps.get(comp.propsVariableFilePath) || new Set()).add(comp.propsVariableName),
      );
      groupedPropsType.set(
        comp.propsVariableFilePath,
        (groupedPropsType.get(comp.propsVariableFilePath) || new Set()).add(
          capitalizeCamelCase(comp.propsVariableName.replace(/^use/, '')),
        ),
      );
    }

    if (comp.emitsVariableFilePath) {
      groupedEmits.set(
        comp.emitsVariableFilePath,
        (groupedEmits.get(comp.emitsVariableFilePath) || new Set()).add(comp.emitsVariableName),
      );
      groupedEmitsType.set(
        comp.emitsVariableFilePath,
        (groupedEmitsType.get(comp.emitsVariableFilePath) || new Set()).add(
          capitalizeCamelCase(comp.emitsVariableName.replace(/^use/, '')),
        ),
      );
    }

    if (comp.slotsVariableFilePath) {
      groupedSlots.set(
        comp.slotsVariableFilePath,
        (groupedSlots.get(comp.slotsVariableFilePath) || new Set()).add(comp.slotsVariableName),
      );
      groupedSlotsType.set(
        comp.slotsVariableFilePath,
        (groupedSlotsType.get(comp.slotsVariableFilePath) || new Set()).add(
          capitalizeCamelCase(comp.slotsVariableName.replace(/^use/, '')),
        ),
      );
    }

    if (comp.exposesVariableFilePath) {
      groupedExposes.set(
        comp.exposesVariableFilePath,
        (groupedExposes.get(comp.exposesVariableFilePath) || new Set()).add(
          comp.exposesVariableName,
        ),
      );
      groupedExposesType.set(
        comp.exposesVariableFilePath,
        (groupedExposesType.get(comp.exposesVariableFilePath) || new Set()).add(
          capitalizeCamelCase(comp.exposesVariableName.replace(/^use/, '')),
        ),
      );
    }
  });

  for (const [key, value] of groupedProps.entries()) {
    propsContent += `export { ${Array.from(value.values()).join(', ')} } from '.${key
      .replace(componentRoot, '')
      .replace(path.extname(key), '')}';\n`;
  }

  for (const [key, value] of groupedEmits.entries()) {
    emitsContent += `export { ${Array.from(value.values()).join(', ')} } from '.${key
      .replace(componentRoot, '')
      .replace(path.extname(key), '')}';\n`;
  }

  for (const [key, value] of groupedSlots.entries()) {
    slotsContent += `export { ${Array.from(value.values()).join(', ')} } from '.${key
      .replace(componentRoot, '')
      .replace(path.extname(key), '')}';\n`;
  }

  for (const [key, value] of groupedExposes.entries()) {
    exposesContent += `export { ${Array.from(value.values()).join(', ')} } from '.${key
      .replace(componentRoot, '')
      .replace(path.extname(key), '')}';\n`;
  }

  for (const [key, value] of groupedPropsType.entries()) {
    propsTypeContent += `export type { ${Array.from(value.values()).join(', ')} } from '.${key
      .replace(componentRoot, '')
      .replace(path.extname(key), '')}';\n`;
  }

  for (const [key, value] of groupedEmitsType.entries()) {
    emitsTypeContent += `export type { ${Array.from(value.values()).join(', ')} } from '.${key
      .replace(componentRoot, '')
      .replace(path.extname(key), '')}';\n`;
  }

  for (const [key, value] of groupedSlotsType.entries()) {
    slotsTypeContent += `export type { ${Array.from(value.values()).join(', ')} } from '.${key
      .replace(componentRoot, '')
      .replace(path.extname(key), '')}';\n`;
  }

  for (const [key, value] of groupedExposesType.entries()) {
    exposesTypeContent += `export type { ${Array.from(value.values()).join(', ')} } from '.${key
      .replace(componentRoot, '')
      .replace(path.extname(key), '')}';\n`;
  }

  fs.writeFileSync(componentRoot + '/props.ts', propsContent + '\n' + propsTypeContent);
  fs.writeFileSync(componentRoot + '/emits.ts', emitsContent + '\n' + emitsTypeContent);
  fs.writeFileSync(componentRoot + '/slots.ts', slotsContent + '\n' + slotsTypeContent);
  fs.writeFileSync(componentRoot + '/exposes.ts', exposesContent + '\n' + exposesTypeContent);
}

function run() {
  generateDependenciesJson();
  buildComponentIndex();
  buildGlobalComponentsDeclaration();
  buildStyleIndex();
  buildGlobalVariables();
  buildDirectiveIndex();
  buildMethodIndex();
  readDirAndGenerateExportedTypesOutputFile();
  generateAllNeedExportedVariables();
}

run();
