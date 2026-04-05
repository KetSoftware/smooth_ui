import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Grid, Stack, Typography } from '@mui/material';
import { ShButton, ShGreen, ShIconPrimary, ShPaper, ShSwitch } from '../shStyleExports';
import { SwatchLabel } from './SwatchLabel';

export interface PaymentMethodCardItem {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

const cardBrandLogos: Record<string, string> = {
  visa: 'https://cdn.simpleicons.org/visa/2357A4',
  mastercard: 'https://cdn.simpleicons.org/mastercard/EB001B',
  amex: 'https://cdn.simpleicons.org/americanexpress/2E77BC',
  discover: 'https://cdn.simpleicons.org/discover/FF6000',
  diners: 'https://cdn.simpleicons.org/dinersclubinternational/0069AA',
  jcb: 'https://cdn.simpleicons.org/jcb/0B4EA2',
  unionpay: 'https://cdn.simpleicons.org/unionpay/E21836',
};

interface PaymentMethodsGridProps {
  paymentMethods: PaymentMethodCardItem[];
  defaultPaymentMethodId: string | null;
  selectedPaymentMethodId?: string;
  newPaymentMethodId?: string | null;
  onSelect?: (paymentMethodId: string) => void;
  onSetDefault?: (paymentMethodId: string) => void;
  onRemove?: (paymentMethodId: string) => void;
  disableSetDefault?: boolean;
  disableRemove?: boolean;
  showRemoveButton?: boolean;
  showSelectionLabel?: boolean;
}

export const PaymentMethodsGrid = ({
  paymentMethods,
  defaultPaymentMethodId,
  selectedPaymentMethodId,
  newPaymentMethodId,
  onSelect,
  onSetDefault,
  onRemove,
  disableSetDefault = false,
  disableRemove = false,
  showRemoveButton = true,
  showSelectionLabel = false,
}: PaymentMethodsGridProps) => {
  return (
    <Grid container spacing={1}>
      {paymentMethods.map(pm => {
        const isSelected = selectedPaymentMethodId === pm.id;
        return (
          <Grid item xs={12} sm={6} md={4} key={pm.id}>
            <ShPaper variant='outlined' noPadding height='100%' onClick={onSelect ? () => onSelect(pm.id) : undefined}>
              <Stack spacing={1} padding={1}>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                  <ShSwitch
                    size='small'
                    checked={pm.id === defaultPaymentMethodId}
                    onChange={() => onSetDefault && onSetDefault(pm.id)}
                    disabled={!onSetDefault || disableSetDefault}
                  />
                  {showRemoveButton && onRemove && (
                    <ShButton
                      variant='outlined'
                      color='error'
                      size='small'
                      disabled={disableRemove}
                      onClick={e => {
                        e.stopPropagation();
                        onRemove(pm.id);
                      }}
                    >
                      Remove
                    </ShButton>
                  )}
                </Stack>
                <Stack direction='row' alignItems='center' gap={1}>
                  {cardBrandLogos[(pm.brand || '').toLowerCase()] ? (
                    <img
                      src={cardBrandLogos[(pm.brand || '').toLowerCase()]}
                      alt={pm.brand || 'Card'}
                      height={18}
                      width={28}
                    />
                  ) : (
                    <CreditCardIcon color='action' fontSize='small' />
                  )}
                  <Typography variant='body2'>
                    •••• {pm.last4}
                  </Typography>
                </Stack>
                <Typography variant='caption' color='text.secondary'>
                  Expires {pm.expMonth}/{pm.expYear}
                </Typography>
                <Stack direction='row' alignItems='center' gap={1}>
                  {pm.id === defaultPaymentMethodId && (
                    <SwatchLabel label='Default' swatchColor={ShIconPrimary} />
                  )}
                  {newPaymentMethodId === pm.id && (
                    <SwatchLabel label='New' swatchColor={ShGreen} />
                  )}
                  {showSelectionLabel && isSelected && (
                    <SwatchLabel label='Selected' swatchColor={ShGreen} />
                  )}
                </Stack>
              </Stack>
            </ShPaper>
          </Grid>
        );
      })}
    </Grid>
  );
};
