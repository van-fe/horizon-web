import { resolve } from 'path';

export const monorepoRoot = resolve(__dirname, '../');
export const packagesRoot = resolve(monorepoRoot, 'packages');
export const rootScriptsRoot = resolve(monorepoRoot, 'scripts');

/**
 * docs
 */
export const docsRoot = resolve(packagesRoot, 'docs');
export const docDescriptionOutput = resolve(packagesRoot, 'api-generator/descriptions');
export const docThemesConfig = resolve(docsRoot, 'zh/features/theme');
export const docDemoThemesConfig = resolve(docsRoot, 'zh/features/tokens/demos');

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
