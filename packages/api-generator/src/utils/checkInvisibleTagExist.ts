import type { ts } from 'ts-morph';
import analysisJsDocs from './analyseJsDocs';

export default function (node: ts.Node): boolean {
  return !!analysisJsDocs(node).tags?.invisible;
}
