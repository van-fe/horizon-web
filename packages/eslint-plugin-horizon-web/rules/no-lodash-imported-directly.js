/**
 * 禁止引入 CommonJS 版本的 lodash，请使用 lodash-es
 * // bad
 * import { isNumber } from 'lodash'
 *
 * // good
 * import { isNumber } from 'lodash-es'
 */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'prefer lodash-es over lodash',
    },
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        if (/^lodash(?:\/|$)/.test(node.source.value)) {
          context.report({
            node,
            message: 'lodash must be replaced with lodash-es',
          });
        }
      },
    };
  },
};
