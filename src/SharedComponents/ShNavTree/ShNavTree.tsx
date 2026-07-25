import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

/** Nested section children — guide SVG + indented links. (HRMS SideNav parity) */
export const ShNavTreeChildren = styled(Box)(({ theme }) => ({
  position: 'relative',
  // Parent toggle: pad-left 10 + icon 35/2 → guides under section icon.
  // Keep gutter modest so guides stay visible when the drawer is narrow (#807).
  marginLeft: 12,
  marginTop: theme.spacing(0.15),
  marginBottom: theme.spacing(0.5),
  paddingRight: theme.spacing(0.5),
  overflow: 'visible',
  minWidth: 0,
}));

/** Pixel-perfect tree stroke layer (viewBox size === element size). */
export const ShNavTreeSvg = styled('svg')({
  position: 'absolute',
  left: 0,
  top: 0,
  overflow: 'visible',
  pointerEvents: 'none',
  zIndex: 0,
  shapeRendering: 'geometricPrecision',
});

export const ShNavTreeItems = styled(Box)({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
  // Leave gutter for the absolute SVG guide (tighter for narrow drawers)
  paddingLeft: 20,
  minWidth: 0,
});

export const ShNavTreeRow = styled(Box)({
  minWidth: 0,
  '& > a, & > button': {
    width: '100%',
    paddingLeft: '4px !important',
  },
});
