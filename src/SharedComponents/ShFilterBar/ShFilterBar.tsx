import type { ReactNode } from 'react';
import { FilterBarActions, FilterBarRoot } from './ShFilterBar.styled';

export type ShFilterBarProps = {
  children?: ReactNode;
  actions?: ReactNode;
};

export const ShFilterBar = ({ children, actions }: ShFilterBarProps) => (
  <FilterBarRoot>
    {children}
    {actions ? <FilterBarActions>{actions}</FilterBarActions> : null}
  </FilterBarRoot>
);
