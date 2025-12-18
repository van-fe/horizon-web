export default () => ({
  name: 'resolveComponentsAlias',
  transform(code: string, id: string) {
    if (id.includes('packages/horizon-web/')) {
      if (/import\s*[^"]*"@aurora\/horizon-web/gm.test(code)) {
        code = code.replace(/(import\s*[^"]*"@aurora\/horizon-web)"/gm, '$1/src/"');
        return code;
      }

      if (/(import\s*[^"']*["'])~/.test(code)) {
        code = code.replace(/(import\s*[^'"]*["'])~/g, '$1lego-package/src');
        return code;
      }
    }

    return null;
  },
});
