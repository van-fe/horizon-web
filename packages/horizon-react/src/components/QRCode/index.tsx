import type { HTMLAttributes, MouseEvent, ReactElement, ReactNode } from 'react';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import type { QRCodeCommonProps } from '@aurora/core';
import {
  QR_CODE_DEFAULTS,
  QRCodeGenerationController,
  resolveQRCodeRenderOptions,
} from '@aurora/core';
import { generateQRCodeSvg } from '@aurora/horizon-core';
import { ComponentClassBlock } from '@aurora/theme';
import { useHorizonWebConfig } from '../../provider';
import { Button } from '../Button';
import { Spin } from '../Spin';

export interface QRCodeProps
  extends
    QRCodeCommonProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'color' | 'onError'> {
  /** 自定义失效遮罩。@en Custom expired overlay. */
  expiredContent?: ReactNode;
  /** 请求刷新失效二维码。@en Called when an expired QR code requests a refresh. */
  onRefresh?: (event: MouseEvent<HTMLElement>) => void;
  /** 二维码生成失败。@en Called when QR code generation fails. */
  onError?: (error: unknown) => void;
}

export const QRCode = forwardRef<HTMLDivElement, QRCodeProps>(function QRCode(
  {
    value,
    size = QR_CODE_DEFAULTS.size,
    level = QR_CODE_DEFAULTS.level,
    color = QR_CODE_DEFAULTS.color,
    background = QR_CODE_DEFAULTS.background,
    margin = QR_CODE_DEFAULTS.margin,
    icon,
    iconSize = QR_CODE_DEFAULTS.iconSize,
    expired = QR_CODE_DEFAULTS.expired,
    expiredText = QR_CODE_DEFAULTS.expiredText,
    ariaLabel = QR_CODE_DEFAULTS.ariaLabel,
    expiredContent,
    onRefresh,
    onError,
    className,
    style,
    ...nativeProps
  },
  ref,
): ReactElement {
  const config = useHorizonWebConfig();
  const classes = useMemo(
    () => new ComponentClassBlock('qrcode', config.namespace.toLowerCase()),
    [config.namespace],
  );
  const [svg, setSvg] = useState('');
  const [loading, setLoading] = useState(true);
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  useEffect(() => {
    const controller = new QRCodeGenerationController();
    setLoading(true);
    void controller
      .render(() =>
        generateQRCodeSvg(
          resolveQRCodeRenderOptions({ value, size, level, color, background, margin }),
        ),
      )
      .then(result => {
        if (result.status === 'rendered') {
          setSvg(result.svg);
          setLoading(false);
        } else if (result.status === 'rejected') {
          setLoading(false);
          onErrorRef.current?.(result.error);
        }
      });
    return () => controller.destroy();
  }, [background, color, level, margin, size, value]);

  const accessibleName = ariaLabel || config.qrCodeLabels.code;
  return (
    <div
      {...nativeProps}
      aria-busy={loading || undefined}
      className={[classes.block, className].filter(Boolean).join(' ')}
      ref={ref}
      style={{ ...style, height: size, width: size }}
    >
      <div
        aria-label={accessibleName}
        className={classes.e('canvas')}
        dangerouslySetInnerHTML={{ __html: svg }}
        role="img"
      />
      {icon && !expired ? (
        <img alt="" className={classes.e('icon')} height={iconSize} src={icon} width={iconSize} />
      ) : null}
      {loading ? (
        <div className={classes.e('mask')} role="status">
          <Spin size="small" />
        </div>
      ) : null}
      {expired ? (
        <div className={classes.e('mask')} role="status">
          {expiredContent ?? (
            <>
              <span>{expiredText || config.qrCodeLabels.expired}</span>
              <Button size="small" onClick={onRefresh}>
                {config.qrCodeLabels.refresh}
              </Button>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
});

export const HQRCode = QRCode;
export type { QRCodeLevel } from '@aurora/core';
