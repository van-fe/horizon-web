interface ViewportInfo {
  width: number;
  height: number;
}

interface ImageState {
  naturalWidth: number;
  naturalHeight: number;
  top: number;
  left: number;
  width: number;
  height: number;
  ratio: number;
}

interface ZoomPoint {
  x: number;
  y: number;
}

const MIN_RATIO = 0.01;
const MAX_RATIO = 100;
const LONG_IMAGE_ASPECT_RATIO = 2;

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export default function useZoom(viewportInfo: ViewportInfo, currentImgObj: ImageState) {
  const constrainPosition = () => {
    if (currentImgObj.width <= viewportInfo.width) {
      currentImgObj.left = (viewportInfo.width - currentImgObj.width) / 2;
    } else {
      currentImgObj.left = clamp(currentImgObj.left, viewportInfo.width - currentImgObj.width, 0);
    }

    if (currentImgObj.height <= viewportInfo.height) {
      currentImgObj.top = (viewportInfo.height - currentImgObj.height) / 2;
    } else {
      currentImgObj.top = clamp(currentImgObj.top, viewportInfo.height - currentImgObj.height, 0);
    }
  };

  // 让溢出的图片从起始边缘展示，其余方向保持居中。
  const moveToStart = () => {
    currentImgObj.left = 0;
    currentImgObj.top = 0;
    constrainPosition();
  };

  // 将图片缩放到一个恰当大小以适应容器。长图按原始宽度或容器宽度展示，避免文字被压缩到不可读。
  const zoomToAdjust = () => {
    if (
      !viewportInfo.width ||
      !viewportInfo.height ||
      !currentImgObj.naturalWidth ||
      !currentImgObj.naturalHeight
    ) {
      return;
    }

    const fitRatio = Math.min(
      viewportInfo.width / currentImgObj.naturalWidth,
      viewportInfo.height / currentImgObj.naturalHeight,
    );
    const isLongImage =
      currentImgObj.naturalHeight / currentImgObj.naturalWidth >= LONG_IMAGE_ASPECT_RATIO;
    const ratio = isLongImage
      ? Math.min(viewportInfo.width / currentImgObj.naturalWidth, 1)
      : fitRatio;

    currentImgObj.width = currentImgObj.naturalWidth * ratio;
    currentImgObj.height = currentImgObj.naturalHeight * ratio;
    currentImgObj.ratio = ratio;
  };

  // 将图片缩放到指定比例大小，并保持焦点下的图片内容位置不变。
  const zoomToRatio = (ratio: number, point?: ZoomPoint) => {
    if (!currentImgObj.naturalWidth || !currentImgObj.naturalHeight) {
      return;
    }

    const newRatio = clamp(ratio, MIN_RATIO, MAX_RATIO);
    const focusPoint = point || {
      x: viewportInfo.width / 2,
      y: viewportInfo.height / 2,
    };
    const imageX = currentImgObj.width
      ? (focusPoint.x - currentImgObj.left) / currentImgObj.width
      : 0.5;
    const imageY = currentImgObj.height
      ? (focusPoint.y - currentImgObj.top) / currentImgObj.height
      : 0.5;
    const width = currentImgObj.naturalWidth * newRatio;
    const height = currentImgObj.naturalHeight * newRatio;

    currentImgObj.left = focusPoint.x - imageX * width;
    currentImgObj.top = focusPoint.y - imageY * height;
    currentImgObj.width = width;
    currentImgObj.height = height;
    currentImgObj.ratio = newRatio;
    constrainPosition();
  };

  const panBy = (deltaX: number, deltaY: number) => {
    currentImgObj.left -= deltaX;
    currentImgObj.top -= deltaY;
    constrainPosition();
  };

  const zoomOut = () => {
    zoomToRatio(currentImgObj.ratio * 0.9);
  };

  const zoomIn = () => {
    zoomToRatio(currentImgObj.ratio * 1.1);
  };

  return {
    constrainPosition,
    moveToStart,
    panBy,
    zoomToAdjust,
    zoomToRatio,
    zoomOut,
    zoomIn,
  };
}
