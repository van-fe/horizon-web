/**
 * 因为 IDE 对 monorepo 结构支持不好，所以有时引用某些包时，会错误地从 /src 下引入
 * // bad
 * import { IconEye } from '@aurora/icon/src';
 *
 * // good
 * import { IconEye } from '@aurora/icon';
 */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'import file path error',
    },
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const errorPath = ['@aurora/icon/src', '@aurora/colors/src', '@aurora/shared/src', '@aurora/locale-vue/src', '@aurora/locale/src'];

        if (errorPath.includes(node.source.value)) {
          context.report({
            node,
            message: 'import file path error',
          });
        }
      },
    };
  },
};
