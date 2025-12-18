import * as fs from 'fs-extra';
import * as cssTree from 'css-tree';
import path from 'path';
import { componentRoot, directiveRoot, methodsRoot } from '@aurora/utils/plugins';
import { kebabCase } from '@aurora/utils';

function action(baseRoot: string) {
  fs.readdirSync(baseRoot, { withFileTypes: true }).forEach(file => {
    if (file.isFile()) return;

    const componentName = kebabCase(file.name);

    const variableFilePath = path.resolve(baseRoot, file.name, 'src/style/variables.scss');

    if (!fs.existsSync(variableFilePath)) return;

    const fileData = fs.readFileSync(variableFilePath, 'utf-8');

    if (!fileData) return;

    const ast = cssTree.parse(fileData.replace(/\/\/\s*[\w- &]+\n\s+/g, '').replace(/\n\n/g, '\n'));

    const properties = new Map<string, string>();

    cssTree.walk(ast, node => {
      if (node.type === 'Declaration' && 'value' in node.value) {
        const key = node.property.trim().replace(`--n-${componentName}-`, '');
        let value = node.value.value.trim();

        if (/var\(/g.test(value)) {
          value = value.replace(/var\(--n-([\w-]+)\)/g, "#{function.css-variable('$1')}");
        }

        properties.set(key, `${value.includes(',') ? `#{${value}}` : value},\n`);
      }
    });

    let content = `@use '../../../../styles/mixins/function';

$values: (
`;

    properties.forEach((value, key) => {
      content += `  '${key}': ${value}`;
    });

    content += `);`;

    fs.writeFileSync(path.resolve(baseRoot, file.name, 'src/style/variables.scss'), content);
  });
}

action(componentRoot);
action(directiveRoot);
action(methodsRoot);
