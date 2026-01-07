/**
 * 禁止在 JSX 中使用 展开运算符传递事件
 * // bad
 * <div
 *    {
 *      ...{
 *        onClick: () => {}
 *      }
 *    }
 * ></div>
 * 
 * // good
 * <div
 *    onClick={() => {}}
 * ></div>
 */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Unable to use spread event in JSX attributes',
    },
  },
  create(context) {
    return {
      JSXSpreadAttribute(node) {
        if (node.argument?.type === 'ObjectExpression') {
          const properties = node.argument?.properties;
          if (properties?.length > 0) {
            for (let property of properties) {
              if (property?.key?.type === 'Identifier' && property?.key?.name?.startsWith('on')) {
                context.report({
                  node,
                  message: 'Unable to use spread event in JSX attributes',
                });
              }
            }
          }
        }
      },
    };
  },
};