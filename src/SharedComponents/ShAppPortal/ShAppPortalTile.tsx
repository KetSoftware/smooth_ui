import { Box, Typography } from '@mui/material';
import { ShPaper } from '../../SharedStyles/ShSurfaces';
import { ShBrandIconWrap } from './ShBrandIconWrap';
import type { ShAppPortalTileProps } from './ShAppPortal.types';

export function ShAppPortalTile({ app, variant = 'grid', onClick }: ShAppPortalTileProps) {
  const compact = variant === 'compact';
  const minHeight = compact ? 72 : 92;
  const iconSize = compact ? 'sm' : 'md';

  return (
    <ShPaper
      variant='outlined'
      cursor='pointer'
      outlineOnHover
      onClick={onClick}
      role='button'
      tabIndex={0}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick?.();
        }
      }}
    >
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        minHeight={minHeight}
        py={compact ? 1 : 1.5}
        px={compact ? 1 : 1.5}
        textAlign='center'
      >
        <ShBrandIconWrap iconSize={iconSize} accentKey={app.accentKey ?? app.key}>
          {app.icon}
        </ShBrandIconWrap>
        <Typography variant={compact ? 'caption' : 'body2'} fontWeight={500} mt={1}>
          {app.title}
        </Typography>
        {app.subtitle && !compact ? (
          <Typography variant='caption' color='text.secondary' mt={0.25}>
            {app.subtitle}
          </Typography>
        ) : null}
      </Box>
    </ShPaper>
  );
}
