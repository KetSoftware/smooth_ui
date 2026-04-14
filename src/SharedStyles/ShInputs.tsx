import type { ChangeEvent, MouseEvent, MouseEventHandler } from 'react';
import { Box, Button, ButtonProps, Checkbox, CheckboxProps, Chip, CircularProgress, FormControlLabel, InputBase, RadioGroup, RadioGroupProps, TextField, ToggleButtonGroup, ToggleButtonGroupProps } from '@mui/material';
import { darken, styled, Theme } from '@mui/material/styles';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { BorderColorDark, BorderColorLight, LogoutRedColor, ShBorderRadius, ShGreen, shBlue, WhiteColor } from './styleConstants';

export const AutocompletePopoverProps = { style: { maxHeight: '250px' } };

export const AutocompleteLoaders = styled(CircularProgress)(({ theme }) => ({
  marginRight: '30px',
}));

export const LeftNavButtonStyled = styled(Button)<IShButton>(({ theme }) => ({
  fontWeight: 400,
  justifyContent: 'flex-start',
  textTransform: 'none',
  padding: '8px 0px 8px 20px',
  color: 'inherit',
  '& .MuiSvgIcon-root': {
    marginRight: '5px',
  },
  '& .MuiSvgIcon-root.logout-icon': {
    color: theme.palette.mode === 'light' ? LogoutRedColor : WhiteColor,
  },
}));

export type IShButton = Omit<ButtonProps, 'onClick'> & {
  borderRadius?: number;
  to?: string;
  minWidth?: string | number;
  marginLeft?: string;
  textColor?: string;
  extraLarge?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const StyledShButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'borderRadius' && prop !== 'minWidth' && prop !== 'marginLeft' && prop !== 'textColor' && prop !== 'extraLarge',
})<IShButton>(({ theme, fullWidth, borderRadius = ShBorderRadius, minWidth = 'unset', marginLeft = 'unset', textColor, extraLarge }) => ({
  borderRadius: borderRadius,
  textTransform: 'none',
  width: fullWidth ? '100%' : 'fit-content',
  minWidth: minWidth,
  marginLeft: marginLeft,
  color: textColor,
  ...(extraLarge && {
    fontSize: theme.typography.button.fontSize,
    padding: '10px 30px',
  }),
  '&.MuiButton-text': {
    textDecoration: theme.palette.mode === 'dark' ? 'underline' : 'none',
  },
  '&.MuiButton-outlined': {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

export const ShButton = (props: IShButton) => <StyledShButton {...props} />;

const StyledShGreenBtn = styled(Button, {
  shouldForwardProp: prop => prop !== 'borderRadius' && prop !== 'minWidth' && prop !== 'marginLeft',
})<IShButton>(({ theme, fullWidth, borderRadius = ShBorderRadius, minWidth = 'unset', marginLeft = 'unset', extraLarge }) => ({
  textTransform: 'none',
  borderRadius: borderRadius,
  ...(extraLarge && {
    fontSize: theme.typography.button.fontSize,
    padding: '10px 30px',
  }),
  width: 'fit-content',
  '&.self-center': {
    alignSelf: 'center',
  },
  '&.self-right': {
    alignSelf: 'flex-end',
  },
  '&:not(.Mui-disabled)': {
    backgroundColor: ShGreen,
    color: WhiteColor,
    '&.MuiButton-outlined': {
      borderColor: ShGreen,
    },
  },
  '&:hover': {
    backgroundColor: darken(ShGreen, 0.1),
  },
}));

export const ShGreenBtn = (props: IShButton) => <StyledShGreenBtn {...props} />;

const StyledShBlueBtn = styled(Button, {
  shouldForwardProp: prop => prop !== 'borderRadius' && prop !== 'minWidth' && prop !== 'marginLeft',
})<IShButton>(({ theme, fullWidth, borderRadius = ShBorderRadius, minWidth = 'unset', marginLeft = 'unset' }) => ({
  textTransform: 'none',
  borderRadius: borderRadius,
  width: 'fit-content',
  '&.self-center': {
    alignSelf: 'center',
  },
  '&.self-right': {
    alignSelf: 'flex-end',
  },
  '&:not(.Mui-disabled)': {
    backgroundColor: shBlue,
    color: WhiteColor,
    '&.MuiButton-outlined': {
      borderColor: shBlue,
    },
  },
  '&:hover': {
    backgroundColor: darken(shBlue, 0.1),
  },
}));

export const ShBlueBtn = (props: IShButton) => <StyledShBlueBtn {...props} />;

export const ShGradientButton = styled(Button, {
  shouldForwardProp: prop => !['borderRadius', 'minWidth', 'marginLeft', 'textColor', 'extraLarge'].includes(prop as string),
})<IShButton>(({ theme, fullWidth, borderRadius = ShBorderRadius, minWidth = 'unset', marginLeft = 'unset', textColor, extraLarge }) => ({
  borderRadius: borderRadius,
  textTransform: 'none',
  width: fullWidth ? '100%' : 'fit-content',
  minWidth: minWidth,
  marginLeft: marginLeft,
  color: textColor || '#fff',
  background: 'linear-gradient(90deg, #69C982 0%, #4383B7 100%)',
  '&:hover': {
    background: 'linear-gradient(90deg, #5BBF7A 0%, #3C77A6 100%)',
  },
  ...(extraLarge && {
    fontSize: theme.typography.button.fontSize,
    padding: '10px 30px',
  }),
  '&.MuiButton-text': {
    textDecoration: theme.palette.mode === 'dark' ? 'underline' : 'none',
  },
  '&.MuiButton-outlined': {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

interface IShCareersPageButton {
  bgColor: string;
  borderRadius?: string;
  minWidth?: string;
  marginLeft?: string;
  extraLarge?: boolean;
}

const getLuminance = (color: string) => {
  const rgb = parseInt(color.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

export const getContrastTextColor = (bgColor: string) => {
  const luminance = getLuminance(bgColor);
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

export const ShCareersPageButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'bgColor' && prop !== 'borderRadius' && prop !== 'minWidth' && prop !== 'marginLeft',
})<IShCareersPageButton>(({ bgColor, borderRadius = '12px', minWidth = 'unset', marginLeft = 'unset', extraLarge }) => {
  const textColor = getContrastTextColor(bgColor);

  return {
    textTransform: 'none',
    borderRadius: borderRadius,
    minWidth,
    marginLeft,
    ...(extraLarge && {
      fontSize: '1rem',
      padding: '10px 30px',
    }),
    width: 'fit-content',
    color: textColor,
    backgroundColor: bgColor,

    '&:hover': {
      backgroundColor: darken(bgColor, 0.1),
    },

    '&.self-center': {
      alignSelf: 'center',
    },
    '&.self-right': {
      alignSelf: 'flex-end',
    },
  };
});

export const ShFileUploadButton = styled(Button)<ButtonProps>(({ theme }) => ({
  padding: '8px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  textTransform: 'none',
}));

export const ShWordpressButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'borderRadius',
})<IShButton>(({ theme, fullWidth, borderRadius = ShBorderRadius }) => ({
  borderRadius: borderRadius,
  textTransform: 'none',
  width: fullWidth ? '100%' : 'fit-content',
  minWidth: 'unset',
  color: WhiteColor,
  backgroundColor: ShGreen,
  '&:hover': {
    backgroundColor: theme.palette.augmentColor({ color: { main: ShGreen } }).dark,
  },
  '&.MuiButton-text': {
    textDecoration: theme.palette.mode === 'dark' ? 'underline' : 'none',
  },
  '&.MuiButton-outlined': {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const ShToggleButtonGroupDefault = (theme: Theme, borderRadius: string | number, minWidth: string | undefined) => {
  return {
    '& .MuiToggleButton-root': {
      padding: theme.spacing(1),
      minWidth: minWidth || 'unset',
      textTransform: 'none',
      ':first-of-type': {
        borderBottomLeftRadius: borderRadius,
        borderTopLeftRadius: borderRadius,
      },
      ':last-of-type': {
        borderBottomRightRadius: borderRadius,
        borderTopRightRadius: borderRadius,
      },
    },
    '&.MuiToggleButtonGroup-vertical': {
      '& .MuiToggleButton-root': {
        ':first-of-type': {
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
        ':last-of-type': {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomRightRadius: borderRadius,
          borderBottomLeftRadius: borderRadius,
        },
      },
    },
  };
};

const ShToggleButtonGroupPill = (theme: Theme, minWidth: string | undefined, gap: number) => {
  return {
    gap: gap ? theme.spacing(gap) : theme.spacing(1),
    '& .MuiToggleButton-root': {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      minWidth: minWidth || 'unset',
      textTransform: 'none',
      borderRadius: '50px',
      border: `1px solid ${theme.palette.divider}`,
      '&.Mui-selected': {
        border: `1px solid ${theme.palette.primary.main}`,
      },
    },
  };
};

interface IShToggleButtonGroup {
  borderRadius?: number;
  minWidth?: string;
  variant?: 'default' | 'pill';
  buttonsGap?: number;
}

const StyledShToggleButtonGroup = styled(ToggleButtonGroup, {
  shouldForwardProp: prop => prop !== 'borderRadius' && prop !== 'minWidth' && prop !== 'variant' && prop !== 'buttonsGap',
})<IShToggleButtonGroup>(({ theme, borderRadius = ShBorderRadius, minWidth, variant = 'default', buttonsGap = 0 }) => ({
  ...(variant === 'default' ? ShToggleButtonGroupDefault(theme, borderRadius, minWidth) : ShToggleButtonGroupPill(theme, minWidth, buttonsGap)),
}));

type ShToggleButtonGroupProps = Omit<ToggleButtonGroupProps, 'onChange'> & {
  onChange?: (event: MouseEvent<HTMLElement>, value: any) => void;
} & IShToggleButtonGroup;

export const ShToggleButtonGroup = (props: ShToggleButtonGroupProps) => <StyledShToggleButtonGroup {...props} />;

const StyledShToggleButtonGroupV2 = styled(ToggleButtonGroup, {
  shouldForwardProp: prop => prop !== 'borderRadius' && prop !== 'minWidth' && prop !== 'variant' && prop !== 'buttonsGap',
})<IShToggleButtonGroup>(({ theme, borderRadius = ShBorderRadius, minWidth = 'auto', variant = 'default', buttonsGap = 0 }) => ({
  display: 'inline-flex',
  gap: buttonsGap,
  borderRadius,
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  boxShadow: `0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.2)'}`,

  '& .MuiToggleButtonGroup-grouped': {
    minWidth,
    padding: theme.spacing(1, 2),
    fontWeight: 500,
    transition: 'all 0.3s ease',
    textTransform: 'capitalize',
    border: 'none',
    color: theme.palette.text.primary,

    '&:not(:last-of-type)': {
      borderRight: `1px solid ${theme.palette.divider}`,
    },

    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },

    '&.Mui-selected': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      boxShadow: `inset 0 0 10px ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)'}`,
      fontWeight: 600,

      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },

    '&.Mui-disabled': {
      color: theme.palette.text.disabled,
      backgroundColor: theme.palette.action.disabledBackground,
    },
  },

  ...(variant === 'pill' && {
    borderRadius: '50px',
    boxShadow: `0px 3px 6px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.1)'}`,
  }),

  ...(variant === 'default' && {
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: 'transparent',
    '& .MuiToggleButtonGroup-grouped': {
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
}));

export const ShToggleButtonGroupV2 = (props: ShToggleButtonGroupProps) => <StyledShToggleButtonGroupV2 {...props} />;

const StyledShCheckbox = styled(Checkbox)(({ theme }) => ({
  '&:not(.Mui-checked)': {
    '& .MuiSvgIcon-root': {
      fill: theme.palette.mode === 'light' ? BorderColorLight : BorderColorDark,
    },
  },
  '&.Mui-checked': {
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main,
    },
  },
}));

export const ShCheckbox = (props: CheckboxProps) => <StyledShCheckbox {...props} />;

export const ShChipCheckbox = styled(Chip)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0.5, 1),
  borderRadius: '16px',
  border: `1px solid ${theme.palette.grey[400]}`, // White outlined border initially
  backgroundColor: theme.palette.background.paper, // Paper background for the chip
  color: theme.palette.text.primary, // Default text color
  transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.3s ease', // Smooth transition

  '&:hover': {
    backgroundColor: theme.palette.grey[100], // Light background on hover
    transform: 'scale(1.05)', // Slight scale effect on hover
  },

  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main, // Blue background when selected
    color: theme.palette.common.white, // White text when selected
    borderColor: theme.palette.primary.main, // Blue border when selected
  },

  '& .MuiChip-label': {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },

  // No checkbox is needed, so we style the entire chip as an interactive toggle
  '& .MuiCheckbox-root': {
    display: 'none', // Hide the checkbox component
  },

  '&:active': {
    transform: 'scale(1.05)', // Slight scale effect when clicked
  },
}));

const StyledShGreenCheckbox = styled(Checkbox)(({ theme }) => ({
  '&:not(.Mui-checked)': {
    '& .MuiSvgIcon-root': {
      fill: theme.palette.mode === 'light' ? BorderColorLight : BorderColorDark,
    },
  },
  '&.Mui-checked': {
    '& .MuiSvgIcon-root': {
      color: ShGreen,
    },
  },
}));

export const ShGreenCheckbox = (props: CheckboxProps) => <StyledShGreenCheckbox {...props} />;

export const SelectMenuProps = {
  PaperProps: {
    style: {
      maxHeight: '40%',
    },
  },
};

export const ShInputBase = styled(InputBase)(({ theme }) => ({
  '& input': {
    padding: '10px',
    '&:focus-visible, &:focus, &:active, &:hover': {
      backgroundColor: theme.palette.mode === 'light' ? 'whitesmoke' : BorderColorDark,
    },
  },
}));

export const ShTextareaWrapper = styled(Box)(({ theme }) => ({
  '& textarea': {
    minWidth: '100%',
    maxWidth: '100%',
    padding: theme.spacing(1),
    fontFamily: 'inherit',
    minHeight: '40px',
    borderRadius: '4px',
    '&:active, &:focus, &:focus-within': {
      borderColor: theme.palette.primary.main,
      outlineColor: theme.palette.primary.main,
    },
  },
}));

interface IShTextField {
  borderRadius?: string;
  maxWidth?: string;
}

const StyledShTextField = styled(TextField, {
  shouldForwardProp: prop => prop !== 'borderRadius' && prop !== 'maxWidth',
})<IShTextField>(({ theme, borderRadius = ShBorderRadius, maxWidth = 'unset' }) => ({
  '& .MuiOutlinedInput-root': {
    minHeight: '36px',
    borderRadius: borderRadius,
    maxWidth: maxWidth,
    '& .MuiOutlinedInput-input': {
      padding: '6px 12px',
      lineHeight: '1.5',
    },
    '& .phone-number': {
      border: 'none',
      outline: 'none !important',
      padding: '8px 14px',
      background: 'inherit',
      color: 'inherit',
    },
  },
  '& .MuiFormHelperText-root': {
    marginTop: '4px',
    fontSize: theme.typography.caption.fontSize,
    lineHeight: '1.2',
  },
}));

type ShTextFieldProps = {
  [key: string]: any;
  onChange?: (event: any) => void;
  onClick?: (event: any) => void;
  onBlur?: (event: any) => void;
  onFocus?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onKeyPress?: (event: any) => void;
} & IShTextField;

export const ShTextField = (props: ShTextFieldProps) => <StyledShTextField {...props} />;

const StyledShResizableTextField = styled(TextField)(({ theme }) => ({
  '& textarea': {
    resize: 'vertical', // Allows resizing only vertically
  },
}));

export const ShResizableTextField = (props: ShTextFieldProps) => <StyledShResizableTextField {...props} />;

interface IShRadioGroup {
  color?: string;
  width?: string;
}

const StyledShRadioGroup = styled(RadioGroup, {
  shouldForwardProp: prop => prop !== 'color' && prop !== 'width',
})<IShRadioGroup>(({ theme, color = theme.palette.primary.main, width = 'unset' }) => ({
  flexWrap: 'unset',
  '& .MuiFormControlLabel-label': {
    flex: 1,
  },
  '& label': {
    border: `2px solid ${theme.palette.mode === 'light' ? BorderColorLight : BorderColorDark}`,
    borderRadius: ShBorderRadius,
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginLeft: 0,
    marginRight: 0,
    marginBottom: theme.spacing(1),
    width: width,
    '&.selected': {
      borderColor: color,
      '& .MuiRadio-root.Mui-checked': {
        color: color,
      },
    },
  },
}));

type ShRadioGroupProps = Omit<RadioGroupProps, 'onChange'> & {
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
} & IShRadioGroup;

export const ShRadioGroup = (props: ShRadioGroupProps) => <StyledShRadioGroup {...props} />;

interface IShTextField {
  borderRadius?: string;
  maxWidth?: string;
  isResizable?: boolean;
  isReducedPadding?: boolean;
}

const StyledShTextFieldV2 = styled(TextField, {
  shouldForwardProp: prop => prop !== 'borderRadius' && prop !== 'maxWidth' && prop !== 'isResizable' && prop !== 'isReducedPadding',
})<IShTextField>(({ theme, borderRadius = '10px', maxWidth = 'unset', isResizable = false, isReducedPadding = false }) => ({
  '& .MuiOutlinedInput-root': {
    minHeight: '36px',
    borderRadius: borderRadius,
    maxWidth: maxWidth,
    transition: 'all 0.3s ease',
    '& fieldset': {
      border: `2px solid ${theme.palette.grey[400]}`,
      transition: 'all 0.3s ease',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
    },
    '& .MuiOutlinedInput-input': {
      color: theme.palette.text.primary,
    },
    '& .phone-number': {
      border: 'none',
      outline: 'none !important',
      padding: '8px 14px',
      background: 'inherit',
      color: 'inherit',
    },
  },
  '& .MuiFormLabel-root': {
    fontWeight: 500,
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
    '&.MuiFormLabel-animated': {
      transform: 'translate(14px, 6px) scale(1)',
    },
  },
  '& textarea': {
    resize: isResizable ? 'vertical' : 'none',
  },
}));

type ShTextFieldV2Props = {
  [key: string]: any;
  onChange?: (event: any) => void;
  onClick?: (event: any) => void;
  onBlur?: (event: any) => void;
  onFocus?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onKeyPress?: (event: any) => void;
} & IShTextField;

export const ShTextFieldV2 = (props: ShTextFieldV2Props) => <StyledShTextFieldV2 {...props} />;

const StyledShDatePickerV2 = styled(DatePicker, {
  shouldForwardProp: prop => prop !== 'borderRadius' && prop !== 'maxWidth' && prop !== 'isResizable' && prop !== 'isReducedPadding',
})<IShTextField>(({ theme, borderRadius = '10px', maxWidth = 'unset', isResizable = false, isReducedPadding = false }) => ({
  '& .MuiOutlinedInput-root': {
    minHeight: '40px',
    borderRadius: borderRadius,
    maxWidth: maxWidth,
    transition: 'all 0.3s ease',
    '& fieldset': {
      border: `2px solid ${theme.palette.grey[400]}`,
      transition: 'all 0.3s ease',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '2px',
    },
    '& .MuiOutlinedInput-input': {
      color: theme.palette.text.primary,
    },
  },
  '& .MuiFormLabel-root': {
    fontWeight: 500,
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.text.primary, // Calendar icon color
  },
  '& textarea': {
    resize: isResizable ? 'vertical' : 'none',
  },
}));

type ShDatePickerV2Props<TDate> = Omit<DatePickerProps<TDate>, 'onChange' | 'shouldDisableDate' | 'shouldDisableMonth' | 'shouldDisableYear'> & {
  onChange?: (value: TDate | null, context?: unknown) => void;
  shouldDisableDate?: (day: TDate) => boolean;
  shouldDisableMonth?: (month: TDate) => boolean;
  shouldDisableYear?: (year: TDate) => boolean;
} & IShTextField;

export const ShDatePickerV2 = <TDate,>(props: ShDatePickerV2Props<TDate>) => <StyledShDatePickerV2 {...(props as DatePickerProps<unknown> & IShTextField)} />;

interface IShFormControlLabel {
  onHoverBackground?: string;
}

export const ShFormControlLabel = styled(FormControlLabel, {
  shouldForwardProp: prop => prop !== 'IShFormControlLabel',
})<IShFormControlLabel>(({ theme, onHoverBackground }) => ({
  paddingLeft: onHoverBackground ? theme.spacing(1) : 0,
  paddingRight: onHoverBackground ? theme.spacing(1) : 0,
  '&:hover': {
    backgroundColor: onHoverBackground,
  },
}));
