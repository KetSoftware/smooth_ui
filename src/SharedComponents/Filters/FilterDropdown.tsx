import { useState, MouseEvent, ReactNode } from 'react';
import { Stack, Typography, Menu } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ExpandMore } from '@mui/icons-material';
import { ShButton, StyledMenuItem } from '../../shStyleExports';

const FilterFieldLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.secondary,
}));

export interface FilterDropdownOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  label: string;
  value: string;
  options: FilterDropdownOption[];
  onChange: (value: string) => void;
  renderTrigger: (option: FilterDropdownOption | undefined) => ReactNode;
  renderOption: (option: FilterDropdownOption, isSelected: boolean) => ReactNode;
  ariaLabel?: string;
}

/**
 * Reusable filter dropdown with StagesToggler-style button and menu.
 * Use StageFilterSelect or MatchTypeFilterSelect for preconfigured stage/match-type UIs.
 */
export const FilterDropdown = ({ label, value, options, onChange, renderTrigger, renderOption, ariaLabel = 'Filter' }: FilterDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const selectedOption = options.find(o => o.value === value);

  const handleOpen = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleSelect = (newValue: string) => {
    onChange(newValue);
    setAnchorEl(null);
  };

  return (
    <Stack spacing={1.5}>
      <FilterFieldLabel variant='caption'>{label}</FilterFieldLabel>
      <ShButton size='small' fullWidth endIcon={<ExpandMore />} onClick={handleOpen} aria-label={ariaLabel}>
        <Stack direction='row' alignItems='center' spacing={0}>
          {renderTrigger(selectedOption)}
        </Stack>
      </ShButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
        {options.map(option => (
          <StyledMenuItem key={option.value} className={option.value === value ? 'selected-item' : ''} onClick={() => handleSelect(option.value)}>
            {renderOption(option, option.value === value)}
          </StyledMenuItem>
        ))}
      </Menu>
    </Stack>
  );
};
