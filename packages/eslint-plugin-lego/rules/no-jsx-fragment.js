/**
 * 禁止使用 JSX 空标签
 * // bad
 * <>
 *  <div></div>
 *  <span></span>
 * </>
 * 
 * // good
 * <div>
 *  <div></div>
 *  <span></span>
 * </div>
 */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'no JSX Fragment in jsx',
    },
  },
  create(context) {
    return {
      JSXOpeningFragment(node) {
        context.report({
          node,
          message: 'Unable to use JSX Fragment',
        });
      },
      JSXClosingFragment(node) {
        context.report({
          node,
          message: 'Unable to use JSX Fragment',
        });
      },
    };
  },
};