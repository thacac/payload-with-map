import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { Archive } from '../../blocks/ArchiveBlock'
import { CallToAction } from '../../blocks/CallToAction'
import { Content } from '../../blocks/Content'
import { MediaBlock } from '../../blocks/MediaBlock'
import mapPointField from '../../fields/mapPoint/config'
import { slugField } from '../../fields/slug'

const PointsOfSale: CollectionConfig = {
  slug: 'sales-points',
  labels: {
    singular: {
      en: 'Sales Point',
      fr: 'Point de vente',
    },
    plural: {
      en: 'Sales Points',
      fr: 'Points de vente',
    },
  },
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
        en: 'Sales Point Title',
        fr: 'Titre du point de vente',
      },
    },
    {
      name: 'description',
      label: {
        en: 'Point of sale description',
        fr: 'Description du point de vente',
      },
      type: 'textarea',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            en: 'Localization & Address',
            fr: 'Localisation & Adresse',
          },
          description: {
            en: 'Enter the address of your point of sale using the map below',
            fr: "Entrez l'adresse de votre point de vente en utilisant la carte ci-dessous",
          },
          fields: [
            {
              name: 'address',
              type: 'text',
              admin: {
                placeholder: {
                  en: '2 shopping stree, 31000 Toulouse',
                  fr: '2 rue du commerce, 31000 Toulouse',
                },
              },
              required: true,
              label: {
                en: 'Address',
                fr: 'Adresse',
              },
            },
            mapPointField,
          ],
        },
        {
          label: {
            en: 'Opening slots',
            fr: "Créneaux d'ouverture",
          },
          description: {
            en: 'List here the opening slots of your point of sale',
            fr: "Listez ici les créneaux d'ouverture de votre point de vente",
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
          description: {
            en: 'List here the slots when your customers can pick up their orders',
            fr: 'Listez ici les créneaux où vos clients peuvent venir récupérer leurs commandes',
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
