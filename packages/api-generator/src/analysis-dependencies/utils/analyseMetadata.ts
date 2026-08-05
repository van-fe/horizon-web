import type { Expression, ObjectLiteralExpression } from 'ts-morph';
import { ts } from 'ts-morph';

/** Reads string-only metadata without executing component source code. */
export function analyseStaticText(expression: Expression | undefined): string {
  if (!expression) return '';

  if (
    expression.isKind(ts.SyntaxKind.StringLiteral) ||
    expression.isKind(ts.SyntaxKind.NoSubstitutionTemplateLiteral)
  ) {
    return expression.getLiteralText();
  }

  if (
    expression.isKind(ts.SyntaxKind.BinaryExpression) &&
    expression.getOperatorToken().isKind(ts.SyntaxKind.PlusToken)
  ) {
    return analyseStaticText(expression.getLeft()) + analyseStaticText(expression.getRight());
  }

  return '';
}

/** Reads locale-to-description mappings from a static object literal. */
export function analyseDescriptionLocales(
  expression: ObjectLiteralExpression | undefined,
): Record<string, string> | undefined {
  if (!expression) return undefined;

  const locales: Record<string, string> = {};
  expression.getProperties().forEach(property => {
    const assignment = property.asKind(ts.SyntaxKind.PropertyAssignment);
    const name = assignment?.getName().replace(/['"]/g, '');
    const value = analyseStaticText(assignment?.getInitializer());
    if (name && value) locales[name] = value;
  });

  return Object.keys(locales).length ? locales : undefined;
}
