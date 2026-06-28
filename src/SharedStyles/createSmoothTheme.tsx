import { Box, PaletteMode, Theme, ThemeOptions, autocompleteClasses, createTheme, responsiveFontSizes } from '@mui/material';
import { darken } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import {
  BorderColorDark,
  BorderColorLight,
  DarkModeBackground,
  DarkModeSurface,
  DarkModeSurfaceElevated,
  DarkModeTextPrimary,
  DarkModeTextSecondary,
  PaperBorderRadius,
  PrimaryThemeColor,
  PrimaryWordpressThemeColor,
  SHMenuBoxShadow,
  SHMenuBoxShadowDark,
  ShGreen,
  WhiteColor,
  shBlue,
} from './styleConstants';

const darkSelectedOptionBg = 'rgba(65, 126, 227, 0.18)';
const darkHoverOptionBg = 'rgba(232, 237, 245, 0.06)';

export const createSmoothThemeOptions = (mode: PaletteMode): ThemeOptions => {
  const isDark = mode === 'dark';
  const darkMenuSurface = DarkModeSurfaceElevated;

  return {
    palette: {
      mode,
      ...(isDark
        ? {
            background: {
              default: DarkModeBackground,
              paper: DarkModeSurface,
            },
            text: {
              primary: DarkModeTextPrimary,
              secondary: DarkModeTextSecondary,
            },
            divider: BorderColorDark,
            grey: {
              50: '#f8fafc',
              100: '#eef2f7',
              200: '#dce3ed',
              300: '#b8c4d4',
              400: '#8b9bb0',
              500: '#6b7c93',
              600: '#556275',
              700: '#3e4a5e',
              800: '#2a3447',
              900: '#171c26',
            },
            action: {
              hover: darkHoverOptionBg,
              selected: 'rgba(232, 237, 245, 0.10)',
              disabled: 'rgba(232, 237, 245, 0.26)',
              disabledBackground: 'rgba(232, 237, 245, 0.10)',
            },
          }
        : {}),
      primary: { main: isDark ? WhiteColor : PrimaryThemeColor },
      secondary: {
        main: isDark ? DarkModeTextSecondary : '#666666',
      },
      success: { main: ShGreen },
    },
    typography: {
      fontFamily: 'Poppins, Roboto, sans-serif',
      fontSize: 11,
      h1: { fontSize: '2.125rem' },
      h2: { fontSize: '1.8125rem' },
      h3: { fontSize: '1.5625rem' },
      h4: { fontSize: '1.3125rem' },
      h5: { fontSize: '1.1875rem' },
      h6: { fontSize: '1.0625rem' },
      body1: { fontSize: '0.80125rem' },
      body2: { fontSize: '0.70875rem' },
      button: { fontSize: '0.74125rem' },
      caption: { fontSize: '0.6625rem' },
      overline: { fontSize: '0.6625rem' },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          containedPrimary: ({ theme }) =>
            theme.palette.mode === 'dark'
              ? {
                  backgroundColor: PrimaryThemeColor,
                  color: WhiteColor,
                  '&:hover': {
                    backgroundColor: darken(PrimaryThemeColor, 0.15),
                  },
                }
              : {},
        },
      },
      MuiAppBar: { defaultProps: { color: 'inherit' } },
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) =>
            theme.palette.mode === 'dark'
              ? {
                  backgroundImage: 'none',
                }
              : {},
          outlined: {
            borderColor: isDark ? BorderColorDark : BorderColorLight,
            borderRadius: PaperBorderRadius,
          },
          elevation: {
            borderRadius: PaperBorderRadius,
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: isDark ? darkMenuSurface : '#ffffff',
            borderRadius: PaperBorderRadius,
            border: '1px solid',
            borderColor: isDark ? BorderColorDark : BorderColorLight,
            boxShadow: isDark ? SHMenuBoxShadowDark : SHMenuBoxShadow,
            padding: '4px 0',
          },
          list: {
            padding: 0,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              color: isDark ? WhiteColor : shBlue,
              borderLeft: `3px solid ${PrimaryWordpressThemeColor}`,
            },
          },
        },
      },
      MuiSelect: {
        defaultProps: {
          MenuProps: {
            PaperProps: {
              style: {
                backgroundColor: isDark ? darkMenuSurface : '#ffffff',
                borderColor: isDark ? BorderColorDark : BorderColorLight,
                borderRadius: PaperBorderRadius,
                borderStyle: 'solid',
                boxShadow: isDark ? SHMenuBoxShadowDark : SHMenuBoxShadow,
              },
            },
          },
        },
      },
      MuiAutocomplete: {
        defaultProps: {
          renderOption: (props, option, state, ownerState) => {
            const { key, ...optionProps } = props;
            const isSelected = state.selected;
            return (
              <Box
                key={key}
                sx={{
                  [`&.${autocompleteClasses.option}`]: {
                    transition: 'all 0.2s ease',
                    paddingTop: '4px',
                    justifyContent: 'space-between',
                    borderLeft: isSelected ? `3px solid ${PrimaryWordpressThemeColor}` : 'none',
                    backgroundColor: isSelected ? (isDark ? darkSelectedOptionBg : shBlue) : 'transparent',
                    color: isSelected ? (isDark ? WhiteColor : shBlue) : 'inherit',
                    '&:hover': {
                      backgroundColor: isSelected ? (isDark ? darkSelectedOptionBg : '#b2ebf2') : isDark ? darkHoverOptionBg : '#f0f0f0',
                    },
                  },
                }}
                component='li'
                {...optionProps}
              >
                {ownerState.getOptionLabel(option)}
                {isSelected && <CheckIcon color='primary' fontSize='small' />}
              </Box>
            );
          },
          componentsProps: {
            paper: {
              sx: {
                backgroundColor: isDark ? darkMenuSurface : '#ffffff',
                borderColor: isDark ? BorderColorDark : BorderColorLight,
                borderRadius: PaperBorderRadius,
                borderStyle: 'solid',
                boxShadow: isDark ? SHMenuBoxShadowDark : SHMenuBoxShadow,
              },
            },
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: ({ theme }) => ({
            typography: theme.typography.caption,
            marginBottom: 8,
          }),
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            width: 'fit-content',
            maxWidth: '100%',
            alignSelf: 'flex-start',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          root: ({ theme }) => ({
            '& .MuiDialog-paper': {
              borderRadius: '10px',
              border: '1px solid',
              borderColor: theme.palette.divider,
            },
          }),
        },
      },
    },
  };
};

/** Shared MUI theme for Smooth ATS, HRMS, and other employer apps. */
export const createSmoothTheme = (mode: PaletteMode): Theme =>
  responsiveFontSizes(createTheme(createSmoothThemeOptions(mode)));
