import type { ChangeEvent, ElementType, SyntheticEvent } from 'react';
import { Drawer, Link, LinkProps, MenuItem, Switch, SwitchProps, Tabs, TabsProps, Tab, TabProps, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DarkModeBackground, PrimaryThemeColor, ShBorderRadius, ShOnHover, WhiteColor } from './styleConstants';

const drawerWidth = 360;

export const ShDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  '& .MuiPaper-root': {
    width: drawerWidth,
    overflowX: 'hidden',
  },
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  '&.selected-item': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.contrastText,
    },
  },
}));

const StyledMaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent('#fff')}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        ...theme.applyStyles('dark', {
          backgroundColor: '#8796A5',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#003892',
    }),
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
    ...theme.applyStyles('dark', {
      backgroundColor: '#8796A5',
    }),
  },
}));

export const MaterialUISwitch = (props: SwitchProps) => <StyledMaterialUISwitch {...props} />;

type IShSwitchProps = Omit<SwitchProps, 'onChange'> & {
  color?: SwitchProps['color'];
  checkedColor?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};

const StyledShSwitch = styled(
  ({ checkedColor, ...props }: IShSwitchProps) => <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />,
  { shouldForwardProp: prop => prop !== 'checkedColor' }
)(({ theme, checkedColor = '#65C466' }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: checkedColor,
        opacity: 1,
        border: 0,
        ...theme.applyStyles('dark', {
          backgroundColor: checkedColor,
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[600],
      }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3,
      }),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D',
    }),
  },
}));

export const ShSwitch = (props: IShSwitchProps) => <StyledShSwitch {...props} />;

interface ShSwitchFieldProps extends IShSwitchProps {
  label: string;
  helperText?: string;
}

export const ShSwitchField = ({ label, helperText, ...props }: ShSwitchFieldProps) => {
  return (
    <Stack direction='row' spacing={1} alignItems='center'>
      <ShSwitch {...props} />
      <Stack spacing={0.25}>
        <Typography variant='body2'>{label}</Typography>
        {helperText ? (
          <Typography variant='caption' color='text.secondary'>
            {helperText}
          </Typography>
        ) : null}
      </Stack>
    </Stack>
  );
};

interface IShTabs extends Omit<TabsProps, 'onChange'> {
  onChange?: (event: SyntheticEvent, value: any) => void;
  highlightVariant?: 'underline' | 'button';
  highlightColor?: string;
  fontSize?: 'large' | 'medium' | 'small' | string;
  fontWeight?: 'bold' | number | string;
}

const StyledShTabs = styled(Tabs, {
  shouldForwardProp: prop => prop !== 'highlightVariant' && prop !== 'highlightColor' && prop !== 'fontSize' && prop !== 'fontWeight',
})<IShTabs>(({ theme, highlightVariant = 'button', fontSize = theme.typography.body2.fontSize, fontWeight = 'inherit', highlightColor = PrimaryThemeColor }) => ({
  minHeight: 'unset',
  overflow: 'visible',
  '& .MuiTabs-scroller': {
    overflow: 'visible !important',
  },
  '& .MuiTabs-list, & .MuiTabs-flexContainer': {
    overflow: 'visible',
    paddingLeft: theme.spacing(0.25),
    paddingRight: theme.spacing(0.25),
    gap: theme.spacing(0.5),
  },
  '& .MuiTabs-scrollButtons': {
    minWidth: 0,
  },
  '& .MuiTabs-scrollButtons.Mui-disabled': {
    width: 0,
    minWidth: 0,
    padding: 0,
    margin: 0,
    opacity: 0,
    pointerEvents: 'none',
  },
  '& .MuiTabs-indicator': {
    display: highlightVariant === 'button' ? 'none' : 'block',
    backgroundColor: highlightColor,
  },
  '& .MuiTab-root': {
    minHeight: 'unset',
    fontSize: fontSize,
    fontWeight: fontWeight,
    minWidth: 'unset',
    borderRadius: ShBorderRadius,
    padding: theme.spacing(1),
    textTransform: 'none',
    '&.Mui-selected': {
      backgroundColor: highlightVariant === 'button' ? highlightColor : 'inherit',
      color: highlightVariant === 'button' ? theme.palette.getContrastText(highlightColor) : 'inherit',
      '& .check-icon': {
        color: theme.palette.mode === 'light' ? WhiteColor : DarkModeBackground,
      },
    },
  },
  '& .MuiTab-root:first-of-type': {
    borderTopLeftRadius: ShBorderRadius,
    borderBottomLeftRadius: ShBorderRadius,
  },
  '& .MuiTab-root:last-of-type': {
    borderTopRightRadius: ShBorderRadius,
    borderBottomRightRadius: ShBorderRadius,
  },
  '&.applicant-tabs': {
    width: 'fit-content',
  },
  '&.create-job-tabs': {
    pointerEvents: 'none',
  },
}));

export const ShTabs = (props: IShTabs) => <StyledShTabs {...props} />;

const StyledDashboardTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 'unset',
  '& .MuiTabs-indicator': {
    backgroundColor: 'transparent',
  },
  '& .MuiTab-root': {
    minHeight: 'unset',
    minWidth: 'unset',
    fontSize: theme.typography.body1.fontSize,
    fontWeight: '500',
    textTransform: 'none',
    padding: theme.spacing(1, 1.5),
    borderBottom: `1.5px solid ${PrimaryThemeColor}`,
    color: theme.palette.text.primary,
    transition: 'background-color 250ms ease-in-out, color 250ms ease-in-out, transform 300ms cubic-bezier(0.4, 0, 0.2, 1), border-radius 300ms ease-in-out',
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.getContrastText(theme.palette.primary.main),
      borderBottom: 'none',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    '&:not(.Mui-selected)': {
      backgroundColor: 'transparent',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
  },
}));

export const DashboardTabs = (props: IShTabs) => <StyledDashboardTabs {...props} />;

const StyledShTabsV2 = styled(Tabs, {
  shouldForwardProp: prop => prop !== 'highlightVariant' && prop !== 'highlightColor' && prop !== 'fontSize' && prop !== 'fontWeight',
})<IShTabs>(({ theme, fontSize = theme.typography.body2.fontSize, fontWeight = 'inherit', highlightColor = theme.palette.primary.main }) => ({
  backgroundColor: 'transparent',
  borderRadius: '25px',
  display: 'inline-flex',
  position: 'relative',
  zIndex: 2,
  pointerEvents: 'auto',
  overflow: 'visible',
  '& .MuiTabs-scroller': {
    overflow: 'visible !important',
  },
  '& .MuiTabs-list, & .MuiTabs-flexContainer': {
    overflow: 'visible',
    paddingLeft: theme.spacing(0.25),
    paddingRight: theme.spacing(0.25),
    gap: theme.spacing(0.5),
  },
  '& .MuiTabs-scrollButtons': {
    minWidth: 0,
  },
  '& .MuiTabs-scrollButtons.Mui-disabled': {
    width: 0,
    minWidth: 0,
    padding: 0,
    margin: 0,
    opacity: 0,
    pointerEvents: 'none',
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  '& .MuiTab-root': {
    fontSize: fontSize,
    fontWeight: fontWeight,
    minHeight: 'unset',
    minWidth: 'unset',
    borderRadius: '25px',
    padding: theme.spacing(1, 1.5),
    textTransform: 'none',
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    overflow: 'hidden',
    backgroundClip: 'padding-box',
    '&.Mui-selected': {
      backgroundColor: theme.palette.background.paper,
      color: highlightColor,
      border: `1px solid ${highlightColor}`,
    },
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  '& .MuiTab-root:first-of-type': {
    borderTopLeftRadius: '25px',
    borderBottomLeftRadius: '25px',
  },
  '& .MuiTab-root:last-of-type': {
    borderTopRightRadius: '25px',
    borderBottomRightRadius: '25px',
  },
}));

export const ShTabsV2 = (props: IShTabs) => <StyledShTabsV2 {...props} />;

interface IShGradientTab extends TabProps {
  to?: string;
}

export const ShGradientTab = styled((props: IShGradientTab) => <Tab disableRipple {...props} />)(({ theme }) => ({
  padding: theme.spacing(1, 1.5),
  transition: 'all 0.4s ease-in-out',
  color: theme.palette.text.primary,
  borderRadius: '25px',
  overflow: 'hidden',
  backgroundClip: 'padding-box',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&&.Mui-selected': {
    backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.info.main})`,
    color: theme.palette.common.white,
    border: 'none',
    '& .MuiTab-wrapper': {
      color: theme.palette.common.white,
    },
  },
}));

interface IShMuiLink extends Omit<LinkProps, 'component'> {
  noUnderline?: boolean;
  noBlueHighlight?: boolean;
  color?: string;
  transElevateOnHover?: boolean;
  component?: ElementType;
  to?: string;
  underLineOnHover?: boolean;
  outlined?: boolean;
  width?: string;
}

export const ShMuiLink = styled(Link, {
  shouldForwardProp: prop => prop !== 'noUnderline' && prop !== 'noBlueHighlight' && prop !== 'width' && prop !== 'color' && prop !== 'transElevateOnHover' && prop !== 'underLineOnHover' && prop !== 'outlined',
})<IShMuiLink>(({ theme, noUnderline, noBlueHighlight, color = 'navy', width = 'fit-content', transElevateOnHover = false, underLineOnHover = false, outlined }) => ({
  width: width,
  textDecoration: noUnderline ? 'none' : 'underline',
  cursor: 'pointer',
  color: noBlueHighlight ? theme.palette.text.primary : color,
  border: outlined ? `1px solid ${noBlueHighlight ? theme.palette.text.primary : color}` : 'none',
  padding: outlined ? theme.spacing(1) : '',
  borderRadius: transElevateOnHover || outlined ? ShBorderRadius : 0,
  ...ShOnHover(transElevateOnHover, theme, underLineOnHover ? { textDecoration: 'underline' } : {}),
  '&.disabled': {
    pointerEvents: 'none',
    color: 'inherit',
  },
}));
