export interface ApiGeneratorExportedComponent {
  dirName: string;
  name: string;
  desc: string;
  descLocales?: Record<string, string>;
  mainExportComponentName: string;
  entranceFilePath: string;
  componentDefinedFilePath: string;
  propsVariableFilePath: string;
  propsVariableName: string;
  emitsVariableFilePath: string;
  emitsVariableName: string;
  slotsVariableFilePath: string;
  slotsVariableName: string;
  exposesVariableFilePath: string;
  exposesVariableName: string;
}

export interface ApiGeneratorExportedDirectives {
  dirName: string;
  name: string;
  entranceFilePath: string;
  desc: string;
  directiveDefinedFilePath: string;
  optionsVariableFilePath: string;
  optionsVariableName: string;
}

export interface ApiGeneratorExportedPlugin {
  pluginName: string;
  isComponent: boolean;
  fileName: string;
  entrancePath: string;
  realComponentPath: string;
  propsEmitsPath: string;
}

export interface ApiGeneratorExportedPluginType {
  dirName: string;
  mainPluginName: string;
  types: string[];
  path: string;
  isComponent: boolean;
}

export enum ApiGeneratorAnalysedBaseType {
  Function = 'function',
  Object = 'object',
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
  Array = 'array',
  Unknown = 'unknown',
}

export interface ApiGeneratorAnalysedComponentDetail {
  name: string; // without prefix
  parentComponentName: string;
  desc: string;
  descLocales?: Record<string, string>;
  propsVariableName: string;
  props: ApiGeneratorAnalysedPropType[];
  emitsVariableName: string;
  emits: ApiGeneratorAnalysedEmitType[];
  slotsVariableName: string;
  slots: ApiGeneratorAnalysedSlotType[];
  exposesVariableName: string;
  exposes: ApiGeneratorAnalysedExposeType[];
}

export interface ApiGeneratorAnalysedPropType {
  name: string;
  desc: string;
  descLocales?: Record<string, string>;
  type: string;
  baseType: string;
  options: (string | number)[];
  required: boolean;
  default: string | number;
  deprecated?: string;
  version?: string;
}

export interface ApiGeneratorAnalysedEmitParamType {
  field: string;
  value: string;
  desc: string;
  descLocales?: Record<string, string>;
}

export interface ApiGeneratorAnalysedEmitType {
  name: string;
  params: ApiGeneratorAnalysedEmitParamType[];
  desc: string;
  descLocales?: Record<string, string>;
  deprecated?: string;
}

export interface ApiGeneratorAnalysedSlotParamType {
  field: string;
  value: string;
  desc: string;
  descLocales?: Record<string, string>;
}

export interface ApiGeneratorAnalysedSlotType {
  name: string;
  type: string;
  desc: string;
  descLocales?: Record<string, string>;
  deprecated?: string;
  params: ApiGeneratorAnalysedSlotParamType[];
}

export interface ApiGeneratorAnalysedExposeParamType {
  field: string;
  value: string;
  desc: string;
  descLocales?: Record<string, string>;
  nativeType: ApiGeneratorAnalysedBaseType;
  params: ApiGeneratorAnalysedExposeParamType[];
  returns: ApiGeneratorAnalysedExposeReturnType[];
  returnText: string;
  returnType: string;
}

export interface ApiGeneratorAnalysedExposeReturnType {
  field: string;
  value: string;
  desc: string;
  descLocales?: Record<string, string>;
  nativeType: ApiGeneratorAnalysedBaseType;
  params: ApiGeneratorAnalysedExposeParamType[];
}

export interface ApiGeneratorAnalysedExposeType {
  name: string;
  desc: string;
  descLocales?: Record<string, string>;
  type: string;
  nativeType: ApiGeneratorAnalysedBaseType;
  deprecated?: string;
  version?: string;
  params: ApiGeneratorAnalysedExposeParamType[];
  returnText: string;
  returns: ApiGeneratorAnalysedExposeReturnType[];
}

export interface ApiGeneratorAnalysedDirectiveDetail {
  name: string; // without prefix
  desc: string;
  descLocales?: Record<string, string>;
  optionsVariableName: string;
  options: ApiGeneratorAnalysedOptionType[];
}

export interface ApiGeneratorAnalysedOptionParamType extends ApiGeneratorAnalysedExposeParamType {
  return?: string;
}

export interface ApiGeneratorAnalysedOptionType {
  name: string;
  desc: string;
  descLocales?: Record<string, string>;
  type: string;
  baseType: string;
  options: (string | number)[];
  required: boolean;
  default: string | number;
  deprecated?: string;
  version?: string;
  params?: ApiGeneratorAnalysedOptionParamType[];
}

export interface ApiGeneratorExportedMethod {
  dirName: string;
  name: string;
  entranceFilePath: string;
  desc: string;
  methodDefinedFilePath: string;
  methodExportedName: string;
  optionsVariableFilePath: string;
  optionsVariableName: string;
  methodsVariableFilePath: string;
  methodsVariableName: string;
}

export interface ApiGeneratorAnalysedMethodType extends ApiGeneratorAnalysedExposeType {
  return?: string;
}

export interface ApiGeneratorAnalysedMethodDetail {
  name: string;
  desc: string;
  descLocales?: Record<string, string>;
  dirName: string;
  optionsVariableName: string;
  methodsVariableName: string;
  options: ApiGeneratorAnalysedOptionType[];
  methods: ApiGeneratorAnalysedMethodType[];
}
