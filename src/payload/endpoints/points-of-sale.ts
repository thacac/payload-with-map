import type { PayloadHandler } from 'payload/config'
import type { PayloadRequest } from 'payload/types'

import { checkRole } from '../collections/Users/checkRole'
const logs = process.env.LOGS_STRIPE_PROXY === '1'

// use this handler to get all Stripe products
// prevents unauthorized or non-admin users from accessing all Stripe products
// GET /api/products
export const pointsOfSaleProxy: PayloadHandler = async (req: PayloadRequest, res) => {
  if (!req.user || !checkRole(['admin'], req.user)) {
    if (logs) req.payload.logger.error({ err: `You are not authorized to access points of sale` })
    res.status(401).json({ error: 'You are not authorized to access points of sale' })
    return
  }
}
