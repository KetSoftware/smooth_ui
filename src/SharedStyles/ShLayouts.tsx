import { Box, Container, ContainerProps, Stack } from '@mui/material';
import { lighten, styled } from '@mui/material/styles';
import { TAlignItems, TDisplayType, TJustifyContent } from '../layoutTypes';
import { BorderColorDark, BorderColorLight, ShIconSecondary, TextPrimary, WhiteColor } from './styleConstants';

export const ListWrapper = styled(Box)(({ theme }) => ({
  overflow: 'auto',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '& .tabs-cntnr': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export const FooterWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  background: theme.palette.mode === 'light' ? '#ffffff' : '#1F1F1F',
  borderRadius: 0,
  boxShadow: 'none',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
  [theme.breakpoints.up('xs')]: {
    padding: `${theme.spacing(0.5)}`,
    '& .desktop-pagination': {
      display: 'none',
    },
    '& .mobile-pagination': {
      display: 'flex',
    },
  },
  [theme.breakpoints.up('sm')]: {
    padding: `${theme.spacing(1)} ${theme.spacing(0)}`,

    '& .desktop-pagination': {
      display: 'block',
    },
    '& .mobile-pagination': {
      display: 'none',
    },
  },
  [theme.breakpoints.up('md')]: {
    padding: `${theme.spacing(1)} ${theme.spacing(0)}`,

    '& .desktop-pagination': {
      display: 'block',
    },
    '& .mobile-pagination': {
      display: 'none',
    },
  },
  '& .mobile-pagination': {},
}));

export const ShIconWrapper = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  height: '35px',
  width: '35px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'background-color ease-in-out 0.3s',
  '&:hover': {
    backgroundColor: lighten(ShIconSecondary, 0.9),
  },
  '& svg': {
    height: '20px',
    width: '20px',
  },
}));

export const DummyBlock = styled(Box)(() => ({
  opacity: 0,
  pointerEvents: 'none',
}));
interface IShContainer extends ContainerProps {
  height?: string;
  margin?: number | string;
  display?: TDisplayType;
  justifyContent?: TJustifyContent;
  alignItems?: TAlignItems;
}

export const ShContainer = styled(Container, {
  shouldForwardProp: prop => prop !== 'justifyContent' && prop !== 'alignItems' && prop !== 'display',
})<IShContainer>(({ theme, margin = 0, height = 'unset', display = 'block', justifyContent = 'normal', alignItems = 'normal' }) => ({
  margin: margin,
  height: height,
  display: display,
  justifyContent: justifyContent,
  alignItems: alignItems,
}));

export const LeftPanelContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  maxWidth: '100%',
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.mode === 'light' ? BorderColorLight : BorderColorDark}`,
  boxSizing: 'border-box',
}));

export const EmployerSideNavRail = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    display: 'none',
  },
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  zIndex: 20,
  flexShrink: 0,
  contain: 'layout',
  width: '252px',
  overflow: 'hidden',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shorter,
  }),
  '&.is-mini-drawer': {
    width: '60px',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter,
    }),
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
    '&.is-mini-drawer': {
      transition: 'none',
    },
  },
}));

export const SideNavLinksStack = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  gap: theme.spacing(0.25),
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.mode === 'light' ? '#c1c1c1' : '#555',
    borderRadius: '3px',
    '&:hover': {
      background: theme.palette.mode === 'light' ? '#a8a8a8' : '#777',
    },
  },
  '& a, & button': {
    width: '100%',
    border: 'none',
    background: 'none',
    font: 'inherit',
    cursor: 'pointer',
    textAlign: 'left',
    fontWeight: 400,
    whiteSpace: 'nowrap',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    textTransform: 'none',
    textDecoration: 'none',
    padding: '0px 10px',
    color: theme.palette.text.primary,
    transition: 'background 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.25s cubic-bezier(.4,0,.2,1), transform 0.18s cubic-bezier(.4,0,.2,1)',
    overflow: 'hidden',
    '& .MuiSvgIcon-root, svg': {
      color: theme.palette.primary.main,
    },
    '&:hover': {
      backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 123, 255, 0.08)' : 'rgba(0, 123, 255, 0.12)',
      textDecoration: 'none',
    },
  },
  '& .active': {
    '& .MuiSvgIcon-root, svg': {
      color: theme.palette.primary.main,
    },
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 123, 255, 0.1)' : 'rgba(0, 123, 255, 0.1)',
    color: theme.palette.primary.main,
  },
  '& .disabled': {
    pointerEvents: 'none',
    '& .MuiSvgIcon-root, svg': {
      color: theme.palette.grey[500],
    },
  },
}));

export const MobileOnlyStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    display: 'flex',
  },
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.mode === 'light' ? TextPrimary : WhiteColor,
  },
}));

export const DesktopOnlyStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    display: 'none',
  },
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

export const ShStack = styled(Stack)(({ theme }) => ({
  background: theme.palette.background.default,
}));

/** Tabs + inline search field row (job pickers, filter bars). */
export const ShTabsSearchRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
}));

export const ShTabsSearchRowField = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 200,
  display: 'flex',
  alignItems: 'center',
  '& .MuiTextField-root': {
    margin: 0,
    width: '100%',
  },
}));

export const ShScrollList = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
  minHeight: 300,
  maxHeight: 400,
  overflow: 'auto',
  paddingTop: theme.spacing(1),
}));

export const ShBorderedScrollPanel = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  minHeight: 300,
  maxHeight: 400,
  overflow: 'auto',
}));

export const ShListSelectHeader = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  padding: theme.spacing(0.5, 1),
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: 'sticky',
  top: 0,
  backgroundColor: theme.palette.background.paper,
  zIndex: 1,
}));

export const ShListItemRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(0.5, 1),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const ShMetaLabel = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  '& .MuiSvgIcon-root': {
    fontSize: 16,
    color: theme.palette.text.secondary,
  },
}));

/** Responsive card grid (talent pool, dashboards). */
export const ShCardGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const ShInlinePaginationFooter = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  paddingTop: theme.spacing(1),
  borderTop: `1px solid ${theme.palette.divider}`,
}));
