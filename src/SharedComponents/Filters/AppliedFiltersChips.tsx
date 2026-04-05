import { Chip, Stack } from '@mui/material';

export interface AppliedFilterChip {
  key: string;
  label: string;
  onDelete: () => void;
}

export const AppliedFiltersChips = ({ chips }: { chips: AppliedFilterChip[] }) => {
  if (!chips.length) return null;

  return (
    <Stack direction='row' spacing={1} flexWrap='wrap' marginBottom={2}>
      {chips.map(chip => (
        <Chip key={chip.key} label={chip.label} size='small' variant='outlined' onDelete={chip.onDelete} />
      ))}
    </Stack>
  );
};
