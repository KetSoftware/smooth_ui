import type { ReactNode } from 'react';
import { Autocomplete, AutocompleteProps } from '@mui/material';
import type {
  AutocompleteValue,
} from '@mui/material/Autocomplete';
import type { AutocompleteFreeSoloValueMapping } from '@mui/material/useAutocomplete';
import { ShTextFieldV2, AutocompletePopoverProps } from '../shStyleExports';

type BaseAutocompleteProps<T, Multiple extends boolean | undefined, DisableClearable extends boolean | undefined, FreeSolo extends boolean | undefined> = AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>;
type ShTypeaheadOption<T, FreeSolo extends boolean | undefined> = T | AutocompleteFreeSoloValueMapping<FreeSolo>;

type ShTypeaheadSharedProps<T, DisableClearable extends boolean | undefined, FreeSolo extends boolean | undefined> = {
  label?: string;
  placeholder?: string;
  helperText?: string;
  renderInput?: (params: any) => ReactNode;
  onInputChange?: (event: any, value: string, reason: any) => void;
  getOptionLabel?: (option: ShTypeaheadOption<T, FreeSolo>) => string;
  isOptionEqualToValue?: (option: T, value: T) => boolean;
};

type ShSingleTypeaheadProps<T, DisableClearable extends boolean | undefined, FreeSolo extends boolean | undefined> = Omit<AutocompleteProps<T, false, DisableClearable, FreeSolo>, 'renderInput' | 'onChange' | 'onInputChange' | 'getOptionLabel' | 'isOptionEqualToValue' | 'renderOption'> & ShTypeaheadSharedProps<T, DisableClearable, FreeSolo> & {
  multiple?: false;
  value?: AutocompleteValue<T, false, DisableClearable, FreeSolo>;
  defaultValue?: AutocompleteValue<T, false, DisableClearable, FreeSolo>;
  onChange?: (event: any, value: AutocompleteValue<T, false, DisableClearable, FreeSolo>, reason: any, details?: any) => void;
  renderOption?: (props: any, option: T, state: any, ownerState: any) => ReactNode;
};

type ShMultiTypeaheadProps<T, DisableClearable extends boolean | undefined, FreeSolo extends boolean | undefined> = Omit<AutocompleteProps<T, true, DisableClearable, FreeSolo>, 'renderInput' | 'onChange' | 'onInputChange' | 'getOptionLabel' | 'isOptionEqualToValue' | 'renderOption'> & ShTypeaheadSharedProps<T, DisableClearable, FreeSolo> & {
  multiple: true;
  value?: Array<ShTypeaheadOption<T, FreeSolo>>;
  defaultValue?: Array<ShTypeaheadOption<T, FreeSolo>>;
  onChange?: (event: any, value: Array<ShTypeaheadOption<T, FreeSolo>>, reason: any, details?: any) => void;
  renderOption?: (props: any, option: T, state: any, ownerState: any) => ReactNode;
};

export function ShTypeahead<T, Multiple extends false = false, DisableClearable extends boolean | undefined = false, FreeSolo extends boolean | undefined = false>(props: ShSingleTypeaheadProps<T, DisableClearable, FreeSolo>): JSX.Element;
export function ShTypeahead<T, Multiple extends true = true, DisableClearable extends boolean | undefined = false, FreeSolo extends boolean | undefined = false>(props: ShMultiTypeaheadProps<T, DisableClearable, FreeSolo>): JSX.Element;
export function ShTypeahead<T, Multiple extends boolean | undefined = false, DisableClearable extends boolean | undefined = false, FreeSolo extends boolean | undefined = false>({ label, placeholder, helperText, ListboxProps, renderInput, ...rest }: ShSingleTypeaheadProps<T, DisableClearable, FreeSolo> | ShMultiTypeaheadProps<T, DisableClearable, FreeSolo>) {
  const listboxProps = ListboxProps || AutocompletePopoverProps;
  return <Autocomplete {...(rest as BaseAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>)} ListboxProps={listboxProps} renderInput={renderInput || (params => <ShTextFieldV2 {...params} label={label} placeholder={placeholder} helperText={helperText} fullWidth size='small' />)} />;
}
