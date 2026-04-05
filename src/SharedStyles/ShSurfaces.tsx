import { AppBar, Paper, PaperProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Overflow } from '../layoutTypes';
import { BorderColorDark, BorderColorLight, PrimaryThemeColorLight, ShBorderRadius, ShOnHover, WhiteColor } from './styleConstants';

export const ShAppBar = styled(AppBar)(({ theme }) => ({
  height: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${theme.palette.mode === 'light' ? BorderColorLight : BorderColorDark}`,
  boxShadow: 'none',
  background: 'transparent',
  backgroundImage: 'none',
  backgroundColor: 'transparent',
  [theme.breakpoints.up('xs')]: {
    '& .MuiToolbar-root': {
      minHeight: '48px',
    },
  },
  [theme.breakpoints.up('sm')]: {
    '& .MuiToolbar-root': {
      minHeight: '48px',
    },
  },
  [theme.breakpoints.up('md')]: {
    '& .MuiToolbar-root': {
      minHeight: '56px',
    },
  },
  '& .MuiToolbar-root': {
    width: '100%',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  '& .MuiToolbar-root img': {
    marginTop: 'auto',
    marginBottom: 'auto',
    maxWidth: '160px',
  },
}));

//List view
export const ListPaperContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  flex: 1,
  [theme.breakpoints.up('xs')]: {
    '& .MuiAccordionSummary-root': {
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
    },
    '& .on-hover': {
      display: 'none',
    },
    '& .more-btn': {
      opacity: 1,
    },
  },
  [theme.breakpoints.up('sm')]: {
    '& .MuiAccordionSummary-root': {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    '& .on-hover': {
      display: 'inline-block',
    },
    '& .more-btn': {
      opacity: 0,
    },
  },
  [theme.breakpoints.up('md')]: {
    '& .MuiAccordionSummary-root': {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    '& .on-hover': {
      display: 'inline-block',
    },
    '& .more-btn': {
      opacity: 0,
    },
  },
  [theme.breakpoints.up('lg')]: {
    '& .MuiAccordionSummary-root': {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    '& .on-hover': {
      display: 'inline-block',
    },
    '& .more-btn': {
      opacity: 0,
    },
  },
  '& .MuiAccordion-root': {
    // Test style, has to finalized after the discussion.
    // marginBottom: theme.spacing(0.5),
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    '&::before': {
      background: 'none',
    },
    '& .MuiAccordionSummary-root': {
      '&.is-actions-open': {
        backgroundColor: PrimaryThemeColorLight,
      },
      '& .MuiAccordionSummary-content': {
        alignItems: 'center',
        '& .MuiCheckbox-root': {
          marginRight: theme.spacing(0.5),
        },
      },
    },
    '& .avatar': {
      marginRight: theme.spacing(1.5),
    },
    '& .info': {
      display: 'flex',
      alignItems: 'center',
      color: 'grey',
    },
    '& .on-hover': {
      opacity: 0,
      transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
    },
    '& .more-btn': {
      marginLeft: 'auto',
      transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
    },
    '&:hover': {
      '& .on-hover': {
        opacity: 1,
      },
      '& .more-btn': {
        opacity: 1,
      },
    },
    '& .name-blk': {
      display: 'flex',
      alignItems: 'center',
      '& svg': {
        marginLeft: '3px',
      },
    },
  },
}));

export const ShToolbarPaper = styled(Paper)(({ theme }) => ({
  elevation: 0,
  paddingRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  backgroundColor: 'transparent',
  border: 'none',
  boxShadow: 'none',
  '& .tools-stack': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingTop: theme.spacing(0.5),
    // paddingBottom: theme.spacing(1),
    [theme.breakpoints.up('xs')]: {
      '& .custom-paper': {
        paddingTop: 0,
        paddingBottom: 0,
      },
      '& .filter-chips': {
        minWidth: '200px',
      },
    },
    [theme.breakpoints.up('sm')]: {
      '& .custom-paper': {
        paddingTop: '2px',
        paddingBottom: '2px',
      },
      '& .filter-chips': {
        minWidth: '430px',
      },
    },
    [theme.breakpoints.up('md')]: {
      '& .custom-paper': {
        paddingTop: '2px',
        paddingBottom: '2px',
      },
      '& .filter-chips': {
        minWidth: 'unset',
      },
    },
    '& .custom-paper': {
      borderRadius: ShBorderRadius,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
      '& input': {
        padding: '5px',
        maxWidth: '120px',
      },
      '& hr': {
        height: '28px',
        marginLeft: '4px',
        marginRight: '4px',
      },
      '& button': {
        padding: '4px',
        textTransform: 'none',
      },
      '& .MuiToggleButtonGroup-grouped': {
        padding: '4px',
        border: 'none',
        backgroundColor: theme.palette.mode === 'light' ? WhiteColor : '',
      },
      '& .Mui-selected': {
        '& .MuiSvgIcon-root': {
          color: `${theme.palette.primary.main} !important`,
        },
      },
    },
  },
  '& .filter-chips': {
    [theme.breakpoints.up('xs')]: {
      '& .filter-chips': {
        minWidth: '200px',
      },
    },
    [theme.breakpoints.up('sm')]: {
      '& .filter-chips': {
        minWidth: '430px',
      },
    },
    [theme.breakpoints.up('md')]: {
      '& .filter-chips': {
        minWidth: 'unset',
      },
    },
    flexDirection: 'row',
    flex: 1,
    overflow: 'auto',
    '& .MuiTabs-root': {
      minHeight: 'unset',
      flex: 1,
      '& .MuiTabs-indicator': {
        display: 'none',
      },
      '& .MuiTab-root': {
        minHeight: 'unset',
        minWidth: 'unset',
        textTransform: 'none',
        padding: 0,
        '& .MuiChip-root': {
          marginRight: theme.spacing(1),
        },
      },
    },
  },
  '& .hide-scroll-bar': {
    overflow: 'scroll',
    scrollbarWidth: 'none',
  },
  '& .hide-scrollbar::-webkit-scrollbar': {
    display: 'none',
  },
}));

interface IShPaper extends PaperProps {
  elevation?: number;
  cursor?: 'pointer' | 'text';
  minHeight?: string | number;
  borderRadius?: number;
  height?: string;
  marginTop?: string;
  marginBottom?: string;
  flex?: number | string;
  noPadding?: boolean;
  overflow?: Overflow;
  width?: string;
  transElevateOnHover?: boolean;
  outlineOnHover?: boolean;
  backgroundColor?: string;
  noBorderTop?: boolean;
  headerSection?: boolean;
  borderColor?: string;
  borderStyle?: string;
  borderWidth?: string;
  leftBorderWidth?: string;
  leftBorderColor?: string;
  ShBoxShadow?: boolean;
}

export const ShPaper = styled(Paper, {
  shouldForwardProp: prop =>
    prop !== 'cursor' &&
    prop !== 'minHeight' &&
    prop !== 'borderRadius' &&
    prop !== 'marginTop' &&
    prop !== 'width' &&
    prop !== 'marginBottom' &&
    prop !== 'flex' &&
    prop !== 'noPadding' &&
    prop !== 'overflow' &&
    prop !== 'transElevateOnHover' &&
    prop !== 'outlineOnHover' &&
    prop !== 'backgroundColor' &&
    prop !== 'noBorderTop' &&
    prop !== 'headerSection' &&
    prop !== 'borderColor' &&
    prop !== 'borderStyle' &&
    prop !== 'borderWidth' &&
    prop !== 'leftBorderWidth' &&
    prop !== 'leftBorderColor' &&
    prop !== 'ShBoxShadow',
})<IShPaper>(
  ({
    theme,
    cursor,
    minHeight,
    borderRadius = ShBorderRadius,
    height = '100%',
    marginTop = 'unset',
    marginBottom = 'unset',
    flex = 'unset',
    noPadding = false,
    overflow = 'unset',
    transElevateOnHover = false,
    outlineOnHover = false,
    width = 'unset',
    backgroundColor = theme.palette.background.paper,
    noBorderTop = false,
    headerSection = false,
    borderColor = theme.palette.grey[400],
    borderStyle = '',
    borderWidth = '',
    leftBorderWidth = '',
    leftBorderColor = '',
    ShBoxShadow = false,
  }) => ({
    [theme.breakpoints.up('xs')]: {
      padding: noPadding ? 0 : theme.spacing(1),
    },
    [theme.breakpoints.up('sm')]: {
      padding: noPadding ? 0 : theme.spacing(1),
    },
    [theme.breakpoints.up('md')]: {
      padding: noPadding ? 0 : theme.spacing(2),
    },
    [theme.breakpoints.up('lg')]: {
      padding: noPadding ? 0 : theme.spacing(2),
    },
    [theme.breakpoints.up('xl')]: {
      padding: noPadding ? 0 : theme.spacing(2),
    },
    minHeight: minHeight,
    ':hover': {
      cursor: cursor,
    },
    height: height,
    width: width,
    borderRadius: borderRadius ?? 0,
    marginTop: marginTop,
    marginBottom: marginBottom,
    flex: flex,
    overflow: overflow,
    borderWidth: '1.8px',
    backgroundColor: headerSection
      ? theme.palette.mode === 'dark'
        ? theme.palette.grey[800] // Dark mode header color
        : theme.palette.grey[100] // Light mode header color
      : backgroundColor,
    ...ShOnHover(transElevateOnHover, theme),
    ...(noBorderTop && { borderTop: 'none' }),
    ...(borderStyle && {
      border: `${borderWidth || '2px'} ${borderStyle} ${borderColor}`,
    }),
    ...(borderWidth && {
      borderWidth: borderWidth,
    }),
    ...(leftBorderWidth && {
      borderLeft: `${leftBorderWidth} solid ${leftBorderColor}`,
    }),
    ...(ShBoxShadow && {
      boxShadow: theme.palette.mode === 'light' ? 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px' : 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
    ...(outlineOnHover && {
      transition: 'all 0.1s ease-in-out',
      cursor: 'pointer',
      '&:hover': {
        outline: `2px solid ${theme.palette.primary.main}`,
        outlineOffset: '-2px',
        transform: 'translateY(-1px)',
        boxShadow: theme.palette.mode === 'light' ? '0 4px 12px rgba(0, 0, 0, 0.1)' : '0 4px 12px rgba(255, 255, 255, 0.1)',
      },
    }),
  })
);
