import type { PointField } from 'payload/types'

export type Props = Omit<PointField, 'type'> & {
  path?: string
}
