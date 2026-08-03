import { describe, expect, it } from 'vitest';
import { getEditorIndentChanges } from './editorIndent';

describe('getEditorIndentChanges', () => {
  it('indents every selected line once', () => {
    const source = '<template>\n<div>\ntext\n</div>\n</template>';

    expect(getEditorIndentChanges(source, [{ from: 11, to: 27 }], false)).toEqual([
      { from: 11, insert: '  ' },
      { from: 17, insert: '  ' },
      { from: 22, insert: '  ' },
    ]);
  });

  it('does not indent the next line when a selection ends at its start', () => {
    expect(getEditorIndentChanges('one\ntwo\nthree', [{ from: 0, to: 8 }], false)).toEqual([
      { from: 0, insert: '  ' },
      { from: 4, insert: '  ' },
    ]);
  });

  it('outdents leading spaces and tabs', () => {
    const source = '  one\n\ttwo\nthree';

    expect(getEditorIndentChanges(source, [{ from: 0, to: source.length }], true)).toEqual([
      { from: 0, to: 2, insert: '' },
      { from: 6, to: 7, insert: '' },
    ]);
  });
});
