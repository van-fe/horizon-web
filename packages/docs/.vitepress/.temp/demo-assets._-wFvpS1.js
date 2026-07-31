const demoImageUrls = [
  "/demo-assets/scene-aurora.svg",
  "/demo-assets/scene-summit.svg",
  "/demo-assets/scene-coast.svg",
  "/demo-assets/scene-city.svg",
  "/demo-assets/scene-forest.svg",
  "/demo-assets/scene-night.svg"
];
function getDemoImageUrl(index) {
  return demoImageUrls[index % demoImageUrls.length];
}
function createDemoViewerSources(count) {
  return Array.from({ length: count }, (_, index) => {
    const imageUrl = getDemoImageUrl(index);
    return {
      type: "image",
      thumbnail: imageUrl,
      cover: imageUrl,
      title: `Demo image ${index + 1}`
    };
  });
}
export {
  createDemoViewerSources as c,
  getDemoImageUrl as g
};
