const esm = await Bun.file(new URL('../dist/index.js', import.meta.url)).text();
const cjs = await Bun.file(new URL('../dist/index.cjs', import.meta.url)).text();

if (
  !esm.includes('from "@aurora/horizon-web-vue"') ||
  !esm.includes('export { e as default }')
) {
  throw new Error('Compatibility ESM default export is missing.');
}
if (!esm.includes('export * from "@aurora/horizon-web-vue"')) {
  throw new Error('Compatibility ESM named exports are missing.');
}
if (!cjs.includes('require("@aurora/horizon-web-vue")')) {
  throw new Error('Compatibility CommonJS forwarding is missing.');
}

const style = await Bun.file(new URL('../style.css', import.meta.url)).text();
if (!style.includes('@aurora/horizon-web-vue/es/styles/index.css')) {
  throw new Error('Compatibility style entry does not forward the Vue renderer stylesheet.');
}

console.info('Horizon Web compatibility exports verified.');
