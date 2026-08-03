export function getRemoteUrlFileHeader(url: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, max-age=0');
    xhr.addEventListener('readystatechange', () => {
      resolve(Number(xhr.getResponseHeader('Content-Length')));
      xhr.abort();
    });
    xhr.addEventListener('error', evt => {
      reject(evt);
    });
    xhr.send();
  });
}
