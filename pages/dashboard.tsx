import { useEffect, useState } from 'react'
import { useAuth } from '../lib/useAuth'
import Layout from '../components/Layout'

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalPatients: 0,
    pendingMeals: 0,
    deliveredMeals: 0,
  })

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      const response = await fetch('/api/stats')
      const data = await response.json()
      setStats(data)
    }
    fetchStats()
  }, [])

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Total Patients</h2>
          <p className="text-3xl font-bold">{stats.totalPatients}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Pending Meals</h2>
          <p className="text-3xl font-bold">{stats.pendingMeals}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Delivered Meals</h2>
          <p className="text-3xl font-bold">{stats.deliveredMeals}</p>
        </div>
      </div>
    </Layout>
  )
}

