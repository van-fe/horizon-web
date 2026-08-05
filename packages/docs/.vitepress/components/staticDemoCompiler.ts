import type { Component } from 'vue';

const RUNTIME_KEY = '__HORIZON_STATIC_DEMO_RUNTIME__';

interface RuntimeRegistry {
  dependencies: Record<string, unknown>;
  modules: Record<string, unknown>;
}

interface LocalSource {
  path: string;
  source: string;
}

export interface StaticCompileResult {
  component: Component;
  css: string;
}

const rawModules = import.meta.glob(
  [
    '../../demos/**/*.{ts,js,json}',
    '../../zh/**/demos/**/*.{ts,js,json}',
    '../../en/**/demos/**/*.{ts,js,json}',
  ],
  { query: '?raw', import: 'default' },
) as Record<string, () => Promise<string>>;

const localSources = new Map<string, LocalSource>();
let compilerPromise: Promise<typeof import('@vue/compiler-sfc')> | undefined;
let transformerPromise: Promise<typeof import('sucrase')> | undefined;

const bareDependencyLoaders: Record<string, () => Promise<object>> = {
  vue: () => import('vue'),
  '@aurora/horizon-web': () => import('@aurora/horizon-web'),
  '@aurora/icon': () => import('@aurora/icon'),
  '@aurora/utils': () => import('@aurora/utils'),
  '@aurora/colors': () => import('@aurora/colors'),
  '@aurora/locale-vue': () => import('@aurora/locale-vue'),
  '@aurora/upload-adapters': () => import('@aurora/upload-adapters'),
  '@aurora/upload-adapters/core': () => import('@aurora/upload-adapters/core'),
  '@aurora/upload-adapters/qiniu': () => import('@aurora/upload-adapters/qiniu'),
  '@aurora/upload-adapters/aliyun-oss': () => import('@aurora/upload-adapters/aliyun-oss'),
  '@aurora/upload-adapters/tencent-cos': () => import('@aurora/upload-adapters/tencent-cos'),
  '@faker-js/faker': () => import('@faker-js/faker'),
  dayjs: () => import('dayjs'),
  'decimal.js': () => import('decimal.js'),
  'fetch-jsonp': () => import('fetch-jsonp'),
  'lodash/get': () => import('lodash/get'),
  'lodash/groupBy': () => import('lodash/groupBy'),
  'lodash/throttle': () => import('lodash/throttle'),
  qs: () => import('qs'),
};

export async function compileStaticDemo(
  source: string,
  sourcePath: string,
  demoId: string,
): Promise<StaticCompileResult> {
  const compiler = await (compilerPromise ||= import('@vue/compiler-sfc'));
  const transformer = await (transformerPromise ||= import('sucrase'));
  const filename = sourcePath || `${demoId}.vue`;
  const scopeId = `data-v-${demoId.replace(/[^\w-]/g, '-')}`;
  const parsed = compiler.parse(source, { filename });
  assertCompilerErrors(parsed.errors);
  const { descriptor } = parsed;

  let scriptCode = 'const __sfc__ = {}';
  let bindings: Record<string, unknown> | undefined;
  if (descriptor.script || descriptor.scriptSetup) {
    const script = compiler.compileScript(descriptor, {
      id: scopeId,
      genDefaultAs: '__sfc__',
    });
    scriptCode = script.content;
    bindings = script.bindings;
  }

  let templateCode = '';
  if (descriptor.template) {
    const template = compiler.compileTemplate({
      id: scopeId,
      filename,
      source: descriptor.template.content,
      scoped: descriptor.styles.some(style => style.scoped),
      compilerOptions: { bindingMetadata: bindings },
    });
    assertCompilerErrors(template.errors);
    templateCode = template.code;
  }

  const hasScopedStyle = descriptor.styles.some(style => style.scoped);
  const moduleCode = [
    scriptCode,
    templateCode,
    templateCode ? '__sfc__.render = render' : '',
    hasScopedStyle ? `__sfc__.__scopeId = ${JSON.stringify(scopeId)}` : '',
    `__sfc__.__file = ${JSON.stringify(filename)}`,
    'export default __sfc__',
  ]
    .filter(Boolean)
    .join('\n');
  const commonJs = transformer.transform(moduleCode, {
    transforms: ['typescript', 'jsx', 'imports'],
    filePath: filename,
  }).code;

  const aliases = await prepareDependencies(moduleCode, filename, transformer);
  const module = await executeCommonJs(commonJs, `${demoId}:entry`, aliases);
  const css = await compileStyles(descriptor.styles, filename, scopeId, compiler);

  return { component: module as Component, css };
}

async function compileStyles(
  styles: Array<{ content: string; lang?: string; scoped?: boolean }>,
  filename: string,
  scopeId: string,
  compiler: typeof import('@vue/compiler-sfc'),
) {
  const output: string[] = [];
  for (const style of styles) {
    let source = style.content;
    if (style.lang === 'scss' || style.lang === 'sass') {
      const sass = await import('sass');
      const result = await sass.compileStringAsync(source, {
        syntax: style.lang === 'sass' ? 'indented' : 'scss',
        style: 'expanded',
      });
      source = result.css;
    } else if (style.lang && style.lang !== 'css') {
      throw new Error(`Static demo compiler does not support <style lang="${style.lang}">`);
    }

    const result = await compiler.compileStyleAsync({
      id: scopeId,
      filename,
      source,
      scoped: Boolean(style.scoped),
    });
    assertCompilerErrors(result.errors);
    output.push(result.code);
  }
  return output.join('\n');
}

async function prepareDependencies(
  code: string,
  fromPath: string,
  transformer: typeof import('sucrase'),
) {
  const aliases: Record<string, string> = {};
  for (const specifier of findImports(code)) {
    if (specifier.startsWith('.')) {
      const local = await loadLocalSource(fromPath, specifier);
      aliases[specifier] = local.path;
      await evaluateLocalModule(local, transformer);
    } else {
      await loadBareDependency(specifier);
    }
  }
  return aliases;
}

async function evaluateLocalModule(
  local: LocalSource,
  transformer: typeof import('sucrase'),
): Promise<unknown> {
  const runtime = getRuntime();
  if (Object.prototype.hasOwnProperty.call(runtime.modules, local.path)) {
    return runtime.modules[local.path];
  }
  if (local.path.endsWith('.json')) {
    const value = { __esModule: true, default: JSON.parse(local.source) };
    runtime.modules[local.path] = value;
    return value;
  }

  const aliases = await prepareDependencies(local.source, local.path, transformer);
  const code = transformer.transform(local.source, {
    transforms: ['typescript', 'jsx', 'imports'],
    filePath: local.path,
  }).code;
  return executeCommonJs(code, local.path, aliases);
}

async function loadLocalSource(fromPath: string, specifier: string): Promise<LocalSource> {
  const unresolved = normalizePath(`${dirname(fromPath)}/${specifier}`);
  const candidates = hasExtension(unresolved)
    ? [unresolved]
    : [
        `${unresolved}.ts`,
        `${unresolved}.js`,
        `${unresolved}.json`,
        `${unresolved}/index.ts`,
        `${unresolved}/index.js`,
      ];

  for (const path of candidates) {
    const cached = localSources.get(path);
    if (cached) return cached;
    const loader = rawModules[`../../${path}`];
    if (!loader) continue;
    const local = { path, source: await loader() };
    localSources.set(path, local);
    return local;
  }
  throw new Error(`Static demo compiler cannot resolve "${specifier}" from ${fromPath}`);
}

async function loadBareDependency(specifier: string) {
  const runtime = getRuntime();
  if (runtime.dependencies[specifier]) return runtime.dependencies[specifier];

  const loader = bareDependencyLoaders[specifier];
  if (!loader) {
    // Type-only imports are removed by Sucrase before execution.
    if (specifier.startsWith('@aurora/horizon-web/es/')) return undefined;
    throw new Error(`Static demo compiler does not support import "${specifier}"`);
  }

  const dependency = await loader();
  const module = { __esModule: true, ...dependency };
  runtime.dependencies[specifier] = module;
  return module;
}

export function isStaticDemoBareDependencySupported(specifier: string) {
  return Object.prototype.hasOwnProperty.call(bareDependencyLoaders, specifier);
}

async function executeCommonJs(code: string, cacheKey: string, aliases: Record<string, string>) {
  const wrapper = `
const runtime = globalThis[${JSON.stringify(RUNTIME_KEY)}];
const aliases = ${JSON.stringify(aliases)};
const require = id => {
  const resolved = aliases[id];
  const value = resolved ? runtime.modules[resolved] : runtime.dependencies[id];
  if (value === undefined) throw new Error('Static demo dependency not loaded: ' + id);
  return value;
};
const module = { exports: {} };
const exports = module.exports;
${code}
runtime.modules[${JSON.stringify(cacheKey)}] = module.exports;
export default module.exports.default ?? module.exports;
`;
  const url = URL.createObjectURL(new Blob([wrapper], { type: 'text/javascript' }));
  try {
    const evaluated = (await import(/* @vite-ignore */ url)) as { default: unknown };
    return evaluated.default;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function getRuntime(): RuntimeRegistry {
  const target = globalThis as typeof globalThis & {
    [RUNTIME_KEY]?: RuntimeRegistry;
  };
  return (target[RUNTIME_KEY] ||= {
    dependencies: Object.create(null) as Record<string, unknown>,
    modules: Object.create(null) as Record<string, unknown>,
  });
}

export function findImports(code: string) {
  return Array.from(code.matchAll(/(?:\bfrom\s+|\bimport\s*)['"]([^'"]+)['"]/g), match => match[1]);
}

export function normalizePath(path: string) {
  const output: string[] = [];
  for (const segment of path.replace(/\\/g, '/').split('/')) {
    if (!segment || segment === '.') continue;
    if (segment === '..') output.pop();
    else output.push(segment);
  }
  return output.join('/');
}

function dirname(path: string) {
  return normalizePath(path).split('/').slice(0, -1).join('/');
}

function hasExtension(path: string) {
  return /\.[^/]+$/.test(path);
}

function assertCompilerErrors(errors: Array<string | Error>) {
  if (!errors.length) return;
  throw new Error(
    errors.map(error => (typeof error === 'string' ? error : error.message)).join('\n'),
  );
}
