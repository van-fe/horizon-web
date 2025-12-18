import { resolve } from 'path';

export const monorepoRoot = resolve(__dirname, '../../..');
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
 * lego
 */
export const legoProjectRoot = resolve(packagesRoot, 'lego');
export const legoSourceRoot = resolve(legoProjectRoot, 'src');
export const componentRoot = resolve(legoSourceRoot, 'components');
export const directiveRoot = resolve(legoSourceRoot, 'directives');
export const providersRoot = resolve(legoSourceRoot, 'provides');
export const methodsRoot = resolve(legoSourceRoot, 'methods');
export const styleRoot = resolve(legoSourceRoot, 'styles');
export const legoStyleRoot = resolve(legoSourceRoot, 'styles');
export const legoBuildOutput = resolve(legoProjectRoot, 'dist');
export const legoLibOutput = resolve(legoProjectRoot, 'lib');
export const legoEsmOutput = resolve(legoProjectRoot, 'es');

/**
 * lego-table
 */
export const legoTableProjectRoot = resolve(packagesRoot, 'lego-table');
export const legoTableComponentRoot = resolve(legoTableProjectRoot, 'components');
export const legoTableStyleRoot = resolve(legoTableProjectRoot, 'styles');
export const legoTableBuildOutput = resolve(legoTableProjectRoot, 'dist');
export const legoTableLibOutput = resolve(legoTableProjectRoot, 'lib');

/**
 * lego-table-v2
 */
export const legoTableV2ProjectRoot = resolve(packagesRoot, 'lego-table-v2');
export const legoTableV2ComponentRoot = resolve(legoTableV2ProjectRoot, 'components');
export const legoTableV2StyleRoot = resolve(legoTableV2ProjectRoot, 'styles');
export const legoTableV2BuildOutput = resolve(legoTableV2ProjectRoot, 'dist');
export const legoTableV2LibOutput = resolve(legoTableV2ProjectRoot, 'lib');

/**
 * lego-sensor-tracker
 */
export const legoSensorTrackerRoot = resolve(packagesRoot, 'lego-sensor-tracker');
export const legoSensorTrackerSourceRoot = resolve(legoSensorTrackerRoot, 'src');

/**
 * colors
 */
export const colorsRoot = resolve(packagesRoot, 'colors');
export const colorsSourceRoot = resolve(colorsRoot, 'src');
