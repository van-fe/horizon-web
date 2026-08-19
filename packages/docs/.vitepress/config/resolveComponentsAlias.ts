export default () => ({
  name: 'resolveComponentsAlias',
  transform(code: string, id: string) {
    if (id.includes('packages/horizon-vue/')) {
      if (/import\s*[^"]*"@aurora\/horizon-vue/gm.test(code)) {
        code = code.replace(
          /(import\s*[^"]*"@aurora\/horizon-vue)"/gm,
          '$1/src/"',
        );
        return code;
      }

      if (/(import\s*[^"']*["'])~/.test(code)) {
        code = code.replace(/(import\s*[^'"]*["'])~/g, '$1horizon-web-package/src');
        return code;
      }
    }

    return null;
  },
});
