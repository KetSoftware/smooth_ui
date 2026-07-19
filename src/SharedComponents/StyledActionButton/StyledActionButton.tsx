import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { alpha, darken, styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import BackupTableOutlinedIcon from '@mui/icons-material/BackupTableOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { LogoutRedColor, PrimaryThemeColor, ShGreen, WhiteColor } from '../../SharedStyles/styleConstants';

declare module '@mui/material/Button' {
  interface ButtonPropsSizeOverrides {
    xsmall: true;
  }
}

type ActionIconProps = {
  add?: boolean;
  cancel?: boolean;
  edit?: boolean;
  delete?: boolean;
  save?: boolean;
  close?: boolean;
  back?: boolean;
  continue?: boolean;
  search?: boolean;
  filter?: boolean;
  download?: boolean;
  upload?: boolean;
  refresh?: boolean;
  settings?: boolean;
  table?: boolean;
  confirm?: boolean;
};

const ACTION_ICON_PROPS = [
  'add',
  'cancel',
  'edit',
  'delete',
  'save',
  'close',
  'back',
  'continue',
  'search',
  'filter',
  'download',
  'upload',
  'refresh',
  'settings',
  'confirm',
  'table',
  'postJob',
  'icon',
  'borderRadius',
  'textColor',
  'minWidth',
  'marginLeft',
  'extraLarge',
  'gradient',
  'bgColor',
  'nav',
] as const;

const getActionIcon = (props: ActionIconProps): React.ReactNode => {
  if (props.back) return <ArrowBackIcon fontSize='small' />;
  if (props.table) return <BackupTableOutlinedIcon fontSize='small' />;
  if (props.continue) return <ArrowForwardIcon fontSize='small' />;
  if (props.add) return <AddIcon fontSize='small' />;
  if (props.cancel) return <CancelIcon fontSize='small' />;
  if (props.edit) return <EditIcon fontSize='small' />;
  if (props.delete) return <DeleteIcon fontSize='small' />;
  if (props.save) return <SaveIcon fontSize='small' />;
  if (props.close) return <CloseIcon fontSize='small' />;
  if (props.search) return <SearchIcon fontSize='small' />;
  if (props.filter) return <FilterListIcon fontSize='small' />;
  if (props.download) return <DownloadIcon fontSize='small' />;
  if (props.upload) return <UploadIcon fontSize='small' />;
  if (props.refresh) return <RefreshIcon fontSize='small' />;
  if (props.settings) return <SettingsIcon fontSize='small' />;
  if (props.confirm) return <CheckCircleIcon fontSize='small' />;
  return undefined;
};

type StyledActionButtonStyleProps = ActionIconProps & {
  component?: React.ElementType;
  to?: string;
  postJob?: boolean;
  borderRadius?: number | string;
  textColor?: string;
  minWidth?: string | number;
  marginLeft?: string;
  extraLarge?: boolean;
  /** Green→blue gradient fill (replaces ShGradientButton). */
  gradient?: boolean;
  /** Arbitrary brand fill with auto contrast text (replaces ShCareersPageButton). */
  bgColor?: string;
  /** Left-nav layout: start-aligned, no border, inherit color (replaces LeftNavButtonStyled). */
  nav?: boolean;
};

const getLuminance = (color: string) => {
  if (!color?.startsWith('#') || (color.length !== 7 && color.length !== 4)) return 0;
  let hex = color.slice(1);
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const rgb = parseInt(hex, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  const a = [r, g, b].map(v => {
    const n = v / 255;
    return n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

export const getContrastTextColor = (bgColor: string) => (getLuminance(bgColor) > 0.5 ? '#000000' : '#FFFFFF');

const StyledActionButtonBase = styled(Button, {
  shouldForwardProp: prop => !ACTION_ICON_PROPS.includes(prop as (typeof ACTION_ICON_PROPS)[number]),
})<StyledActionButtonStyleProps>(
  ({
    theme,
    size,
    borderRadius: br,
    textColor,
    minWidth,
    marginLeft,
    extraLarge,
    fullWidth,
    gradient,
    bgColor,
    nav,
  }) => {
    const contrastFromBg = bgColor ? getContrastTextColor(bgColor) : undefined;

    return {
      borderRadius: br !== undefined ? br : theme.shape.borderRadius * 2,
      ...(textColor !== undefined ? { color: textColor } : {}),
      ...(minWidth !== undefined ? { minWidth } : {}),
      ...(marginLeft !== undefined ? { marginLeft } : {}),
      width: fullWidth ? '100%' : 'fit-content',
      fontSize: theme.typography.body2.fontSize,
      padding: size === 'small' ? theme.spacing(0.5, 1) : size === 'xsmall' ? theme.spacing(0.25, 0.75) : theme.spacing(1, 1.5),
      textTransform: 'none',
      fontWeight: 500,
      transition: 'all 0.2s ease-in-out',
      border: nav ? 'none' : `1.5px solid ${theme.palette.divider}`,
      boxSizing: 'border-box',
      ...(extraLarge
        ? {
            fontSize: theme.typography.button.fontSize,
            padding: '10px 30px',
            minHeight: 42,
          }
        : {}),
      ...(nav
        ? {
            justifyContent: 'flex-start',
            fontWeight: 400,
            padding: '8px 0px 8px 20px',
            color: 'inherit',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: 0,
            width: '100%',
            '& .MuiSvgIcon-root': {
              marginRight: '5px',
            },
            '& .MuiSvgIcon-root.logout-icon': {
              color: theme.palette.mode === 'light' ? LogoutRedColor : WhiteColor,
            },
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
              border: 'none',
            },
          }
        : {}),
      ...(gradient
        ? {
            color: textColor || '#fff',
            border: 'none',
            background: 'linear-gradient(90deg, #69C982 0%, #4383B7 100%)',
            '&:hover': {
              background: 'linear-gradient(90deg, #5BBF7A 0%, #3C77A6 100%)',
              border: 'none',
            },
          }
        : {}),
      ...(bgColor
        ? {
            color: contrastFromBg,
            backgroundColor: bgColor,
            border: 'none',
            '&:hover': {
              backgroundColor: darken(bgColor, 0.1),
              border: 'none',
            },
          }
        : {}),
      [theme.breakpoints.down('sm')]: nav
        ? {}
        : {
            fontSize: '0.7rem',
            padding: theme.spacing(0.25, 0.75),
            minHeight: 26,
            borderRadius: 4,
          },
      ...(!nav && !gradient && !bgColor
        ? {
            '&:hover': {
              borderColor: theme.palette.primary.main,
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
            },
          }
        : {}),
      '&.Mui-disabled': {
        color: theme.palette.text.disabled,
        backgroundColor: theme.palette.action.disabledBackground,
        borderColor: theme.palette.action.disabled,
        cursor: 'not-allowed',
        '&:hover': {
          backgroundColor: theme.palette.action.disabledBackground,
          borderColor: theme.palette.action.disabled,
        },
      },
      '&.MuiButton-containedPrimary': {
        color: '#fff',
        backgroundColor: theme.palette.mode === 'dark' ? PrimaryThemeColor : theme.palette.primary.main,
        border: 'none',
        '&:hover': {
          backgroundColor: theme.palette.mode === 'dark' ? darken(PrimaryThemeColor, 0.15) : theme.palette.primary.dark,
          color: '#fff',
          border: 'none',
        },
        '&.Mui-disabled': {
          color: theme.palette.text.disabled,
          backgroundColor: theme.palette.action.disabledBackground,
          border: 'none',
        },
      },
      // Match legacy ShBlueBtn: outlined kept the blue fill (only border used the outline class).
      '&.MuiButton-outlinedPrimary': {
        color: '#fff',
        backgroundColor: theme.palette.mode === 'dark' ? PrimaryThemeColor : theme.palette.primary.main,
        borderColor: theme.palette.mode === 'dark' ? PrimaryThemeColor : theme.palette.primary.main,
        borderWidth: '1.5px',
        '&:hover': {
          backgroundColor: theme.palette.mode === 'dark' ? darken(PrimaryThemeColor, 0.15) : theme.palette.primary.dark,
          color: '#fff',
          borderColor: theme.palette.mode === 'dark' ? darken(PrimaryThemeColor, 0.15) : theme.palette.primary.dark,
        },
      },
      '&.MuiButton-containedSecondary': {
        color: '#fff',
        backgroundColor: theme.palette.secondary.main,
        border: 'none',
        '&:hover': {
          backgroundColor: theme.palette.secondary.dark,
          color: '#fff',
          border: 'none',
        },
      },
      '&.MuiButton-outlinedSecondary': {
        color: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
        borderWidth: '1.5px',
        '&:hover': {
          backgroundColor: alpha(theme.palette.secondary.main, 0.05),
          borderColor: theme.palette.secondary.dark,
        },
      },
      // Brand green (replaces ShGreenBtn / ShWordpressButton)
      '&.MuiButton-containedSuccess': {
        color: '#fff',
        backgroundColor: theme.palette.success?.main ?? ShGreen,
        border: 'none',
        '&:hover': {
          backgroundColor: theme.palette.success?.dark ?? darken(ShGreen, 0.1),
          color: '#fff',
          border: 'none',
        },
      },
      // Match legacy ShGreenBtn: outlined kept the green fill (only border used the outline class).
      '&.MuiButton-outlinedSuccess': {
        color: '#fff',
        backgroundColor: theme.palette.success?.main ?? ShGreen,
        borderColor: theme.palette.success?.main ?? ShGreen,
        borderWidth: '1.5px',
        '&:hover': {
          backgroundColor: theme.palette.success?.dark ?? darken(ShGreen, 0.1),
          color: '#fff',
          borderColor: theme.palette.success?.dark ?? darken(ShGreen, 0.1),
        },
      },
      '&.MuiButton-containedError': {
        color: '#fff',
        backgroundColor: theme.palette.error.main,
        border: 'none',
        '&:hover': {
          backgroundColor: theme.palette.error.dark,
          color: '#fff',
          border: 'none',
        },
      },
      '&.MuiButton-outlinedError': {
        color: theme.palette.error.main,
        borderColor: theme.palette.error.main,
        borderWidth: '1.5px',
        '&:hover': {
          backgroundColor: alpha(theme.palette.error.main, 0.05),
          borderColor: theme.palette.error.dark,
        },
      },
      '&.MuiButton-containedWarning': {
        color: '#fff',
        backgroundColor: theme.palette.warning.main,
        border: 'none',
        '&:hover': {
          backgroundColor: theme.palette.warning.dark,
          color: '#fff',
          border: 'none',
        },
      },
      '&.MuiButton-outlinedWarning': {
        color: theme.palette.warning.main,
        borderColor: theme.palette.warning.main,
        borderWidth: '1.5px',
        '&:hover': {
          backgroundColor: alpha(theme.palette.warning.main, 0.05),
          borderColor: theme.palette.warning.dark,
        },
      },
      '&.MuiButton-containedInfo': {
        color: '#fff',
        backgroundColor: theme.palette.info.main,
        border: 'none',
        '&:hover': {
          backgroundColor: theme.palette.info.dark,
          color: '#fff',
          border: 'none',
        },
      },
      '&.MuiButton-outlinedInfo': {
        color: theme.palette.info.main,
        borderColor: theme.palette.info.main,
        borderWidth: '1.5px',
        '&:hover': {
          backgroundColor: alpha(theme.palette.info.main, 0.05),
          borderColor: theme.palette.info.dark,
        },
      },
      '&.self-center': {
        alignSelf: 'center',
      },
      '&.self-right': {
        alignSelf: 'flex-end',
      },
    };
  }
);

// Omit `component` so intersecting a loose ElementType does not widen onClick/onDrag* to `any`
// (that broke ATS `tsc --noEmit` after the StyledActionButton migration).
export type StyledActionButtonProps = Omit<ButtonProps, 'component'> &
  ActionIconProps & {
    to?: string;
    component?: React.ElementType;
    postJob?: boolean;
    icon?: React.ReactNode;
    borderRadius?: number | string;
    textColor?: string;
    minWidth?: string | number;
    marginLeft?: string;
    extraLarge?: boolean;
    target?: string;
    rel?: string;
    gradient?: boolean;
    bgColor?: string;
    nav?: boolean;
  };

export const StyledActionButton = React.forwardRef<HTMLButtonElement, StyledActionButtonProps>(function StyledActionButton(
  props,
  ref
) {
  const {
    startIcon,
    icon,
    table,
    back,
    continue: continueProp,
    add,
    cancel,
    edit,
    delete: deleteProp,
    save,
    close,
    search,
    filter,
    download,
    upload,
    refresh,
    settings,
    confirm,
    size,
    postJob,
    gradient,
    bgColor,
    nav,
    ...rest
  } = props;

  const resolvedIcon =
    startIcon ??
    icon ??
    getActionIcon({
      table,
      back,
      continue: continueProp,
      add,
      cancel,
      edit,
      delete: deleteProp,
      save,
      close,
      search,
      filter,
      download,
      upload,
      refresh,
      settings,
      confirm,
    });

  return (
    <StyledActionButtonBase
      ref={ref}
      startIcon={resolvedIcon}
      add={add}
      cancel={cancel}
      edit={edit}
      delete={deleteProp}
      save={save}
      close={close}
      back={back}
      continue={continueProp}
      search={search}
      filter={filter}
      download={download}
      upload={upload}
      refresh={refresh}
      settings={settings}
      confirm={confirm}
      table={table}
      size={size}
      postJob={postJob}
      gradient={gradient}
      bgColor={bgColor}
      nav={nav}
      {...rest}
    />
  );
});
