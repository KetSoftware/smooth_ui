import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, Paper, Stack } from '@mui/material';
import { useId } from 'react';
import { ShPaperTooltip } from '../ShPaperTooltip';
import { ShInputBase } from '../../shStyleExports';
import { ShToolbarPaper } from '../../shStyleExports';
import { PaperVariant } from '../../shStyleExports';
import { KeyCodes } from '../../constants/ui';
import { ISHTableSearchBar } from './ShAdminTableModel';

const SHTableSearchBar = ({
  searchKey,
  setSearchKey,
  onSearch,
  inputId,
  placeholder,
  inputAriaLabel,
  clearTooltipTitle,
  searchTooltipTitle,
  clearButtonAriaLabel,
  searchButtonAriaLabel,
}: ISHTableSearchBar) => {
  const uid = useId();
  const resolvedId = inputId ?? `sh-table-search-${uid.replace(/:/g, '')}`;
  const clearButton = (
    <IconButton
      aria-label={clearButtonAriaLabel}
      color='error'
      onClick={() => {
        setSearchKey('');
        onSearch('');
      }}
    >
      <ClearIcon />
    </IconButton>
  );
  const searchButton = (
    <IconButton aria-label={searchButtonAriaLabel} onClick={() => onSearch(searchKey)}>
      <SearchIcon />
    </IconButton>
  );
  return (
    <ShToolbarPaper elevation={0}>
      <Stack direction='row' justifyContent='space-between'>
        <Box />
        <Paper className='custom-paper' variant={PaperVariant}>
          <ShInputBase
            id={resolvedId}
            placeholder={placeholder}
            inputProps={{ 'aria-label': inputAriaLabel }}
            value={searchKey}
            onChange={e => setSearchKey(e.target.value)}
            onKeyUp={e => {
              e.code === KeyCodes.Enter && onSearch(searchKey);
            }}
          />
          {searchKey && (clearTooltipTitle ? <ShPaperTooltip title={clearTooltipTitle}>{clearButton}</ShPaperTooltip> : clearButton)}
          {searchTooltipTitle ? <ShPaperTooltip title={searchTooltipTitle}>{searchButton}</ShPaperTooltip> : searchButton}
        </Paper>
      </Stack>
    </ShToolbarPaper>
  );
};

export default SHTableSearchBar;
