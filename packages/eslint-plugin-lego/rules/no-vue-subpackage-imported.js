/**
 * 禁止从vue子包引入任何内容，只能从 vue 引入
 * // bad
 * import { inject } from '@vue/runtime-core';
 *
 * // good
 * import { inject } from 'vue';
 */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'cannot import any content from vue subpackages',
    },
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const vueSubPackages = ['@vue/runtime-core', '@vue/runtime-dom'];

        if (vueSubPackages.includes(node.source.value)) {
          context.report({
            node,
            message: 'cannot import any content from vue subpackages. Please import this content from vue directly',
          });
        }
      },
    };
  },
};
