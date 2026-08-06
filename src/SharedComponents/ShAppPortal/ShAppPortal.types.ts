import type { ReactNode } from 'react';

export type ShPortalAppKey = 'ats' | 'hrms' | 'lms';

export interface ShPortalApp {
  key: ShPortalAppKey;
  title: string;
  subtitle?: string;
  href: string;
  icon?: ReactNode;
  logoUrl?: string;
  accentKey?: string;
  disabled?: boolean;
  isCurrent?: boolean;
}

export interface ShAppPortalPageProps {
  apps: ShPortalApp[];
  companyName?: string;
  loading?: boolean;
  error?: ReactNode;
  currentAppKey?: ShPortalAppKey;
  onAppSelect: (app: ShPortalApp) => void;
  headerActions?: ReactNode;
}

export interface ShAppPortalTileProps {
  app: ShPortalApp;
  variant?: 'grid' | 'compact';
  onClick?: () => void;
}

export interface ShAppSwitcherProps {
  apps: ShPortalApp[];
  currentAppKey?: ShPortalAppKey;
  portalPageHref: string;
  onAppSelect: (app: ShPortalApp) => void;
  disabled?: boolean;
}

export interface ShBrandIconWrapProps {
  iconSize?: 'sm' | 'md' | 'lg';
  accentKey?: string;
  children?: ReactNode;
}
