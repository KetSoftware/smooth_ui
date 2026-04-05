import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { Divider, Link, Typography } from '@mui/material';

export const ContactInfo = ({ showDivider, dividerOrientation }: { showDivider?: boolean; dividerOrientation?: 'vertical' | 'horizontal' }) => {
  return (
    <>
      {showDivider && <Divider orientation='vertical' flexItem={dividerOrientation === 'vertical'} />}
      <Link href='mailto:help@smoothhiring.com' fontSize='small' underline='hover'>
        <Typography variant='body2' display='flex' alignItems='center'>
          <MailOutlinedIcon fontSize='small' />
          &nbsp;help@smoothhiring.com
        </Typography>
      </Link>
    </>
  );
};
