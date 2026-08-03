export function getVideoFirstFrame(
  videoUrl: string,
  callback: (res: { base64: string; blobUrl: string }) => void,
) {
  const video = document.createElement('video');
  video.crossOrigin = 'anonymous';

  video.addEventListener('loadeddata', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      canvas.toBlob(blob => {
        if (blob) {
          callback({
            base64: canvas.toDataURL('image/jpeg'),
            blobUrl: URL.createObjectURL(blob),
          });
        }
      });
    }
  });

  video.src = videoUrl;
}

export function getVideoDuration(videoUrl: string, callback: (duration: number) => void) {
  const video = document.createElement('video');
  video.crossOrigin = 'anonymous';

  video.addEventListener('loadeddata', () => {
    callback(video.duration);
  });

  video.src = videoUrl;
}
