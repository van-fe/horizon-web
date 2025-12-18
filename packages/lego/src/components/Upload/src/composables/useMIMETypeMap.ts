import colors from '~/styles/colors';
import {
  IconPdfFilledLight,
  IconExcelFilledLight,
  IconZipFilledLight,
  IconWordFilledLight,
  IconVideoFilledLight,
  IconUnknownFilledLight,
  IconPptFilledLight,
  IconPictureFilledLight,
  IconMp3FilledLight,
} from '@nio-fe/icon';

import type { NMIMEIconType } from './useProps';

const PIC_TYPE = [
  'image/bmp',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/tiff',
  'image/webp',
  'image/gif',
  'image/vnd.microsoft.icon',
];

const EXCEL_TYPE = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

const VIDEO_TYPE = [
  'video/quicktime',
  'video/x-msvideo',
  'video/mpeg',
  'video/ogg',
  'video/webm',
  'video/3gpp',
  'video/3gpp2',
  'video/mp4',
  'video/vnd.sealedmedia.softseal.mov',
];

const WORD_TYPE = [
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const PPT_TYPE = [
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
];

const AUDIO_TYPE = [
  'audio/mpeg',
  'audio/midi',
  'audio/x-midi',
  'audio/ogg',
  'audio/wav',
  'audio/webm',
  'audio/3gpp',
  'audio/3gpp2',
  'audio/aac',
];

const PDF_TYPE = ['application/pdf'];

const ZIP_TYPE = ['application/zip', 'application/x-7z-compressed'];

const DEFAULT_MIME_ICON_MAP = {
  pdf: {
    name: IconPdfFilledLight,
    color: colors.red[5],
  },
  excel: {
    name: IconExcelFilledLight,
    color: colors.green[5],
  },
  zip: {
    name: IconZipFilledLight,
    color: colors.blue[5],
  },
  word: {
    name: IconWordFilledLight,
    color: colors['lake-blue'][5],
  },
  video: {
    name: IconVideoFilledLight,
    color: colors.brand[5],
  },
  unknown: {
    name: IconUnknownFilledLight,
    color: colors.gray[5],
  },
  ppt: {
    name: IconPptFilledLight,
    color: colors.orange[5],
  },
  pic: {
    name: IconPictureFilledLight,
    color: colors.yellow[5],
  },
  audio: {
    name: IconMp3FilledLight,
    color: colors.lime[5],
  },
};

export const getTypeByFileType = (fileType = '') => {
  const lowType = fileType.toLowerCase();
  if (PIC_TYPE.includes(lowType)) {
    return 'pic';
  } else if (EXCEL_TYPE.includes(lowType)) {
    return 'excel';
  } else if (VIDEO_TYPE.includes(lowType)) {
    return 'video';
  } else if (WORD_TYPE.includes(lowType)) {
    return 'word';
  } else if (PPT_TYPE.includes(lowType)) {
    return 'ppt';
  } else if (AUDIO_TYPE.includes(lowType)) {
    return 'audio';
  } else if (PDF_TYPE.includes(lowType)) {
    return 'pdf';
  } else if (ZIP_TYPE.includes(lowType)) {
    return 'zip';
  }
  return 'unknown';
};

export const useMIMETypeMap = (mimeIcons?: NMIMEIconType) => {
  const getMimeType = (fileType: string, specialFileType?: string) => {
    const resType = specialFileType ?? getTypeByFileType(fileType);
    return resType;
  };

  const getIcon = (fileType: string, fileName: string, specialFileType?: string) => {
    const resType = getMimeType(fileType, specialFileType);
    const cusIconInfo = mimeIcons?.[resType]?.(fileType, fileName);
    if (cusIconInfo) return cusIconInfo;
    return DEFAULT_MIME_ICON_MAP[resType as keyof typeof DEFAULT_MIME_ICON_MAP];
  };

  return {
    getIcon,
    getMimeType,
  };
};
