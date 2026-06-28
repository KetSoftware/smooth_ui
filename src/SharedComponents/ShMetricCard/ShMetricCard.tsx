import type { ReactNode } from 'react';
import { MetricCardRoot, MetricFooter, MetricLabel, MetricValue } from './ShMetricCard.styled';

export type ShMetricCardProps = {
  label: string;
  value: ReactNode;
  footer?: ReactNode;
};

export const ShMetricCard = ({ label, value, footer }: ShMetricCardProps) => (
  <MetricCardRoot>
    <MetricLabel variant="body2">{label}</MetricLabel>
    <MetricValue variant="h4">{value}</MetricValue>
    {footer ? <MetricFooter>{footer}</MetricFooter> : null}
  </MetricCardRoot>
);
