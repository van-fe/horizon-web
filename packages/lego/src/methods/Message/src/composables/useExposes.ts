import type { ExtractExposeTypes } from '@nio-fe/shared';
import { type MessageOptions } from './useProps';

export const useMessageExposes = {
  close: () => true,
  update: (options: Partial<Pick<MessageOptions, 'message' | 'type' | 'duration' | 'offset'>>) =>
    options,
  getOffset: () => 0,
};

export type MessageExposes = ExtractExposeTypes<typeof useMessageExposes>;
