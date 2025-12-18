import type { JSDoc } from 'ts-morph';
import type { Identifier } from '@ts-morph/common/lib/typescript';

declare module 'ts-morph' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ts {
    interface Node {
      jsDoc: NodeArray<JSDoc>;
    }

    interface JSDocTag {
      name?: Identifier;
    }
  }
}
