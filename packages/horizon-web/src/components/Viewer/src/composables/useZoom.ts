export default function useZoom(viewportInfo: any, currentImgObj: any) {
  // 将图片缩放到一个恰当大小以适应容器
  const zoomToAdjust = () => {
    const viewerWidth = viewportInfo.width;
    const viewerHeight = viewportInfo.height;

    const aspectRatio = currentImgObj.naturalWidth / currentImgObj.naturalHeight;
    let width = viewerWidth;
    let height = viewerHeight;

    if (viewerHeight * aspectRatio > viewerWidth) {
      height = viewerWidth / aspectRatio;
    } else {
      width = viewerHeight * aspectRatio;
    }

    // width = Math.min(width * 0.9, currentImgObj.naturalWidth);
    // height = Math.min(height * 0.9, currentImgObj.naturalHeight);
    currentImgObj.width = width;
    currentImgObj.height = height;
    currentImgObj.ratio = width / currentImgObj.naturalWidth;
  };

  // 将图片缩放到指定比例大小
  const zoomToRatio = (ratio: number) => {
    let newRatio = ratio;
    // 最多放大到100倍（10000%）
    newRatio = Math.min(newRatio, 100);
    // 最多缩小到0.01（1%）
    newRatio = Math.max(newRatio, 0.01);
    const width = currentImgObj.naturalWidth * newRatio;
    const height = currentImgObj.naturalHeight * newRatio;
    // 放大或缩小时，以当前图片所处位置的中心点为基准，调整top和left
    currentImgObj.top = currentImgObj.top + (currentImgObj.height - height) / 2;
    currentImgObj.left = currentImgObj.left + (currentImgObj.width - width) / 2;
    currentImgObj.width = width;
    currentImgObj.height = height;
    currentImgObj.ratio = newRatio;
  };

  const zoomOut = () => {
    // 缩小时，相对当前大小减少 10%
    const newRatio = currentImgObj.ratio * 0.9;
    zoomToRatio(newRatio);
  };

  const zoomIn = () => {
    // 放大时，相对当前大小放大 10%
    const newRatio = currentImgObj.ratio * 1.1;
    zoomToRatio(newRatio);
  };

  return {
    zoomToAdjust,
    zoomToRatio,
    zoomOut,
    zoomIn,
  };
}
