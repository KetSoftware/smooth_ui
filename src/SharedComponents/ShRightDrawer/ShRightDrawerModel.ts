import { ReactNode } from 'react';

export interface IShRightDrawer {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}
