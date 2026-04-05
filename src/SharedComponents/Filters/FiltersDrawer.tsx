import { ReactNode } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ShButton } from '../../shStyleExports';
import ShRightDrawer from '../ShRightDrawer/ShRightDrawer';

const FilterSectionStack = styled(Stack)({});
const FilterSectionLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 600,
  textTransform: 'uppercase' as const,
}));
const FilterFieldsStack = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
}));

export const FilterSection = ({ label, children }: { label: string; children: ReactNode }) => (
  <FilterSectionStack spacing={1.5} className='filter-section'>
    <FilterSectionLabel variant='caption'>{label}</FilterSectionLabel>
    <FilterFieldsStack>{children}</FilterFieldsStack>
  </FilterSectionStack>
);

const DrawerContentRoot = styled(Stack)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  paddingBottom: theme.spacing(2),
}));

const FilterBodyScroll = styled(Stack)(({ theme }) => ({
  flex: 1,
  minHeight: 0,
  overflow: 'auto',
  paddingRight: theme.spacing(0.5),
  gap: theme.spacing(3),
  '& .MuiTextField-root': { marginBottom: 0 },
  '& .filter-section': { marginBottom: 0 },
}));

const FilterFooterRoot = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  marginTop: 'auto',
  borderTop: `1px solid ${theme.palette.divider}`,
  paddingTop: theme.spacing(2),
}));

const FilterFooterActions = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: theme.spacing(1.5),
  justifyContent: 'flex-end',
}));

const FilterClearButton = styled(ShButton)({
  minWidth: 88,
});

const FilterApplyButton = styled(ShButton)({
  minWidth: 100,
});

interface FiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onClear?: () => void;
  onApply?: () => void;
  clearText?: string;
  applyText?: string;
  disableApply?: boolean;
}

export const FiltersDrawer = ({ isOpen, onClose, title, children, onClear, onApply, clearText, applyText, disableApply }: FiltersDrawerProps) => {
  return (
    <ShRightDrawer isOpen={isOpen} onClose={onClose} title={title}>
      <DrawerContentRoot>
        <FilterBodyScroll>{children}</FilterBodyScroll>
        <FilterFooterRoot>
          <FilterFooterActions justifyContent='flex-end'>
            {onClear && (
              <FilterClearButton variant='outlined' onClick={onClear}>
                {clearText || 'Clear'}
              </FilterClearButton>
            )}
            <FilterApplyButton variant='contained' onClick={onApply || onClose} disabled={disableApply}>
              {applyText || 'Apply'}
            </FilterApplyButton>
          </FilterFooterActions>
        </FilterFooterRoot>
      </DrawerContentRoot>
    </ShRightDrawer>
  );
};
