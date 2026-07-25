import { Box, type BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Opaque media/gradient cover tile (course cards, resume cards).
 * Uses a real <img> when imageUrl is set so LCP can prioritize / lazy-load covers.
 * Width defaults to 100% via the component prop so fixed-width thumbnails can override.
 */
export const ShMediaCoverRoot = styled(Box, {
  shouldForwardProp: prop => prop !== 'shade' && prop !== 'heightPx',
})<{ shade?: string; heightPx?: number }>(({ theme, shade, heightPx }) => {
  const base = shade || theme.palette.primary.light;
  return {
    position: 'relative',
    height: heightPx || 160,
    overflow: 'hidden',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: base,
    backgroundImage: `linear-gradient(to top right, #171717, ${base})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
});

const CoverImage = styled('img')({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
});

const CoverShade = styled(Box, {
  shouldForwardProp: prop => prop !== 'shade',
})<{ shade?: string }>(({ theme, shade }) => {
  const base = shade || theme.palette.primary.light;
  return {
    position: 'absolute',
    inset: 0,
    backgroundImage: `linear-gradient(to top right, rgba(0,0,0,0.45), ${base})`,
    pointerEvents: 'none',
  };
});

const CoverContent = styled(Box)({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
});

export type ShMediaCoverProps = Omit<BoxProps, 'height'> & {
  children?: ReactNode;
  shade?: string;
  imageUrl?: string | null;
  /** Accessible name for uploaded cover images (empty = decorative). */
  imageAlt?: string;
  heightPx?: number;
  /** First-viewport covers: eager + fetchpriority=high for LCP. */
  priority?: boolean;
};

export function ShMediaCover({
  children,
  shade,
  imageUrl,
  imageAlt = '',
  heightPx,
  priority = false,
  width = '100%',
  ...rest
}: ShMediaCoverProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    if (priority) el.setAttribute('fetchpriority', 'high');
    else el.removeAttribute('fetchpriority');
  }, [priority, imageUrl]);

  return (
    <ShMediaCoverRoot shade={shade} heightPx={heightPx} width={width} {...rest}>
      {imageUrl ? (
        <CoverImage
          ref={imgRef}
          src={imageUrl}
          alt={imageAlt}
          loading={priority ? 'eager' : 'lazy'}
          decoding='async'
        />
      ) : null}
      {imageUrl ? <CoverShade shade={shade} aria-hidden /> : null}
      <CoverContent>{children}</CoverContent>
    </ShMediaCoverRoot>
  );
}
