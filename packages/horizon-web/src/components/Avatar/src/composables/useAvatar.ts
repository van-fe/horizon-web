import { colors } from '~/globalMethods';
// 默认随机头像的cdn链接
export const randomAvatar = [
  'https://cdn-app.example.com/user/2022/3/1/a72ad7d3-5c45-48dc-a4cc-9f90277e4c00.jpg',
  'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
  'https://cdn-app.example.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg',
  'https://cdn-app.example.com/user/2022/3/1/a1475205-b165-4c0c-9545-6256ef712325.jpg',
];

const drawImageCover = (
  context: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) => {
  const imageRatio = img.naturalWidth / img.naturalHeight;
  const targetRatio = width / height;
  let sourceX = 0;
  let sourceY = 0;
  let sourceWidth = img.naturalWidth;
  let sourceHeight = img.naturalHeight;

  if (imageRatio > targetRatio) {
    sourceWidth = img.naturalHeight * targetRatio;
    sourceX = (img.naturalWidth - sourceWidth) / 2;
  } else {
    sourceHeight = img.naturalWidth / targetRatio;
    sourceY = (img.naturalHeight - sourceHeight) / 2;
  }

  context.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
};

const getGridLayout = (size: number) => {
  const canvasSize = 240;
  const gap = 6;

  if (size === 1) {
    return [{ x: 50, y: 50, width: 140, height: 140 }];
  }

  const columns = size <= 4 ? 2 : 3;
  const rows = Math.ceil(size / columns);
  const firstRowItems = size - columns * (rows - 1);
  const itemSize = (canvasSize - gap * (columns + 1)) / columns;
  const gridHeight = rows * itemSize + (rows - 1) * gap;
  const startY = (canvasSize - gridHeight) / 2;

  return Array.from({ length: size }, (_, index) => {
    const isFirstRow = index < firstRowItems;
    const row = isFirstRow ? 0 : Math.floor((index - firstRowItems) / columns) + 1;
    const indexInRow = isFirstRow ? index : (index - firstRowItems) % columns;
    const itemsInRow = isFirstRow ? firstRowItems : columns;
    const rowWidth = itemsInRow * itemSize + (itemsInRow - 1) * gap;
    const startX = (canvasSize - rowWidth) / 2;

    return {
      x: startX + indexInRow * (itemSize + gap),
      y: startY + row * (itemSize + gap),
      width: itemSize,
      height: itemSize,
    };
  });
};

// 拼接图片
export const useDrawImages = (imgs: string[]): Promise<string> => {
  const sources = imgs.slice(0, 9);
  const canvas = document.createElement('canvas');
  canvas.width = 240;
  canvas.height = 240;
  const context = canvas.getContext('2d')!;
  context.fillStyle = colors.gray[2];
  context.fillRect(0, 0, canvas.width, canvas.height);

  const imagePromises = sources.map(
    src =>
      new Promise<HTMLImageElement | null>(resolve => {
        const img = new Image();
        img.setAttribute('crossOrigin', 'Anonymous');
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = src;
      }),
  );

  return Promise.all(imagePromises).then(images => {
    const layout = getGridLayout(sources.length);
    images.forEach((img, index) => {
      if (!img) return;
      const item = layout[index];
      drawImageCover(context, img, item.x, item.y, item.width, item.height);
    });
    return canvas.toDataURL();
  });
};

export const useWorkText = (srcStr: string, sizeType: string | number) => {
  const regexp = new RegExp(/^[a-zA-Z]+$/);
  const str = srcStr.trim();

  if (!str) return [];

  const miniIndex = regexp.test(str) ? 2 : 1,
    index = regexp.test(str) ? 4 : 2;

  switch (sizeType) {
    case 'mini':
      return [str.substring(0, miniIndex)];
    case 'small':
      return [str.substring(0, index)];
    default:
      return [str.substring(0, index), str.substring(index, index * 2)];
  }
};
