import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { Archive } from '../../blocks/ArchiveBlock'
import { CallToAction } from '../../blocks/CallToAction'
import { Content } from '../../blocks/Content'
import { MediaBlock } from '../../blocks/MediaBlock'
import { slugField } from '../../fields/slug'

const PointsOfSale: CollectionConfig = {
  slug: 'sales-points',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', '_status'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/products/${doc.slug}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },
  hooks: {},
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
    create: admins,
    update: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: {
        en: 'Title',
        fr: 'Titre',
      },
    },
    {
      name: 'description',
      label: {
        en: 'Description',
        fr: 'Description',
      },
      type: 'textarea',
    },
    {
      name: 'location',
      type: 'point',
      label: {
        en: 'Location',
        fr: 'Localisation',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            en: 'Opening slots',
            fr: "Créneaux d'ouverture",
          },
          fields: [
            {
              name: 'layout',
              label: {
                en: 'Layout',
                fr: 'Disposition de la page',
              },
              type: 'blocks',
              required: true,
              blocks: [CallToAction, Content, MediaBlock, Archive],
            },
          ],
        },
        {
          label: {
            en: "Click'n'Collect slots",
            fr: 'Créneaux Click & Collect',
          },
          fields: [
            {
              name: 'priceJSON',
              label: 'Price JSON',
              type: 'textarea',
              admin: {
                readOnly: true,
                hidden: true,
                rows: 10,
              },
            },
          ],
        },
      ],
    },
    slugField(),
  ],
}

export default PointsOfSale
