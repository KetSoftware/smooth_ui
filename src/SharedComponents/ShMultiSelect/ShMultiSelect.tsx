import type { ChangeEvent, KeyboardEvent, MouseEvent, ReactElement, ReactNode } from 'react';
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Chip, ClickAwayListener, FormHelperText, Grow, IconButton, InputAdornment, Popper, Stack, Typography } from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { TransitionGroup } from 'react-transition-group';
import { PrimaryThemeColor } from '../../SharedStyles/styleConstants';
import { ShCheckbox, ShTextFieldV2 } from '../../shStyleExports';

export type ShMultiSelectOption<T extends string | number = string | number> = {
  value: T;
  label: string;
  disabled?: boolean;
  secondaryLabel?: string;
};

export type ShMultiSelectProps<T extends string | number = string | number> = {
  label?: string;
  placeholder?: string;
  helperText?: string;
  options: ShMultiSelectOption<T>[];
  value: T[];
  onChange: (value: T[]) => void;
  disabled?: boolean;
  size?: 'small' | 'medium';
  /** Show search field. `'auto'` enables when there are more than 5 options. Default: `'auto'`. */
  showSearch?: boolean | 'auto';
  /** Show select-all / clear actions. Default: true when more than 2 options. */
  showSelectAll?: boolean;
  /** Max chips shown in the trigger before collapsing to "+N more". Default: 3. */
  maxVisibleChips?: number;
  renderOptionStart?: (option: ShMultiSelectOption<T>, selected: boolean) => ReactNode;
  /** Optional avatar/icon shown on selected chips in the trigger (e.g. profile photo). */
  renderChipAvatar?: (option: ShMultiSelectOption<T>) => ReactElement | null;
  emptyMessage?: string;
  noResultsMessage?: string;
  id?: string;
  fullWidth?: boolean;
  /**
   * `dropdown` — compact trigger + popover (best for long lists).
   * `inline` — always-visible checklist in a bordered panel (best for a few options, e.g. brands).
   */
  displayMode?: 'dropdown' | 'inline';
};

/** Same blue as ShTextFieldV2 hover/focus — applied on OutlinedInput root via InputProps.sx */
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

const CHIP_TRANSITION_MS = 280;

const ChipShell = styled(Box)(() => ({
  display: 'inline-flex',
}));

const PanelRoot = styled(Box)(({ theme }) => ({
  borderRadius: 10,
  border: `2px solid ${theme.palette.grey[400]}`,
  backgroundColor: theme.palette.background.paper,
  overflow: 'hidden',
}));

const DropdownPanel = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  borderRadius: 10,
  border: `2px solid ${theme.palette.grey[400]}`,
  backgroundColor: theme.palette.background.paper,
  overflow: 'hidden',
  boxShadow: theme.palette.mode === 'light' ? '0 8px 24px rgba(15, 23, 42, 0.12)' : '0 12px 32px rgba(0, 0, 0, 0.45)',
  minWidth: 280,
}));

const InlinePanel = styled(PanelRoot)(() => ({
  width: '100%',
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

const ActionLink = styled('button')(({ theme }) => ({
  border: 'none',
  background: 'none',
  padding: 0,
  font: 'inherit',
  fontSize: '0.75rem',
  fontWeight: 600,
  color: theme.palette.primary.main,
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
  '&:disabled': {
    color: theme.palette.text.disabled,
    cursor: 'not-allowed',
    textDecoration: 'none',
  },
}));

export function ShMultiSelect<T extends string | number = string | number>({
  label,
  placeholder = 'Select options',
  helperText,
  options,
  value,
  onChange,
  disabled = false,
  showSearch = 'auto',
  showSelectAll,
  maxVisibleChips = 3,
  renderOptionStart,
  renderChipAvatar,
  emptyMessage = 'No options available',
  noResultsMessage = 'No matches found',
  id,
  fullWidth = true,
  displayMode = 'dropdown',
}: ShMultiSelectProps<T>) {
  const theme = useTheme();
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState('');

  const optionMap = useMemo(() => new Map(options.map(o => [o.value, o])), [options]);
  const selectedOptions = useMemo(() => value.map(v => optionMap.get(v)).filter(Boolean) as ShMultiSelectOption<T>[], [value, optionMap]);

  const searchEnabled = showSearch === true || (showSearch === 'auto' && options.length > 5);
  const selectAllEnabled = showSelectAll ?? options.length > 2;

  const filteredOptions = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return options;
    return options.filter(o => o.label.toLowerCase().includes(q) || o.secondaryLabel?.toLowerCase().includes(q));
  }, [options, search]);

  const selectableFiltered = filteredOptions.filter(o => !o.disabled);
  const allFilteredSelected = selectableFiltered.length > 0 && selectableFiltered.every(o => value.includes(o.value));

  const close = useCallback(() => {
    setOpen(false);
    setFocused(false);
    setSearch('');
  }, []);

  useEffect(() => {
    if (!open) setSearch('');
  }, [open]);

  const toggleValue = (optionValue: T) => {
    if (disabled) return;
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const handleSelectAll = () => {
    if (disabled) return;
    const next = new Set(value);
    selectableFiltered.forEach(o => next.add(o.value));
    onChange([...next]);
  };

  const handleClear = () => {
    if (disabled) return;
    if (searchEnabled && search.trim()) {
      const filteredValues = new Set(selectableFiltered.map(o => o.value));
      onChange(value.filter(v => !filteredValues.has(v)));
      return;
    }
    onChange([]);
  };

  const handleRemoveChip = (event: MouseEvent, optionValue: T) => {
    event.stopPropagation();
    if (disabled) return;
    onChange(value.filter(v => v !== optionValue));
  };

  const visibleChips = selectedOptions.slice(0, maxVisibleChips);
  const hiddenChipCount = Math.max(0, selectedOptions.length - maxVisibleChips);

  const chipSx = (hasAvatar: boolean) => ({
    height: hasAvatar ? 28 : 24,
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
  });

  const renderChips = () => {
    const chipTransitions = [
      ...visibleChips.map(option => {
        const chipAvatar = renderChipAvatar?.(option) ?? null;
        return (
          <Grow key={String(option.value)} appear timeout={CHIP_TRANSITION_MS} style={{ transformOrigin: '0 50% 0' }}>
            <ChipShell>
              <Chip
                label={option.label}
                size='small'
                avatar={chipAvatar ?? undefined}
                onDelete={disabled ? undefined : (e: MouseEvent) => handleRemoveChip(e, option.value)}
                deleteIcon={<CloseIcon fontSize='small' />}
                onMouseDown={(e: MouseEvent) => e.stopPropagation()}
                sx={chipSx(Boolean(chipAvatar))}
              />
            </ChipShell>
          </Grow>
        );
      }),
      ...(hiddenChipCount > 0
        ? [
            <Grow key={`more-${hiddenChipCount}`} appear timeout={CHIP_TRANSITION_MS} style={{ transformOrigin: '0 50% 0' }}>
              <ChipShell>
                <Chip
                  label={`+${hiddenChipCount} more`}
                  size='small'
                  sx={{
                    height: 24,
                    borderRadius: '6px',
                    fontWeight: 600,
                    backgroundColor: theme.palette.action.selected,
                  }}
                />
              </ChipShell>
            </Grow>,
          ]
        : []),
    ];

    if (!selectedOptions.length && placeholder) {
      return (
        <Typography variant='body2' color='text.secondary' noWrap sx={{ py: 0.25, lineHeight: 1.5 }}>
          {placeholder}
        </Typography>
      );
    }

    // Keep TransitionGroup mounted (even when empty) so the first chip animates in on add.
    return (
      <TransitionGroup component={Box} sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, alignItems: 'center', minHeight: label ? 24 : 0 }}>
        {chipTransitions}
      </TransitionGroup>
    );
  };

  const renderOptionList = (listOptions: ShMultiSelectOption<T>[], listId?: string) => (
    <Box role='listbox' id={listId} aria-multiselectable='true' maxHeight={displayMode === 'inline' ? undefined : 240} overflow={displayMode === 'inline' ? 'visible' : 'auto'} p={0.75}>
      {listOptions.length === 0 ? (
        <Typography variant='body2' color='text.secondary' px={1.5} py={2} textAlign='center'>
          {options.length === 0 ? emptyMessage : noResultsMessage}
        </Typography>
      ) : (
        listOptions.map(option => {
          const selected = value.includes(option.value);
          return (
            <OptionRow
              key={String(option.value)}
              role='option'
              aria-selected={selected}
              selected={selected}
              disabled={option.disabled}
              onClick={() => !option.disabled && toggleValue(option.value)}
            >
              <ShCheckbox size='small' checked={selected} disabled={option.disabled} tabIndex={-1} sx={{ p: 0.25 }} />
              {renderOptionStart?.(option, selected)}
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
        })
      )}
    </Box>
  );

  const renderActionsBar = () =>
    selectAllEnabled ? (
      <Stack direction='row' alignItems='center' justifyContent='space-between' px={1.5} py={0.75} borderBottom={1} borderColor='divider'>
        <Typography variant='caption' color='text.secondary' fontWeight={600}>
          {value.length} selected
        </Typography>
        <Stack direction='row' spacing={1.5}>
          <ActionLink type='button' disabled={disabled || selectableFiltered.length === 0} onClick={allFilteredSelected ? handleClear : handleSelectAll}>
            {allFilteredSelected ? 'Clear visible' : 'Select all'}
          </ActionLink>
          {value.length > 0 && (
            <ActionLink type='button' disabled={disabled} onClick={handleClear}>
              Clear all
            </ActionLink>
          )}
        </Stack>
      </Stack>
    ) : null;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') close();
    if ((event.key === 'Enter' || event.key === ' ') && !open) {
      event.preventDefault();
      if (!disabled) {
        setOpen(true);
        setFocused(true);
      }
    }
  };

  if (displayMode === 'inline') {
    return (
      <Box width={fullWidth ? '100%' : 'auto'} id={fieldId}>
        <Stack spacing={0.75}>
          {label && (
            <Typography variant='body2' fontWeight={600} color='text.primary'>
              {label}
            </Typography>
          )}
          {helperText && (
            <Typography variant='caption' color='text.secondary' lineHeight={1.4}>
              {helperText}
            </Typography>
          )}
          <InlinePanel>
            {renderActionsBar()}
            {renderOptionList(options)}
          </InlinePanel>
        </Stack>
      </Box>
    );
  }

  const isTriggerActive = open || focused;
  const showFocusRing = isTriggerActive && !open;

  return (
    <ClickAwayListener onClickAway={close}>
      <Box width={fullWidth ? '100%' : 'auto'}>
        <Box ref={anchorRef}>
          <ShTextFieldV2
            id={fieldId}
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
                  {renderChips()}
                </Box>
              ),
              endAdornment: (
                <InputAdornment position='end' sx={{ alignSelf: 'center' }}>
                  <ArrowDropDownIcon
                    sx={{
                      transform: `rotate(${open ? 180 : 0}deg)`,
                      transition: 'transform 0.2s ease',
                      color: 'text.secondary',
                      cursor: disabled ? 'default' : 'pointer',
                    }}
                  />
                </InputAdornment>
              ),
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
        </Box>

        {helperText && (
          <FormHelperText sx={{ mx: 1.75, mt: 0.5, mb: 0, lineHeight: 1.4 }}>{helperText}</FormHelperText>
        )}

        <Popper open={open} anchorEl={anchorRef.current} placement='bottom-start' style={{ zIndex: theme.zIndex.modal }} modifiers={[{ name: 'offset', options: { offset: [0, 4] } }]}>
            <DropdownPanel sx={{ width: anchorRef.current?.offsetWidth ?? 320 }}>
              {searchEnabled && (
                <Box px={1.25} pt={1.25} pb={0.5}>
                  <ShTextFieldV2
                    size='small'
                    fullWidth
                    placeholder='Search...'
                    value={search}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    onMouseDown={(e: MouseEvent) => e.stopPropagation()}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <SearchIcon fontSize='small' color='action' />
                        </InputAdornment>
                      ),
                      endAdornment: search ? (
                        <InputAdornment position='end'>
                          <IconButton size='small' onClick={() => setSearch('')} edge='end' aria-label='Clear search'>
                            <CloseIcon fontSize='small' />
                          </IconButton>
                        </InputAdornment>
                      ) : undefined,
                    }}
                  />
                </Box>
              )}

              {renderActionsBar()}
              {renderOptionList(filteredOptions)}
            </DropdownPanel>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}
