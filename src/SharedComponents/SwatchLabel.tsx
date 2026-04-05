import { Box, Stack, Typography } from '@mui/material';

const MIXED_SWATCH_STRIPE = 'repeating-linear-gradient(135deg, #10B981 0px, #10B981 3px, #F59E0B 3px, #F59E0B 6px)';

interface SwatchLabelProps {
  label: string;
  swatchColor: string;
  textColor?: string;
  swatchVariant?: 'solid' | 'mixed';
}

export const SwatchLabel = ({ label, swatchColor, textColor, swatchVariant = 'solid' }: SwatchLabelProps) => {
  return (
    <Stack direction="row" alignItems="center" gap={0.5}>
      <Box
        width={12}
        height={12}
        borderRadius={0.5}
        bgcolor={swatchVariant === 'mixed' ? undefined : swatchColor}
        sx={swatchVariant === 'mixed' ? { background: MIXED_SWATCH_STRIPE } : undefined}
      />
      <Typography variant="caption" color={textColor || 'text.secondary'} fontWeight="medium">
        {label}
      </Typography>
    </Stack>
  );
};
