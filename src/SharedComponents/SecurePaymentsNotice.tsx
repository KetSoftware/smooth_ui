import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Stack, Typography } from '@mui/material';
import { ShChip } from '../shStyleExports';

type SecurePaymentsNoticeProps = {
  spacing?: number;
  useOfficialBadge?: boolean;
  badgeSrc?: string;
};

const SecurePaymentsNotice: React.FC<SecurePaymentsNoticeProps> = ({ spacing = 1, useOfficialBadge = false, badgeSrc = '/stripe/powered_by_stripe.svg' }) => {
  return (
    <Stack spacing={1} padding={1}>
      <Stack direction='row' alignItems='center' spacing={spacing}>
        {useOfficialBadge ? (
          <img src={badgeSrc} alt='Powered by Stripe' style={{ height: 32 }} />
        ) : (
          <ShChip
            borderRadius='15px'
            gradient={'linear-gradient(90deg, #635BFF 0%, #00D4FF 100%)'}
            textColor={'#FFFFFF'}
            customSize='small'
            icon={<CreditCardOutlinedIcon fontSize='small' color='inherit' />}
            label={
              <>
                Powered by{' '}
                <Typography component='span' fontWeight={700}>
                  Stripe
                </Typography>
              </>
            }
            hideBoxShadow
          />
        )}
        <ShChip borderRadius='15px' gradient={'linear-gradient(90deg, #16a34a 0%, #22c55e 100%)'} textColor={'#FFFFFF'} customSize='small' icon={<LockOutlinedIcon fontSize='small' color='inherit' />} label={'Secure payments'} hideBoxShadow />
      </Stack>
      <Stack direction='row' spacing={1} alignItems='center' flexWrap='wrap' pl={1} pt={1}>
        <img src='https://cdn.simpleicons.org/visa/2357A4' height={24} alt='Visa' />
        <img src='https://cdn.simpleicons.org/mastercard/EB001B' height={24} alt='Mastercard' />
        <img src='https://cdn.simpleicons.org/americanexpress/2E77BC' height={24} alt='American Express' />
        <img src='https://cdn.simpleicons.org/discover/FF6000' height={24} alt='Discover' />
        <img src='https://cdn.simpleicons.org/jcb/0B4EA2' height={24} alt='JCB' />
        <img src='https://cdn.simpleicons.org/applepay/000000' height={24} alt='Apple Pay' />
        <img src='https://cdn.simpleicons.org/googlepay/4285F4' height={24} alt='Google Pay' />
        <img src='https://cdn.simpleicons.org/paypal/003087' height={24} alt='PayPal' />
      </Stack>
    </Stack>
  );
};

export default SecurePaymentsNotice;
