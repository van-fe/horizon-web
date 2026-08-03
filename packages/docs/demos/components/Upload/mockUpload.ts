import type { HUploadFileType, HUploadHttpRequestInstanceMethods } from '@aurora/horizon-web';
import { HUploadFileStatusEnum } from '@aurora/horizon-web';

interface MockRequest {
  abort: () => void;
}

export function createMockUploader(stepDuration = 90) {
  const activeRequests = new Map<string, MockRequest>();

  function request(file: HUploadFileType, methods: HUploadHttpRequestInstanceMethods) {
    let progress = 0;
    let timer: number | undefined;

    const mockRequest: MockRequest = {
      abort() {
        if (timer !== undefined) window.clearInterval(timer);
        activeRequests.delete(file.uuid);
      },
    };

    activeRequests.get(file.uuid)?.abort();
    activeRequests.set(file.uuid, mockRequest);
    methods.addUploadingQueue(file, mockRequest);
    methods.setStatus(file, HUploadFileStatusEnum.Uploading, {
      progress,
      response: undefined,
    });

    timer = window.setInterval(() => {
      progress = Math.min(progress + 20, 100);
      methods.setStatus(file, HUploadFileStatusEnum.Uploading, {
        progress,
        response: undefined,
      });

      if (progress === 100) {
        mockRequest.abort();
        void methods.onUploadSuccess(file, JSON.stringify({ ok: true, name: file.name }));
      }
    }, stepDuration);
  }

  function dispose() {
    for (const request of activeRequests.values()) request.abort();
    activeRequests.clear();
  }

  return { request, dispose };
}

export function resolveLocalUpload(_response: unknown, file: HUploadFileType) {
  return file.blobUrl || file.url || '/demo-assets/scene-coast.svg';
}
