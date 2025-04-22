/**
 * 禁止 emit 第一个参数以 `on` 开头
 * 
 * // bad
 * setup(props, {emit}) {
 *  emit('onInput', value)
 * }
 * 
 * // good
 * setup(props, {emit}) {
 *  emit('input', value)
 * }
 */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Unable to startsWith "on" in emit name',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee?.name === 'emit') {
          if (node.arguments?.[0]?.value?.startsWith?.('on')) {
            context.report({
              node,
              message: 'Unable to startsWith "on" in emit name',
            });
          }
        }
      },
    };
  },
};