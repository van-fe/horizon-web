module.exports = {
  configs: {
    recommended: require('../configs/recommended'),
  },
  rules: {
    // 'no-jsx-fragment': require('../rules/no-jsx-fragment'),
    'emitname-startswith-on': require('../rules/emitname-startswith-on'),
    'no-spread-jsx-event-attr': require('../rules/no-spread-jsx-event-attr'),
    'no-template-functional-ref': require('../rules/no-template-functional-ref'),
    'no-lodash-imported-directly': require('../rules/no-lodash-imported-directly'),
    'no-vue-subpackage-imported': require('../rules/no-vue-subpackage-imported'),
    'no-monorepo-src-path-imported': require('../rules/no-monorepo-src-path-imported'),
  },
};
