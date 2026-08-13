export type QRCodeGenerationResult =
  | { status: 'rendered'; svg: string }
  | { status: 'stale' }
  | { status: 'rejected'; error: unknown };

/**
 * 协调二维码异步生成，保证过期结果与卸载后的结果不会写回 renderer。
 * @en Coordinates asynchronous QR generation so stale or post-disposal results never reach a renderer.
 */
export class QRCodeGenerationController {
  #generation = 0;
  #destroyed = false;

  async render(generate: () => string | PromiseLike<string>): Promise<QRCodeGenerationResult> {
    if (this.#destroyed) return { status: 'stale' };
    const generation = ++this.#generation;
    try {
      const svg = await generate();
      if (this.#destroyed || generation !== this.#generation) return { status: 'stale' };
      return { status: 'rendered', svg };
    } catch (error) {
      if (this.#destroyed || generation !== this.#generation) return { status: 'stale' };
      return { status: 'rejected', error };
    }
  }

  invalidate(): void {
    this.#generation += 1;
  }

  destroy(): void {
    this.#destroyed = true;
    this.invalidate();
  }
}
