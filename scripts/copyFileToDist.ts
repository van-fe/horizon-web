import shell from 'shelljs';

export function cloneBrowserBuildFileToDist(tag: string) {
  shell.cd(__dirname);

  // lego
  shell.cp('-R', '../packages/lego/dist/lego-browser.mjs', `../dist/lego@${tag}.js`);
  shell.cp('-R', '../packages/lego/dist/lego-browser.umd.js', `../dist/lego@${tag}.umd.js`);
  shell.cp('-R', '../packages/lego/dist/lego-browser.iife.js', `../dist/lego-browser@${tag}.js`);
  shell.cp('-R', '../packages/lego/dist/lego-browser.mjs.map', `../dist/lego@${tag}.js.map`);
  shell.cp('-R', '../packages/lego/dist/lego-browser.umd.js.map', `../dist/lego@${tag}.umd.js.map`);
  shell.cp(
    '-R',
    '../packages/lego/dist/lego-browser.iife.js.map',
    `../dist/lego-browser@${tag}.js.map`,
  );
  shell.cp('-R', '../packages/lego/dist/style.css', `../dist/lego-style@${tag}.css`);
  shell.cp('-R', '../packages/lego/dist/style.css', `../dist/style@${tag}.css`);

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
