import { Autocomplete, AutocompleteProps } from '@mui/material';
import { ShTextFieldV2, AutocompletePopoverProps } from '../shStyleExports';

type ShTypeaheadProps<T, Multiple extends boolean | undefined, DisableClearable extends boolean | undefined, FreeSolo extends boolean | undefined> = Omit<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'> & {
  label?: string;
  placeholder?: string;
  helperText?: string;
  renderInput?: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>['renderInput'];
};

export const ShTypeahead = <T, Multiple extends boolean | undefined = false, DisableClearable extends boolean | undefined = false, FreeSolo extends boolean | undefined = false>({ label, placeholder, helperText, ListboxProps, renderInput, ...rest }: ShTypeaheadProps<T, Multiple, DisableClearable, FreeSolo>) => {
  const listboxProps = ListboxProps || AutocompletePopoverProps;
  return <Autocomplete {...rest} ListboxProps={listboxProps} renderInput={renderInput || (params => <ShTextFieldV2 {...params} label={label} placeholder={placeholder} helperText={helperText} fullWidth size='small' />)} />;
};
