import { lighten } from '@mui/material/styles';

// export const PrimaryThemeColor = '#238cb9';
export const PrimaryWordpressThemeColor = '#488cfc';
// OLD Primary was #1976D2
export const PrimaryThemeColor = '#417ee3';
export const ResourceCTAColorBase = '#C1E1C1';
export const PrimaryThemeColorLight = lighten(PrimaryThemeColor, 0.9);
export const ShGreen = '#74C05A';
export const shBlue = '#417EE3';
export const ShDarkGreen = '#4CAF50';
// export const BorderColorLight = '#EBEFF2';
// export const BorderColorLight = '#0000001f';
export const BorderColorLight = '#ebebeb';
export const BorderColorDark = '#474748';
export const SHMenuBoxShadow = '0 0px 8px rgba(0, 0, 0, 0.1)';
export const TextPrimary = '#111111';
export const DarkModeBackground = '#2B2B2B';
// This controls overall background color of the app // dont delete this comment
export const LightModeBackground = '#ffffff';
export const WhiteColor = '#FFFFFF';
export const LogoutRedColor = '#F7685B';
export const MUIGrey = '#6d6d6d';
export const PaperBorderRadius = '4px';
export const ShBorderRadius = '4px';
export const ShIconPrimary = '#1976D2';
export const ShIconSecondary = '#2196F3';
export const betaColor = 'linear-gradient(90deg, #FFC107, #FF6D00)';
export const greenGradient = 'linear-gradient(90deg, #00C853, #64DD17, #AEEA00)';

// test/demo colors
// export const ShIconPrimary = '#74C059';
// export const ShIconSecondary = '#A7CC46';

export const PaperElevation = 2;
export const PaperElevationOnHover = 4;
export const PaperVariant: 'elevation' | 'outlined' = 'outlined';

export const ShGreenLightGradientToBottom = 'linear-gradient(to bottom, #ffffff, #fcfdff, #f7fdff, #f2fcfd, #effbf7, #effbf7, #effbf7, #effbf7, #f2fcfd, #f7fdff, #fcfdff, #ffffff)';
export const ShGreenLightGradientToRight = 'linear-gradient(to right, #ffffff, #fcfdff, #f7fdff, #f2fcfd, #effbf7, #effbf7, #effbf7, #effbf7, #f2fcfd, #f7fdff, #fcfdff, #ffffff)';

export const ShLightGradientToLeft = ` #ffffff;`;
export const ShLightGradientToBottom = ` #ffffff`;

export const HoverTranslateBy = '1px -1px';

export const AppLightBackground = `linear-gradient(rgba(0, 0, 0, 0.018) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(0, 0, 0, 0.018) 1.5px, transparent 1.5px)`;
export const AppDarkBackground = `linear-gradient(rgba(255, 255, 255, 0.05) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1.5px, transparent 1.5px)`;

/**
 * On hover elevation and translation animation style constant.
 * Use this to add on hover animation, this is to maintain consistent animation throughout the app.
 * */
export const ShOnHover = (isShowHoverAnimation: boolean, theme: { shadows: unknown[] }, additionalProps?: object) => {
  return isShowHoverAnimation
    ? {
        transition: 'translate 0.3s ease-out, box-shadow 0.3s ease-out',
        '&:hover': {
          boxShadow: theme.shadows[PaperElevationOnHover],
          translate: HoverTranslateBy,
          ...additionalProps,
        },
      }
    : {
        '&:hover': {
          ...additionalProps,
        },
      };
};
