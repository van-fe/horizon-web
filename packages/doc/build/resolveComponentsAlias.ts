export default () => ({
  name: 'resolveComponentsAlias',
  transform(code: string, id: string) {
    if (id.includes('packages/lego/')) {
      if (/import\s*[^"]*"@nio-fe\/lego/gm.test(code)) {
        code = code.replace(/(import\s*[^"]*"@nio-fe\/lego)"/gm, '$1/src/"');
        return code;
      }

      if (/import\s*[^"]*"@nio-fe\/lego-pad/gm.test(code)) {
        code = code.replace(/(import\s*[^"]*"@nio-fe\/lego-pad)"/gm, '$1/src/"');
        return code;
      }

      if (/(import\s*[^"']*["'])~/.test(code)) {
        code = code.replace(/(import\s*[^'"]*["'])~/g, '$1lego-package/src');
        return code;
      }
    }

    if (id.includes('packages/lego-pad/')) {
      if (/import\s*[^"]*"@nio-fe\/lego/gm.test(code)) {
        code = code.replace(/(import\s*[^"]*"@nio-fe\/lego)"/gm, '$1/src/"');
        return code;
      }

      if (/import\s*[^"]*"@nio-fe\/lego-pad/gm.test(code)) {
        code = code.replace(/(import\s*[^"]*"@nio-fe\/lego-pad)"/gm, '$1/src/"');
        return code;
      }

      if (/(import\s*[^"']*["'])~/.test(code)) {
        code = code.replace(/(import\s*[^'"]*["'])~/g, '$1lego-pad-package/src');
        return code;
      }
    }

    return null;
  },
});
