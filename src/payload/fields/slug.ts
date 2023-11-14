import type { Field } from 'payload/types'

import deepMerge from '../utilities/deepMerge'
import formatSlug from '../utilities/formatSlug'

type Slug = (fieldToUse?: string, overrides?: Partial<Field>) => Field

export const slugField: Slug = (fieldToUse = 'title', overrides = {}) =>
  deepMerge<Field, Partial<Field>>(
    {
      name: 'slug',
      localized: true,
      label: {
        en: 'Slug',
        fr: 'Raccourci url',
      },
      type: 'text',
      index: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug(fieldToUse)],
      },
    },
    overrides,
  )
