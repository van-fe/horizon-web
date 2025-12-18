import shell from 'shelljs';

export function cloneBrowserBuildFileToDist(tag: string) {
  shell.cd(__dirname);

  // horizon-web
  shell.cp('-R', '../packages/horizon-web/dist/horizon-web-browser.mjs', `../dist/horizon-web@${tag}.js`);
  shell.cp('-R', '../packages/horizon-web/dist/horizon-web-browser.umd.js', `../dist/horizon-web@${tag}.umd.js`);
  shell.cp('-R', '../packages/horizon-web/dist/horizon-web-browser.iife.js', `../dist/horizon-web-browser@${tag}.js`);
  shell.cp('-R', '../packages/horizon-web/dist/horizon-web-browser.mjs.map', `../dist/horizon-web@${tag}.js.map`);
  shell.cp('-R', '../packages/horizon-web/dist/horizon-web-browser.umd.js.map', `../dist/horizon-web@${tag}.umd.js.map`);
  shell.cp(
    '-R',
    '../packages/horizon-web/dist/horizon-web-browser.iife.js.map',
    `../dist/horizon-web-browser@${tag}.js.map`,
  );
  shell.cp('-R', '../packages/horizon-web/dist/style.css', `../dist/horizon-web-style@${tag}.css`);
  shell.cp('-R', '../packages/horizon-web/dist/style.css', `../dist/style@${tag}.css`);

  // shared
  shell.cp('-R', '../packages/shared/dist/shared.js', `../dist/shared@${tag}.js`);
  shell.cp('-R', '../packages/shared/dist/shared.umd.js', `../dist/shared@${tag}.umd.js`);
  shell.cp('-R', '../packages/shared/dist/shared.js.map', `../dist/shared@${tag}.js.map`);
  shell.cp('-R', '../packages/shared/dist/shared.umd.js.map', `../dist/shared@${tag}.umd.js.map`);

  // colors
  shell.cp('-R', '../packages/colors/dist/colors-browser.js', `../dist/colors@${tag}.js`);
  shell.cp('-R', '../packages/colors/dist/colors.umd.js', `../dist/colors@${tag}.umd.js`);
  shell.cp('-R', '../packages/colors/dist/colors-browser.js.map', `../dist/colors@${tag}.js.map`);
  shell.cp('-R', '../packages/colors/dist/colors.umd.js.map', `../dist/colors@${tag}.umd.js.map`);

  // theme config
  shell.cp(
    '-R',
    '../packages/doc/src/config/themes/default.json',
    `../dist/default-theme@${tag}.json`,
  );
}
