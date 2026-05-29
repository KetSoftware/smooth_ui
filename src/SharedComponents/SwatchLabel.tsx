import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const MIXED_SWATCH_STRIPE = 'repeating-linear-gradient(135deg, #10B981 0px, #10B981 3px, #F59E0B 3px, #F59E0B 6px)';

const SwatchLabelRoot = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
  width: 'fit-content',
  maxWidth: '100%',
  alignSelf: 'flex-start',
});

const SwatchDot = styled(Box)({
  width: 12,
  height: 12,
  borderRadius: 4,
  flexShrink: 0,
});

const MixedSwatchDot = styled(SwatchDot)({
  background: MIXED_SWATCH_STRIPE,
});

interface SwatchLabelProps {
  label: string;
  swatchColor: string;
  textColor?: string;
  swatchVariant?: 'solid' | 'mixed';
}

export const SwatchLabel = ({ label, swatchColor, textColor, swatchVariant = 'solid' }: SwatchLabelProps) => {
  return (
    <SwatchLabelRoot>
      {swatchVariant === 'mixed' ? <MixedSwatchDot /> : <SwatchDot bgcolor={swatchColor} />}
      <Typography variant="caption" color={textColor || 'text.secondary'} fontWeight="medium">
        {label}
      </Typography>
    </SwatchLabelRoot>
  );
};
