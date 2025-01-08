import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'

export default function DietCharts() {
  const [dietCharts, setDietCharts] = useState([])

  useEffect(() => {
    const fetchDietCharts = async () => {
      const response = await fetch('/api/dietcharts')
      const data = await response.json()
      setDietCharts(data)
    }
    fetchDietCharts()
  }, [])

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Diet Charts</h1>
      <Link href="/dietcharts/new" className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Create New Diet Chart
      </Link>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {dietCharts.map((chart) => (
            <li key={chart.id}>
              <Link href={`/dietcharts/${chart.id}`} className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {chart.patient.name} - {chart.mealType}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {chart.status}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Date: {new Date(chart.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

