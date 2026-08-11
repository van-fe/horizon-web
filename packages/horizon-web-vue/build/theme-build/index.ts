import cssVariablesMerge from './css-variables-deal';
import writeDeclaration from './write-declaration';
import writeTypes from './write-types';
import writeColors from './write-colors';
import writeBasicElementTokens from './write-basic-element-tokens';
import writeJsonFileToDoc from './write-json-file-to-doc';

const variables = cssVariablesMerge();

writeDeclaration(variables.sumCssVariables, variables.pluginsCssVariables);
writeTypes(variables.sumCssVariables);
writeColors(
  (variables.basicElementTokensTree['basic'] as Record<string, Record<string, string>>)['color'],
);
writeBasicElementTokens(variables.basicElementTokensTree);
writeJsonFileToDoc(variables.basicElementTokensTree, variables.pluginsCssVariables);
