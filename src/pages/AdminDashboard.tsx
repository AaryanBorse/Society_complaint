import { useState } from 'react'

import ComplaintList from '../components/ComplaintList'
import { useComplaints } from '../context/ComplaintContext'

export default function AdminDashboard() {
  const { complaints, updateComplaint } = useComplaints()
  const [filter, setFilter] = useState<'All' | 'Open' | 'In Progress' | 'Resolved'>('All')

  const filteredComplaints = complaints.filter(c => 
    filter === 'All' || c.status === filter
  )

  const stats = {
    total: complaints.length,
    open: complaints.filter(c => c.status === 'Open').length,
    inProgress: complaints.filter(c => c.status === 'In Progress').length,
    resolved: complaints.filter(c => c.status === 'Resolved').length,
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-4xl font-bold mb-8">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl shadow text-center">
          <p className="text-5xl font-bold text-blue-600">{stats.total}</p>
          <p className="text-gray-500 mt-2">Total</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow text-center">
          <p className="text-5xl font-bold text-yellow-600">{stats.open}</p>
          <p className="text-gray-500 mt-2">Open</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow text-center">
          <p className="text-5xl font-bold text-blue-600">{stats.inProgress}</p>
          <p className="text-gray-500 mt-2">In Progress</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow text-center">
          <p className="text-5xl font-bold text-green-600">{stats.resolved}</p>
          <p className="text-gray-500 mt-2">Resolved</p>
        </div>
      </div>

      <div className="flex gap-3 mb-8">
        {['All', 'Open', 'In Progress', 'Resolved'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as any)}
            className={`px-6 py-2.5 rounded-2xl font-medium transition ${
              filter === status ? 'bg-blue-600 text-white' : 'bg-white border hover:bg-gray-50'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <ComplaintList 
        complaints={filteredComplaints} 
        isAdmin={true} 
        onUpdate={updateComplaint} 
      />
    </div>
  )
}