module.exports = {
  plugins: ['@nio-fe/eslint-plugin-lego'],
  rules: {
    '@nio-fe/lego/emitname-startswith-on': 2,
    '@nio-fe/lego/no-spread-jsx-event-attr': 2,
    '@nio-fe/lego/no-template-functional-ref': 2,
    '@nio-fe/lego/no-lodash-imported-directly': 2,
    '@nio-fe/lego/no-vue-subpackage-imported': 2,
    '@nio-fe/lego/no-monorepo-src-path-imported': 2,
  },
};
