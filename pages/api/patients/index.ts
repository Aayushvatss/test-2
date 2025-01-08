import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { authMiddleware } from '../../../lib/authMiddleware'

const prisma = new PrismaClient()

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const patients = await prisma.patient.findMany()
    res.status(200).json(patients)
  } else if (req.method === 'POST') {
    const patientData = req.body
    const patient = await prisma.patient.create({ data: patientData })
    res.status(201).json(patient)
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

export default authMiddleware(handler)

