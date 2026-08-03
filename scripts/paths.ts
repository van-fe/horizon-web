import { resolve } from 'path';

export const monorepoRoot = resolve(__dirname, '../');
export const packagesRoot = resolve(monorepoRoot, 'packages');
export const rootScriptsRoot = resolve(monorepoRoot, 'scripts');

/**
 * doc
 */
export const docRoot = resolve(packagesRoot, 'doc');
export const docDocs = resolve(docRoot, 'docs');
export const docPartHtml = resolve(docRoot, 'part-html');
export const docComponentsDocs = resolve(docDocs, 'components');
export const docDirectivesDocs = resolve(docDocs, 'directives');
export const docMethodsDocs = resolve(docDocs, 'methods');
export const docOthersDocs = resolve(docDocs, 'others');
export const docOutput = resolve(docRoot, 'dist');
export const docDescriptionOutput = resolve(docRoot, 'descriptions');
export const docConfig = resolve(docRoot, 'src/config');
export const docThemesConfig = resolve(docConfig, 'themes');
export const docDemoThemesConfig = resolve(docDocs, 'features/tokens/demos');

/**
 * api-generator
 */
export const apiGeneratorRoot = resolve(packagesRoot, 'api-generator');
export const apiGeneratorOutPut = resolve(apiGeneratorRoot, 'dist');

/**
 * horizon-web
 */
export const horizonwebProjectRoot = resolve(packagesRoot, 'horizon-web');
export const horizonwebSourceRoot = resolve(horizonwebProjectRoot, 'src');
export const componentRoot = resolve(horizonwebSourceRoot, 'components');
export const directiveRoot = resolve(horizonwebSourceRoot, 'directives');
export const providersRoot = resolve(horizonwebSourceRoot, 'provides');
export const methodsRoot = resolve(horizonwebSourceRoot, 'methods');
export const styleRoot = resolve(horizonwebSourceRoot, 'styles');
export const horizonwebStyleRoot = resolve(horizonwebSourceRoot, 'styles');
export const horizonwebBuildOutput = resolve(horizonwebProjectRoot, 'dist');
export const horizonwebLibOutput = resolve(horizonwebProjectRoot, 'lib');
export const horizonwebEsmOutput = resolve(horizonwebProjectRoot, 'es');

/**
 * colors
 */
export const colorsRoot = resolve(packagesRoot, 'colors');
export const colorsSourceRoot = resolve(colorsRoot, 'src');
