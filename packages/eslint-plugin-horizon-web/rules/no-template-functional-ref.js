/**
 * 校验 template ref 符合 @vue/composition-api 使用规范
 * https://github.com/vuejs/composition-api#template-refs
 *
 * export default {
 *  setup() {
 *    const root = ref(null) // 必须是 null
 *
 *    onMounted(() => {
 *     // the DOM element will be assigned to the ref after initial render
 *      console.info(root.value) // <div/>
 *    })
 *
 *    return {
 *      root,
 *    }
 *  },
 *  render() {
 *    // 必须是 ref value
 *    return () => <div ref={root} />
 *  },
 * }
 */

const getVariableNode = (variables, name) => {
  const variable = variables.find(vara => vara?.name === name);
  const defs = variable?.defs ?? [];
  return defs.map(def => def?.node);
};

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Unable to use functional ref in JSX template',
    },
  },
  create(context) {
    const refs = new Set();
    return {
      'JSXAttribute:exit'(node) {
        const attrName = node.name?.name;
        const attrValue = node.value;
        if (attrName === 'ref') {
          // if (attrValue?.expression?.type === 'Literal' || attrValue?.type === 'Literal') {
          //   context.report({
          //     node,
          //     message: 'Unable to use ref object in JSX template',
          //   });
          // } else
          if (
            attrValue?.expression?.type === 'Identifier' &&
            attrValue?.type === 'JSXExpressionContainer'
          ) {
            const refNodes = getVariableNode(
              context.getScope()?.upper?.variables,
              attrValue?.expression?.name,
            );

            for (let refNode of refNodes) {
              const init = refNode.init;
              if (['CallExpression'].includes(init?.type)) {
                if (init.callee?.name === 'inject') {
                  return;
                }
                if (
                  init.callee?.name !== 'ref' ||
                  init.arguments.length !== 1 ||
                  init.arguments[0]?.type !== 'Literal' ||
                  init.arguments[0]?.value !== null
                ) {
                  context.report({
                    node: refNode,
                    message: 'JSX template ref`s initial value must be `null`',
                  });
                }
              } else {
                context.report({
                  node: refNode,
                  message: 'JSX template ref must be a `Ref`',
                });
              }
            }
            refs.add(attrValue?.name);
          } else if (
            ['FunctionExpression', 'ArrowFunctionExpression'].includes(attrValue?.expression?.type)
          ) {
            context.report({
              node,
              message: 'Unable to use function expression as template ref',
            });
          }
        }
      },
    };
  },
};
