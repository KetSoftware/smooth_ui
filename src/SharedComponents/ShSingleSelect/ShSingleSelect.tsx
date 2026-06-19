import type { ChangeEvent, KeyboardEvent, MouseEvent, ReactElement, ReactNode } from 'react';
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Chip,
  ClickAwayListener,
  CircularProgress,
  FormHelperText,
  IconButton,
  InputAdornment,
  Popper,
  Stack,
  Typography,
} from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { PrimaryThemeColor } from '../../SharedStyles/styleConstants';
import { ShTextFieldV2 } from '../../shStyleExports';
import type { ShMultiSelectOption } from '../ShMultiSelect/ShMultiSelect';

export type ShSingleSelectProps<T extends string | number = string | number> = {
  label?: string;
  placeholder?: string;
  helperText?: string;
  options: ShMultiSelectOption<T>[];
  value: T | null;
  onChange: (value: T | null) => void;
  /** Async search: type in the main field (default when set). */
  onSearchChange?: (query: string) => void;
  inputValue?: string;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  id?: string;
  minSearchLength?: number;
  /** `input` — type in the main field; `panel` — search box inside dropdown (static lists). */
  searchPlacement?: 'input' | 'panel';
  renderOptionStart?: (option: ShMultiSelectOption<T>) => ReactNode;
  renderValueAvatar?: (option: ShMultiSelectOption<T>) => ReactElement | null;
  emptyMessage?: string;
  noResultsMessage?: string;
  loadingMessage?: string;
};

const outlinedBorderSx = (active: boolean, showFocusRing: boolean) => ({
  transition: 'box-shadow 0.2s ease',
  '& fieldset': {
    borderWidth: '2px',
  },
  '&:hover fieldset': {
    borderColor: `${PrimaryThemeColor} !important`,
  },
  ...(active
    ? {
        '& fieldset': {
          borderColor: `${PrimaryThemeColor} !important`,
        },
        ...(showFocusRing
          ? {
              boxShadow: `0 0 0 3px ${alpha(PrimaryThemeColor, 0.16)}`,
            }
          : {}),
      }
    : {}),
});

const DropdownPanel = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  borderRadius: 10,
  border: `2px solid ${theme.palette.grey[400]}`,
  backgroundColor: theme.palette.background.paper,
  overflow: 'hidden',
  boxShadow: theme.palette.mode === 'light' ? '0 8px 24px rgba(15, 23, 42, 0.12)' : '0 12px 32px rgba(0, 0, 0, 0.45)',
  minWidth: 280,
}));

const OptionRow = styled(Box, {
  shouldForwardProp: prop => prop !== 'selected' && prop !== 'disabled',
})<{ selected?: boolean; disabled?: boolean }>(({ theme, selected, disabled }) => {
  const softBlue = alpha(PrimaryThemeColor, theme.palette.mode === 'light' ? 0.09 : 0.16);
  const softBlueHover = alpha(PrimaryThemeColor, theme.palette.mode === 'light' ? 0.14 : 0.22);
  const softBlueHoverIdle = alpha(PrimaryThemeColor, theme.palette.mode === 'light' ? 0.05 : 0.1);

  return {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(0.75, 1.25),
    borderRadius: 8,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'background-color 0.18s ease',
    backgroundColor: selected ? softBlue : 'transparent',
    '&:hover': {
      backgroundColor: disabled ? 'transparent' : selected ? softBlueHover : softBlueHoverIdle,
    },
  };
});

export function ShSingleSelect<T extends string | number = string | number>({
  label,
  placeholder = 'Search and select',
  helperText,
  options,
  value,
  onChange,
  onSearchChange,
  inputValue,
  loading = false,
  disabled = false,
  fullWidth = true,
  id,
  minSearchLength = 2,
  searchPlacement,
  renderOptionStart,
  renderValueAvatar,
  emptyMessage = 'No options available',
  noResultsMessage = 'No matches found',
  loadingMessage = 'Searching...',
}: ShSingleSelectProps<T>) {
  const theme = useTheme();
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [internalSearch, setInternalSearch] = useState('');

  const resolvedSearchPlacement = searchPlacement ?? (onSearchChange ? 'input' : 'panel');
  const searchInMainInput = resolvedSearchPlacement === 'input';
  const search = inputValue ?? internalSearch;

  const optionMap = useMemo(() => new Map(options.map(o => [o.value, o])), [options]);
  const selectedOption = value != null ? optionMap.get(value) : undefined;

  const setSearch = useCallback(
    (next: string) => {
      setInternalSearch(next);
      onSearchChange?.(next);
    },
    [onSearchChange]
  );

  const close = useCallback(() => {
    setOpen(false);
    setFocused(false);
  }, []);

  useEffect(() => {
    if (!searchInMainInput && !open) {
      setInternalSearch('');
    }
  }, [open, searchInMainInput]);

  useEffect(() => {
    if (!searchInMainInput) {
      onSearchChange?.(internalSearch);
    }
  }, [internalSearch, onSearchChange, searchInMainInput]);

  const handleSelect = (optionValue: T) => {
    if (disabled) return;
    onChange(optionValue);
    close();
  };

  const handleClearSearch = (event: MouseEvent) => {
    event.stopPropagation();
    if (disabled) return;
    setSearch('');
    if (value != null) onChange(null);
    inputRef.current?.focus();
  };

  const handleClearSelection = (event: MouseEvent) => {
    event.stopPropagation();
    if (disabled) return;
    onChange(null);
  };

  const isTriggerActive = open || focused;
  const showFocusRing = isTriggerActive && !open;
  const searchTrimmed = search.trim();
  const showMinLengthHint = searchTrimmed.length > 0 && searchTrimmed.length < minSearchLength;

  const chipAvatar = selectedOption ? renderValueAvatar?.(selectedOption) ?? null : null;
  const chipSx = {
    height: chipAvatar ? 28 : 24,
    borderRadius: '6px',
    fontWeight: 500,
    backgroundColor: alpha(PrimaryThemeColor, theme.palette.mode === 'light' ? 0.1 : 0.18),
    color: PrimaryThemeColor,
    border: `1px solid ${alpha(PrimaryThemeColor, 0.24)}`,
    '& .MuiChip-avatar': {
      width: 20,
      height: 20,
      marginLeft: theme.spacing(0.5),
    },
    '& .MuiChip-deleteIcon': {
      color: alpha(PrimaryThemeColor, 0.65),
      '&:hover': { color: PrimaryThemeColor },
    },
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') close();
  };

  const listContent = () => {
    if (loading) {
      return (
        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1} px={1.5} py={2}>
          <CircularProgress size={18} />
          <Typography variant='body2' color='text.secondary'>{loadingMessage}</Typography>
        </Stack>
      );
    }
    if (showMinLengthHint) {
      return (
        <Typography variant='body2' color='text.secondary' px={1.5} py={2} textAlign='center'>
          Type at least {minSearchLength} characters
        </Typography>
      );
    }
    if (options.length === 0) {
      return (
        <Typography variant='body2' color='text.secondary' px={1.5} py={2} textAlign='center'>
          {searchTrimmed ? noResultsMessage : emptyMessage}
        </Typography>
      );
    }
    return options.map(option => {
      const selected = value === option.value;
      return (
        <OptionRow
          key={String(option.value)}
          role='option'
          aria-selected={selected}
          selected={selected}
          disabled={option.disabled}
          onMouseDown={(e: MouseEvent) => e.preventDefault()}
          onClick={() => !option.disabled && handleSelect(option.value)}
        >
          {renderOptionStart?.(option)}
          <Box minWidth={0} flex={1}>
            <Typography variant='body2' fontWeight={selected ? 600 : 500} noWrap color={selected ? PrimaryThemeColor : 'text.primary'}>
              {option.label}
            </Typography>
            {option.secondaryLabel && (
              <Typography variant='caption' color='text.secondary' noWrap>
                {option.secondaryLabel}
              </Typography>
            )}
          </Box>
        </OptionRow>
      );
    });
  };

  const endAdornment = (
    <InputAdornment position='end' sx={{ alignSelf: 'center' }}>
      <Stack direction='row' alignItems='center' spacing={0.25}>
        {searchInMainInput && searchTrimmed ? (
          <IconButton size='small' onMouseDown={(e: MouseEvent) => e.preventDefault()} onClick={handleClearSearch} edge='end' aria-label='Clear search'>
            <CloseIcon fontSize='small' />
          </IconButton>
        ) : null}
        <ArrowDropDownIcon
          sx={{
            transform: `rotate(${open ? 180 : 0}deg)`,
            transition: 'transform 0.2s ease',
            color: 'text.secondary',
            cursor: disabled ? 'default' : 'pointer',
          }}
          onMouseDown={(e: MouseEvent) => {
            e.preventDefault();
            if (!disabled) {
              setOpen(prev => !prev);
              inputRef.current?.focus();
            }
          }}
        />
      </Stack>
    </InputAdornment>
  );

  return (
    <ClickAwayListener onClickAway={close}>
      <Box width={fullWidth ? '100%' : 'auto'} id={fieldId}>
        <Box ref={anchorRef}>
          {searchInMainInput ? (
            <ShTextFieldV2
              inputRef={inputRef}
              label={label}
              placeholder={placeholder}
              fullWidth={fullWidth}
              size='small'
              variant='outlined'
              disabled={disabled}
              focused={isTriggerActive}
              value={search}
              role='combobox'
              aria-expanded={open}
              aria-haspopup='listbox'
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setSearch(e.target.value);
                if (!disabled) setOpen(true);
              }}
              onFocus={() => {
                setFocused(true);
                setOpen(true);
              }}
              onBlur={() => {
                if (!open) setFocused(false);
              }}
              onKeyDown={handleKeyDown}
              InputLabelProps={{
                shrink: Boolean(label),
                sx: isTriggerActive ? { color: `${PrimaryThemeColor} !important` } : undefined,
              }}
              InputProps={{
                sx: outlinedBorderSx(isTriggerActive, showFocusRing),
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon fontSize='small' color='action' />
                  </InputAdornment>
                ),
                endAdornment,
              }}
            />
          ) : (
            <ShTextFieldV2
              label={label}
              fullWidth={fullWidth}
              size='small'
              variant='outlined'
              disabled={disabled}
              focused={isTriggerActive}
              value=''
              role='combobox'
              aria-expanded={open}
              aria-haspopup='listbox'
              onClick={() => {
                if (disabled) return;
                setOpen(prev => !prev);
                setFocused(true);
              }}
              onKeyDown={handleKeyDown}
              onBlur={() => {
                if (!open) setFocused(false);
              }}
              onFocus={() => setFocused(true)}
              InputLabelProps={{
                shrink: Boolean(label),
                sx: isTriggerActive ? { color: `${PrimaryThemeColor} !important` } : undefined,
              }}
              InputProps={{
                readOnly: true,
                sx: outlinedBorderSx(isTriggerActive, showFocusRing),
                startAdornment: (
                  <Box display='flex' flexWrap='wrap' alignItems='center' flex={1} minHeight={24} py={0.25} mr={0.5} sx={{ overflow: 'visible' }}>
                    {selectedOption ? (
                      <Chip
                        label={selectedOption.label}
                        size='small'
                        avatar={chipAvatar ?? undefined}
                        onDelete={disabled ? undefined : handleClearSelection}
                        deleteIcon={<CloseIcon fontSize='small' />}
                        onMouseDown={(e: MouseEvent) => e.stopPropagation()}
                        sx={chipSx}
                      />
                    ) : (
                      <Typography variant='body2' color='text.secondary' noWrap sx={{ py: 0.25, lineHeight: 1.5 }}>
                        {placeholder}
                      </Typography>
                    )}
                  </Box>
                ),
                endAdornment,
              }}
              inputProps={{ readOnly: true, tabIndex: disabled ? -1 : 0 }}
              sx={{
                '&& .MuiOutlinedInput-root': {
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  overflow: 'visible',
                },
                '&& .MuiOutlinedInput-input': {
                  width: 0,
                  minWidth: 0,
                  padding: '0 !important',
                  opacity: 0,
                },
              }}
            />
          )}
        </Box>

        {helperText && (
          <FormHelperText sx={{ mx: 1.75, mt: 0.5, mb: 0, lineHeight: 1.4 }}>{helperText}</FormHelperText>
        )}

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement='bottom-start'
          style={{ zIndex: theme.zIndex.modal }}
          modifiers={[{ name: 'offset', options: { offset: [0, 4] } }]}
        >
          <DropdownPanel sx={{ width: anchorRef.current?.offsetWidth ?? 320 }}>
            {!searchInMainInput && (
              <Box px={1.25} pt={1.25} pb={0.5}>
                <ShTextFieldV2
                  size='small'
                  fullWidth
                  placeholder='Search...'
                  value={internalSearch}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setInternalSearch(e.target.value)}
                  onMouseDown={(e: MouseEvent) => e.stopPropagation()}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SearchIcon fontSize='small' color='action' />
                      </InputAdornment>
                    ),
                    endAdornment: internalSearch ? (
                      <InputAdornment position='end'>
                        <IconButton size='small' onClick={() => setInternalSearch('')} edge='end' aria-label='Clear search'>
                          <CloseIcon fontSize='small' />
                        </IconButton>
                      </InputAdornment>
                    ) : undefined,
                  }}
                />
              </Box>
            )}
            <Box role='listbox' maxHeight={240} overflow='auto' p={0.75}>
              {listContent()}
            </Box>
          </DropdownPanel>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}
