import type { ChangeEvent, MouseEvent } from 'react';
import { Box, Checkbox, CheckboxProps, Chip, CircularProgress, FormControlLabel, InputBase, RadioGroup, RadioGroupProps, TextField, ToggleButtonGroup, ToggleButtonGroupProps } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { BorderColorDark, BorderColorLight, ShBorderRadius, ShGreen } from './styleConstants';

/** @deprecated Import from StyledActionButton / package root instead. */
export { getContrastTextColor } from '../SharedComponents/StyledActionButton';

export const AutocompletePopoverProps = { style: { maxHeight: '250px' } };

export const AutocompleteLoaders = styled(CircularProgress)(({ theme }) => ({
  marginRight: '30px',
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
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
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
  /** `compact` = desk forms/tables; `dense` = shortest height (login, tight layouts). */
  density?: 'default' | 'compact' | 'dense';
}

const shTextFieldShouldForwardProp = (prop: PropertyKey) =>
  !['borderRadius', 'maxWidth', 'isResizable', 'isReducedPadding', 'density'].includes(String(prop));

const shTextFieldDensityStyles = (density: IShTextField['density']) => {
  switch (density) {
    case 'dense':
      return {
        resolvedRadius: '6px',
        borderWidth: '1px',
        minHeight: '28px',
        inputFontSize: '13px',
        inputPadding: '4px 10px',
        multilinePadding: '6px 10px',
        selectPaddingY: '4px',
        labelTransform: 'translate(10px, 4px) scale(1)',
        phonePadding: '4px 10px',
      };
    case 'compact':
      return {
        resolvedRadius: '6px',
        borderWidth: '1px',
        minHeight: '32px',
        inputFontSize: '13px',
        inputPadding: '6px 10px',
        multilinePadding: '8px 10px',
        selectPaddingY: '6px',
        labelTransform: 'translate(10px, 6px) scale(1)',
        phonePadding: '6px 10px',
      };
    default:
      return {
        resolvedRadius: '10px',
        borderWidth: '2px',
        minHeight: '36px',
        inputFontSize: undefined as string | undefined,
        inputPadding: undefined as string | undefined,
        multilinePadding: undefined as string | undefined,
        selectPaddingY: undefined as string | undefined,
        labelTransform: 'translate(14px, 6px) scale(1)',
        phonePadding: '8px 14px',
      };
  }
};

const StyledShTextFieldV2 = styled(TextField, {
  shouldForwardProp: shTextFieldShouldForwardProp,
})<IShTextField>(({ theme, borderRadius, maxWidth = 'unset', isResizable = false, density = 'default' }) => {
  const d = shTextFieldDensityStyles(density);
  const isReduced = density === 'compact' || density === 'dense';
  const resolvedRadius = borderRadius ?? d.resolvedRadius;

  return {
    '&.sh-text-field-v2': {
      '& .MuiOutlinedInput-root': {
        minHeight: d.minHeight,
        borderRadius: resolvedRadius,
        maxWidth,
        transition: 'all 0.3s ease',
        '& fieldset, & .MuiOutlinedInput-notchedOutline': {
          border: `${d.borderWidth} solid ${theme.palette.grey[400]}`,
          transition: 'all 0.3s ease',
        },
        '&:hover fieldset, &:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.main,
        },
        '&.Mui-focused fieldset, &.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.main,
          borderWidth: d.borderWidth,
        },
        '& .MuiOutlinedInput-input, & .MuiOutlinedInput-inputSizeSmall': {
          color: theme.palette.text.primary,
          ...(d.inputFontSize && { fontSize: d.inputFontSize, padding: d.inputPadding }),
        },
        '& .MuiOutlinedInput-inputMultiline': {
          ...(d.inputFontSize && { fontSize: d.inputFontSize, padding: d.multilinePadding }),
        },
        '& .MuiSelect-select': {
          ...(d.inputFontSize && {
            fontSize: d.inputFontSize,
            minHeight: 'unset !important',
            paddingTop: d.selectPaddingY,
            paddingBottom: d.selectPaddingY,
          }),
        },
        '& .MuiInputAdornment-root': {
          ...(isReduced && { '& .MuiSvgIcon-root': { fontSize: '18px' } }),
        },
        '& .phone-number': {
          border: 'none',
          outline: 'none !important',
          padding: d.phonePadding,
          background: 'inherit',
          color: 'inherit',
        },
      },
      '& .MuiFormLabel-root': {
        fontWeight: 400,
        color: theme.palette.text.secondary,
        display: 'flex',
        alignItems: 'center',
        marginBottom: 0,
        ...(d.inputFontSize && { fontSize: d.inputFontSize }),
        '&.Mui-focused': {
          color: theme.palette.primary.main,
        },
        // Static in-field label for text inputs; allow MUI shrink for date/select when InputLabelProps.shrink is set.
        '&.MuiFormLabel-animated:not(.MuiInputLabel-shrink)': {
          transform: d.labelTransform,
        },
      },
      '& .MuiFormHelperText-root': {
        ...(isReduced && { fontSize: '11px', marginTop: '4px' }),
      },
      '& textarea': {
        resize: isResizable ? 'vertical' : 'none',
      },
    },
  };
});

type ShTextFieldV2Props = {
  [key: string]: any;
  density?: 'default' | 'compact' | 'dense';
  onChange?: (event: any) => void;
  onClick?: (event: any) => void;
  onBlur?: (event: any) => void;
  onFocus?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onKeyPress?: (event: any) => void;
} & IShTextField;

export const ShTextFieldV2 = ({ density = 'default', size, className, helperText, ...props }: ShTextFieldV2Props) => {
  const normalizedHelperText =
    helperText == null || (typeof helperText === 'string' && helperText.trim() === '') ? undefined : helperText;

  return (
    <StyledShTextFieldV2
      density={density}
      size={size ?? (density === 'default' ? undefined : 'small')}
      className={['sh-text-field-v2', className].filter(Boolean).join(' ')}
      helperText={normalizedHelperText}
      {...props}
    />
  );
};

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
