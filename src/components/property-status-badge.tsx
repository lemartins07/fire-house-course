import { PropertyStatus } from '@/types/propertyStatus'
import { Badge } from './ui/badge'

type PropertyStatusBadgeProps = {
  status: PropertyStatus
}

type StatusVariant = {
  [key in PropertyStatus]: 'destructive' | 'secondary' | 'primary' | 'success'
}

const statusLabel = {
  'for-sale': 'For Sale',
  draft: 'Draft',
  sold: 'Sold',
  withdrawn: 'Withdrawn',
}

const variant: StatusVariant = {
  'for-sale': 'primary',
  withdrawn: 'destructive',
  draft: 'secondary',
  sold: 'success',
}

export default function PropertyStatusBadge({
  status,
}: PropertyStatusBadgeProps) {
  return <Badge variant={variant[status]}>{statusLabel[status]}</Badge>
}
