import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'

export default function NewDietChart() {
  const router = useRouter()
  const [patients, setPatients] = useState([])
  const [dietChartData, setDietChartData] = useState({
    patientId: '',
    mealType: '',
    ingredients: '',
    instructions: '',
    date: '',
  })

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch('/api/patients')
      const data = await response.json()
      setPatients(data)
    }
    fetchPatients()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setDietChartData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/dietcharts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...dietChartData,
          ingredients: dietChartData.ingredients.split(','),
          instructions: dietChartData.instructions.split(','),
        }),
      })
      if (response.ok) {
        router.push('/dietcharts')
      } else {
        throw new Error('Failed to create diet chart')
      }
    } catch (error) {
      console.error('Error creating diet chart:', error)
    }
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Create New Diet Chart</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">Patient</label>
          <select name="patientId" id="patientId" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleChange}>
            <option value="">Select patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>{patient.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="mealType" className="block text-sm font-medium text-gray-700">Meal Type</label>
          <select name="mealType" id="mealType" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleChange}>
            <option value="">Select meal type</option>
            <option value="MORNING">Morning</option>
            <option value="EVENING">Evening</option>
            <option value="NIGHT">Night</option>
          </select>
        </div>
        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">Ingredients (comma-separated)</label>
          <input type="text" name="ingredients" id="ingredients" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">Instructions (comma-separated)</label>
          <textarea name="instructions" id="instructions" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input type="date" name="date" id="date" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleChange} />
        </div>
        <div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Create Diet Chart
          </button>
        </div>
      </form>
    </Layout>
  )
}

