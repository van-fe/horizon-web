import { describe, expect, it } from 'vitest';
import { Project, SyntaxKind } from 'ts-morph';
import { analyseDescriptionLocales, analyseStaticText } from './analyseMetadata';

function getMetadataProperties() {
  const project = new Project({ useInMemoryFileSystem: true });
  const source = project.createSourceFile(
    'component.ts',
    `const metadata = {
      desc: 'First line\\n' + 'Second line',
      descLocales: { en: 'English ' + 'description', zh: \`中文描述\` },
    }`,
  );
  return source.getDescendantsOfKind(SyntaxKind.PropertyAssignment);
}

describe('definition metadata analysis', () => {
  it('reads concatenated static descriptions', () => {
    const desc = getMetadataProperties().find(property => property.getName() === 'desc');

    expect(analyseStaticText(desc?.getInitializer())).toBe('First line\nSecond line');
  });

  it('reads localized descriptions from the definition object', () => {
    const locales = getMetadataProperties().find(property => property.getName() === 'descLocales');

    expect(
      analyseDescriptionLocales(locales?.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression)),
    ).toEqual({ en: 'English description', zh: '中文描述' });
  });
});
