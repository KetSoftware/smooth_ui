import AppsIcon from '@mui/icons-material/Apps';
import { Box, Divider, Grid, IconButton, Popover, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { ShMuiLink } from '../../SharedStyles/ShNavigation';
import { StyledMenuItem } from '../../SharedStyles/ShNavigation';
import { ShPaperTooltip } from '../ShPaperTooltip';
import { ShAppPortalTile } from './ShAppPortalTile';
import type { ShAppSwitcherProps } from './ShAppPortal.types';

export function ShAppSwitcher({ apps, currentAppKey, portalPageHref, onAppSelect, disabled }: ShAppSwitcherProps) {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  if (disabled || !apps.length) return null;

  return (
    <>
      <ShPaperTooltip title='Apps'>
        <IconButton ref={anchorRef} size='large' aria-label='Open app switcher' onClick={() => setOpen(true)}>
          <AppsIcon />
        </IconButton>
      </ShPaperTooltip>
      <Popover
        open={open}
        anchorEl={anchorRef.current}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Box p={2} minWidth={280} maxWidth={360}>
          <Typography variant='subtitle2' mb={1}>
            Switch app
          </Typography>
          <Grid container spacing={1}>
            {apps.map(app => (
              <Grid item key={app.key} xs={4}>
                <ShAppPortalTile
                  app={{ ...app, isCurrent: app.key === currentAppKey }}
                  variant='compact'
                  onClick={() => {
                    setOpen(false);
                    onAppSelect(app);
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Divider />
          <StyledMenuItem>
            <ShMuiLink href={portalPageHref} noUnderline noBlueHighlight width='100%'>
              All apps
            </ShMuiLink>
          </StyledMenuItem>
        </Box>
      </Popover>
    </>
  );
}
