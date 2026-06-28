import { Box, Drawer, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  AppDarkBackground,
  AppLightBackground,
  DarkModeBackground,
  LightModeBackground,
  LogoutRedColor,
  TextPrimary,
  WhiteColor,
} from './styleConstants';

const drawerWidth = 250;

export const ParentContainerStyled = styled(Box)({
  display: 'flex',
  flexGrow: 1,
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
  flexDirection: 'column',
});

export const TopNavItemsContainerStyled = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    display: 'none',
  },
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.mode === 'light' ? TextPrimary : WhiteColor,
  },
  '& .MuiChip-root.MuiChip-outlined': {
    color: theme.palette.mode === 'light' ? TextPrimary : WhiteColor,
    borderColor: theme.palette.mode === 'light' ? 'rgba(17, 17, 17, 0.35)' : 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'transparent',
  },
  '& .MuiChip-root .MuiChip-icon': {
    color: 'inherit',
  },
  '& .MuiSvgIcon-root.logout-icon': {
    color: theme.palette.mode === 'light' ? LogoutRedColor : WhiteColor,
  },
  alignItems: 'center',
}));

export const AppLayoutWrapper = styled(Box)({
  flex: 1,
  minHeight: 0,
  overflow: 'hidden',
  display: 'flex',
});

export const MainContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    '& .side-bar-tgl': {
      display: 'none',
    },
    '& .breadcrumb-control': {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
  [theme.breakpoints.up('sm')]: {
    '& .side-bar-tgl': {
      display: 'none',
    },
    '& .breadcrumb-control': {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  [theme.breakpoints.up('md')]: {
    '& .side-bar-tgl': {
      display: 'flex',
    },
    '& .breadcrumb-control': {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  [theme.breakpoints.up('lg')]: {
    '& .breadcrumb-control': {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  },
  height: '100%',
  overflow: 'auto',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.mode === 'light' ? LightModeBackground : DarkModeBackground,
  backgroundImage: theme.palette.mode === 'light' ? AppLightBackground : AppDarkBackground,
  backgroundSize: '40px 40px, 40px 40px',
  backgroundPosition: 'center top, center top',
  '& .breadcrumb-control': {
    display: 'flex',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  '& .main-outlet-container': {
    [theme.breakpoints.up('xs')]: {
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
      '& .dsk-only-inline-flex': {
        display: 'none',
      },
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(0.75),
      paddingRight: theme.spacing(0.75),
      '& .dsk-only-inline-flex': {
        display: 'inline-flex',
      },
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      '& .dsk-only-inline-flex': {
        display: 'inline-flex',
      },
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(1.25),
      paddingRight: theme.spacing(1.25),
    },
    [theme.breakpoints.up('xl')]: {
      paddingLeft: theme.spacing(1.25),
      paddingRight: theme.spacing(1.25),
    },
    flex: 1,
    overflow: 'auto',
    '& .MuiInputBase-input': {
      '&::-webkit-outer-spin-button,&::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
      },
    },
  },
  '& .center-h': {
    alignSelf: 'center',
  },
}));

export const LeftDrawerStyled = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  height: '100vh',
  '& .MuiDrawer-paper, & .MuiDrawer-paperAnchorLeft': {
    width: drawerWidth,
    minHeight: '100vh',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  overflow: 'auto',
}));

export const ModernDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    background: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
}));

export const DrawerToggleButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(2),
  left: theme.spacing(2),
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    background: theme.palette.primary.dark,
  },
}));

export const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));
