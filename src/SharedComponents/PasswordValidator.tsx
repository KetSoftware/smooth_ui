import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { CharacterSpace, OneAlphabet, OneNumeric } from '../constants/ui';

interface IPasswordValidator {
  password: string;
  confirmPassword: string;
  onValidityChange?: (isPasswordValid: boolean) => void;
}

export const PasswordValidator = ({ password, confirmPassword, onValidityChange }: IPasswordValidator): JSX.Element => {
  useEffect(() => {
    const isPasswordValid = password?.trim().length > 0 && password === confirmPassword && password?.length >= 6 && OneAlphabet.test(password) && OneNumeric.test(password) && !CharacterSpace.test(password);

    if (password && onValidityChange) {
      onValidityChange(isPasswordValid);
    }
  }, [confirmPassword, onValidityChange, password]);

  return (
    <>
      {CharacterSpace.test(password) && (
        <Typography variant='caption' display='flex' alignItems='center'>
          {<ClearIcon color='error' fontSize='small' />}&nbsp;Passwords shouldn't contain spaces
        </Typography>
      )}
      <Typography variant='caption'>Password must contain :</Typography>
      <Typography variant='caption' display='flex' alignItems='center'>
        {password?.length < 6 ? <ClearIcon color='error' fontSize='small' /> : <CheckIcon color='success' fontSize='small' />}
        &nbsp;At least 6 characters
      </Typography>
      <Typography variant='caption' display='flex' alignItems='center'>
        {OneAlphabet.test(password) ? <CheckIcon color='success' fontSize='small' /> : <ClearIcon color='error' fontSize='small' />}
        &nbsp;At least one Alphabet
      </Typography>
      <Typography variant='caption' display='flex' alignItems='center'>
        {OneNumeric.test(password) ? <CheckIcon color='success' fontSize='small' /> : <ClearIcon color='error' fontSize='small' />}
        &nbsp;At least one number
      </Typography>
    </>
  );
};
