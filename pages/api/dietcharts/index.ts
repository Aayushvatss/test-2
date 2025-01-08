import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { authMiddleware } from '../../../lib/authMiddleware'

const prisma = new PrismaClient()

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const dietCharts = await prisma.dietChart.findMany({ include: { patient: true } })
    res.status(200).json(dietCharts)
  } else if (req.method === 'POST') {
    const dietChartData = req.body
    const dietChart = await prisma.dietChart.create({ data: dietChartData })
    res.status(201).json(dietChart)
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

export default authMiddleware(handler)

