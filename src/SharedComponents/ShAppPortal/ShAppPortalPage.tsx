import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { ShFailureAlert } from '../ShAlerts/ShFailureAlert';
import { ShPaper } from '../../SharedStyles/ShSurfaces';
import { ShProductPageHeader } from '../ShProductPageHeader/ShProductPageHeader';
import { ShProductPageSurface } from '../ShProductPageSurface/ShProductPageSurface';
import { ShAppPortalTile } from './ShAppPortalTile';
import type { ShAppPortalPageProps } from './ShAppPortal.types';

export function ShAppPortalPage({
  apps,
  companyName,
  loading,
  error,
  onAppSelect,
  headerActions,
}: ShAppPortalPageProps) {
  if (loading) {
    return (
      <ShProductPageSurface>
        <Box display='flex' justifyContent='center' alignItems='center' minHeight={240}>
          <CircularProgress />
        </Box>
      </ShProductPageSurface>
    );
  }

  return (
    <ShProductPageSurface>
      <ShProductPageHeader>
        <Stack spacing={0.5} minWidth={0} flex={1}>
          <Typography component='h1' variant='h6' fontWeight={600} color='text.primary'>
            Apps
          </Typography>
          {companyName ? (
            <Typography variant='body2' color='text.secondary'>
              {companyName}
            </Typography>
          ) : null}
        </Stack>
        {headerActions}
      </ShProductPageHeader>

      {error ? <ShFailureAlert msg={String(error)} /> : null}

      {!error && !apps.length ? (
        <ShFailureAlert msg='No apps are enabled for this account.' />
      ) : null}

      {!error && apps.length ? (
        <ShPaper variant='outlined'>
          <Box p={2}>
            <Grid container spacing={1.5}>
              {apps.map(app => (
                <Grid item key={app.key} xs={6} sm={4} md={3} lg={2}>
                  <ShAppPortalTile app={app} variant='grid' onClick={() => onAppSelect(app)} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </ShPaper>
      ) : null}
    </ShProductPageSurface>
  );
}
