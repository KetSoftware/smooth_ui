import { Skeleton, TableBody, TableCell, TableHead, Typography } from '@mui/material';
import { Fragment } from 'react';
import { ShTable, ShTableContainer, ShTableRow } from '../../shStyleExports';
import { SHTableLink } from './ShAdminTable.styled';
import { ISHTable } from './ShAdminTableModel';
const SHTableSkeleton = ({ cellCount }: { cellCount: number }) => {
  return (
    <Fragment>
      {Array(cellCount)
        .fill(null)
        .map((_, index) => (
          <ShTableRow key={index} cursor='default'>
            {Array(cellCount)
              .fill(null)
              .map((_, index) => (
                <TableCell key={index}>
                  <Skeleton animation='wave' variant='text' />
                </TableCell>
              ))}
          </ShTableRow>
        ))}
    </Fragment>
  );
};
// T generic type extending object with key should be string and value can by anything, thus rows should be an array of objects
const ShAdminTable = <T extends { [key: string]: any }>({ title, headers, rows, cellOrder, redirectionUrlsJobId = [], redirectionUrlsEmployerId = [], generateUrlJobId, generateUrlEmployerId, generateUrlById, isLoading, onRowClick }: ISHTable<T>) => {
  return (
    <Fragment>
      <Typography variant='body1' fontWeight='700' pb={1}>
        {title}
      </Typography>
      <ShTableContainer>
        <ShTable size='small'>
          <TableHead>
            <ShTableRow cursor='default'>
              {headers.map((header, index) => (
                <TableCell key={index}>{header.label}</TableCell>
              ))}
            </ShTableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <Fragment>
                <SHTableSkeleton cellCount={headers.length} />
              </Fragment>
            ) : (
              rows?.map((row, index) => (
                <ShTableRow key={index} cursor='pointer' onClick={() => onRowClick?.(row)}>
                  {headers.map(header => (
                    <TableCell key={header.columnName}>
                      <Typography variant='body2'>
                        {header.render ? (
                          header.render(row)
                        ) : row[header.columnName] && (redirectionUrlsJobId.includes(header.columnName) || redirectionUrlsEmployerId.includes(header.columnName)) ? (
                          <>
                            {redirectionUrlsJobId.includes(header.columnName) && <SHTableLink href={generateUrlJobId ? generateUrlJobId(generateUrlById ? row['id'] : row[header.columnName]) : '#'}>{row[header.columnName] === null ? '' : row[header.columnName]}</SHTableLink>}
                            {redirectionUrlsEmployerId.includes(header.columnName) && <SHTableLink href={generateUrlEmployerId ? generateUrlEmployerId(generateUrlById ? row['employer_id'] : row[header.columnName]) : '#'}>{row[header.columnName] === null ? '' : row[header.columnName]}</SHTableLink>}
                          </>
                        ) : row[header.columnName] === null ? (
                          ''
                        ) : (
                          row[header.columnName]
                        )}
                      </Typography>
                    </TableCell>
                  ))}
                </ShTableRow>
              ))
            )}
          </TableBody>
        </ShTable>
      </ShTableContainer>
    </Fragment>
  );
};
export default ShAdminTable;
