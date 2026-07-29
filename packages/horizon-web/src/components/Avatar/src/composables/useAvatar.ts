import { colors } from '~/globalMethods';
// 默认随机头像的cdn链接
export const randomAvatar = [
  'https://cdn-app.example.com/user/2022/3/1/a72ad7d3-5c45-48dc-a4cc-9f90277e4c00.jpg',
  'https://cdn-app.example.com/user/2022/3/1/203cdf01-10d4-4a18-b12e-754686c5b175.jpg',
  'https://cdn-app.example.com/user/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg',
  'https://cdn-app.example.com/user/2022/3/1/a1475205-b165-4c0c-9545-6256ef712325.jpg',
];

// 拼接图片
export const useDrawImages = (imgs: string[]): Promise<string> => {
  const size = imgs.length;
  const base64List: string[] = [];
  return new Promise(resolve => {
    const width = 240,
      height = 240,
      imgWidthHeight = 117,
      imgAlone = 140;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    context!.fillStyle = colors.white;
    if (size === 1) {
      context!.fillStyle = colors.gray[2];
    }
    context!.fillRect(0, 0, canvas.width, canvas.height);
    imgs.forEach((src: string, index: number) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'Anonymous');
      img.src = src;
      img.onload = () => {
        switch (size) {
          case 1:
            const radius = 70,
              center_x = 120,
              center_y = 120;

            context!.arc(center_x, center_y, radius, 0, 2 * Math.PI);
            context!.clip();
            context!.drawImage(img, 50, 50, imgAlone, imgAlone);
            const base64Img1 = canvas.toDataURL();
            resolve(base64Img1);
            break;
          case 2:
            let imgX = 0;
            if (index === 1) {
              imgX = imgWidthHeight + 6;
            }
            context!.drawImage(img, imgX, 0, imgWidthHeight, height);
            const base64Img2 = canvas.toDataURL();
            base64List.push(base64Img2);
            if (base64List[imgs.length - 1]) {
              // 返回新的图片
              resolve(base64List[imgs.length - 1]);
            }
            break;
          case 3:
            if (index === 0) {
              context!.drawImage(img, 0, 0, imgWidthHeight, height);
            } else if (index === 1) {
              context!.drawImage(img, 1 * imgWidthHeight + 6, 0, imgWidthHeight, imgWidthHeight);
            } else if (index === 2) {
              context!.drawImage(
                img,
                1 * imgWidthHeight + 6,
                imgWidthHeight + 6,
                imgWidthHeight,
                imgWidthHeight,
              );
            }
            const base64Img3 = canvas.toDataURL();
            base64List.push(base64Img3);
            if (base64List[imgs.length - 1]) {
              // 返回新的图片
              resolve(base64List[imgs.length - 1]);
            }
            break;
        }
      };
    });
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
