import * as shell from 'shelljs';

shell.mkdir('-p', 'json');
shell.cd('../api-generator');
shell.exec('pnpm run build');
shell.mv('dist/tags.json', '../lego/json');
shell.mv('dist/attributes.json', '../lego/json');
shell.mv('dist/web-types.json', '../lego/json');
