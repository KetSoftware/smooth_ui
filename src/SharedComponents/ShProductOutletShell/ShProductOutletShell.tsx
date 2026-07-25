import { styled } from '@mui/material/styles';
import { MainContainer } from '../../SharedStyles/AppShell.styled';

/**
 * Product desk outlet chrome — breadcrumb + main padding, plus edge-to-edge lesson editor mode.
 */
export const ShProductOutletShell = styled(MainContainer)(({ theme }) => ({
  '& .breadcrumb-control': {
    paddingLeft: theme.spacing(0.75),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(1),
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(1.25),
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(1.5),
    },
    [theme.breakpoints.up('xl')]: {
      paddingLeft: theme.spacing(1.5),
    },
  },
  '& .main-outlet-container': {
    flex: 1,
    minHeight: 0,
    overflow: 'auto',
    paddingLeft: theme.spacing(0.75),
    paddingRight: theme.spacing(1.5),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(1.25),
      paddingRight: theme.spacing(2.5),
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.up('xl')]: {
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(3.5),
    },
  },
  '&.lms-edge-to-edge': {
    backgroundImage: 'none',
    backgroundColor: theme.palette.background.paper,
  },
  '&.lms-edge-to-edge .main-outlet-container': {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    overflow: 'hidden',
    backgroundImage: 'none',
    backgroundColor: theme.palette.background.paper,
  },
  '&.lms-edge-to-edge .breadcrumb-control': {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    paddingBottom: theme.spacing(0.5),
    backgroundColor: theme.palette.background.paper,
  },
}));
