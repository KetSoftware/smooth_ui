import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, IconButton, Pagination, Stack, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import { useIsSmScreen } from '../../hooks/useIsSmScreen';
import { useState } from 'react';
import { ShButton } from '../../shStyleExports';
import { FooterWrapper } from '../../shStyleExports';
import { StyledMenuItem } from '../../shStyleExports';
import { PageSizes } from '../../constants/ui';
import { ITablePaginationFooterProps } from './TablePaginationFooterModel';

/**
 * Reusable table pagination footer matching the applicant list pattern:
 * "X of Y" text, MUI Pagination (desktop) / prev-next buttons (mobile), page size selector.
 * Uses 1-based page numbers (page 1 = first page).
 */
export const TablePaginationFooter = ({ total, page, pageSize, onPageChange, onPageSizeChange, countInThisPage, showPageSizeSelector = true, pageSizeOptions = PageSizes }: ITablePaginationFooterProps) => {
  const isSmScreen = useIsSmScreen();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isPageSizeOpen = Boolean(anchorEl);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.max(1, Math.min(page, totalPages));
  const from = (safePage - 1) * pageSize;
  const displayedCount = countInThisPage ?? (total > 0 ? Math.min(pageSize, total - from) : 0);
  const xOfY = total > 0 ? from + displayedCount : 0;

  const firstPage = safePage <= 1;
  const lastPage = safePage >= totalPages;

  if (total === 0) return null;

  return (
    <FooterWrapper>
      <Box component='span' style={{ minWidth: 0 }} />
      <Stack flexDirection='row' justifyContent='flex-end' alignItems='center' columnGap={{ xs: 0, sm: 1, md: 1 }} flexWrap='wrap'>
        <Typography paddingLeft={3} variant='caption' fontWeight='bold'>
          {xOfY}&nbsp;of&nbsp;{total}
        </Typography>
        <Pagination className='desktop-pagination' color='primary' showFirstButton showLastButton siblingCount={isSmScreen ? 0 : 0} boundaryCount={isSmScreen ? 0 : 2} count={totalPages} page={safePage} onChange={(_, pgNo) => onPageChange(pgNo)} />
        <Stack className='mobile-pagination' flexDirection='row'>
          <IconButton disabled={firstPage} onClick={() => onPageChange(safePage - 1)}>
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton disabled={lastPage} onClick={() => onPageChange(safePage + 1)}>
            <KeyboardArrowRightIcon />
          </IconButton>
        </Stack>
        {showPageSizeSelector && onPageSizeChange && (
          <>
            <ShButton size='small' variant='contained' disableElevation onClick={e => setAnchorEl(e.currentTarget)} color='primary' endIcon={<ExpandMoreIcon />}>
              {pageSize}
            </ShButton>
            <Menu id='page-size-menu' aria-label='Page size' anchorEl={anchorEl} open={isPageSizeOpen} onClose={() => setAnchorEl(null)}>
              {pageSizeOptions.map(size => (
                <StyledMenuItem
                  key={size}
                  className={pageSize === size ? 'selected-item' : ''}
                  onClick={() => {
                    onPageSizeChange(size);
                    setAnchorEl(null);
                  }}
                >
                  {size}
                </StyledMenuItem>
              ))}
            </Menu>
          </>
        )}
      </Stack>
    </FooterWrapper>
  );
};
