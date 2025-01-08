import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'

export default function Pantry() {
  const [dietCharts, setDietCharts] = useState([])

  useEffect(() => {
    const fetchDietCharts = async () => {
      const response = await fetch('/api/dietcharts?status=PENDING,PREPARING')
      const data = await response.json()
      setDietCharts(data)
    }
    fetchDietCharts()
  }, [])

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`/api/dietcharts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (response.ok) {
        setDietCharts(prevCharts => 
          prevCharts.map(chart => 
            chart.id === id ? { ...chart, status } : chart
          )
        )
      } else {
        throw new Error('Failed to update status')
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Pantry Dashboard</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {dietCharts.map((chart) => (
            <li key={chart.id} className="px-4 py-4 sm:px-6">
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
              <div className="mt-2">
                <p className="text-sm text-gray-500">Ingredients: {chart.ingredients.join(', ')}</p>
                <p className="text-sm text-gray-500">Instructions: {chart.instructions.join(', ')}</p>
              </div>
              <div className="mt-4">
                {chart.status === 'PENDING' && (
                  <button onClick={() => updateStatus(chart.id, 'PREPARING')} className="mr-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Start Preparing
                  </button>
                )}
                {chart.status === 'PREPARING' && (
                  <button onClick={() => updateStatus(chart.id, 'PREPARED')} className="mr-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Mark as Prepared
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

