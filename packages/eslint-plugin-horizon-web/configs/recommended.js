module.exports = {
  plugins: ['@aurora/eslint-plugin-horizon-web'],
  rules: {
    '@aurora/horizon-web/emitname-startswith-on': 2,
    '@aurora/horizon-web/no-spread-jsx-event-attr': 2,
    '@aurora/horizon-web/no-template-functional-ref': 2,
    '@aurora/horizon-web/no-lodash-imported-directly': 2,
    '@aurora/horizon-web/no-vue-subpackage-imported': 2,
    '@aurora/horizon-web/no-monorepo-src-path-imported': 2,
  },
};
