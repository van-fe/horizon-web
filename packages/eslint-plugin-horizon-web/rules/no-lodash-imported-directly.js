/**
 * 禁止直接引入lodash，必须从lodash子包引入
 * // bad
 * import { isNumber } from 'lodash'
 *
 * // good
 * import isNumber from 'lodash/isNumber'
 */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'lodash cannot be imported directly',
    },
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value === 'lodash') {
          context.report({
            node,
            message: 'lodash must be imported from Lodash subpackages',
          });
        }
      },
    };
  },
};
