import type { Complaint } from '../types'
import { useState } from 'react'

type ComplaintListProps = {
  complaints: Complaint[]
  isAdmin: boolean
  onUpdate?: (id: string, updates: any) => void
}

export default function ComplaintList({ complaints, isAdmin, onUpdate }: ComplaintListProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleStatusChange = (id: string, newStatus: string) => {
    onUpdate?.(id, { status: newStatus })
  }

  const handleAssign = (id: string) => {
    const staff = prompt("Enter Staff Member Name:")
    if (staff && staff.trim()) onUpdate?.(id, { assignedTo: staff.trim() })
  }

  const handleRemarks = (id: string) => {
    const remarks = prompt("Add Internal Remarks/Notes:")
    if (remarks && remarks.trim()) onUpdate?.(id, { remarks: remarks.trim() })
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h3 className="text-2xl font-semibold mb-6">
        {isAdmin ? "All Complaints" : "My Complaints"}
      </h3>

      <div className="space-y-5">
        {complaints.length === 0 ? (
          <p className="text-gray-500 text-center py-16">No complaints yet</p>
        ) : (
          complaints.map((c) => (
            <div key={c.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-xl">{c.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{c.type} • {new Date(c.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`px-4 py-1.5 text-sm font-medium rounded-full
                  ${c.status === 'Resolved' ? 'bg-green-100 text-green-700' : 
                    c.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {c.status}
                </span>
              </div>

              <p className="mt-4 text-gray-700">{c.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="bg-gray-100 px-4 py-1 rounded-full text-sm">Priority: {c.priority}</span>
                {c.assignedTo && <span className="bg-gray-100 px-4 py-1 rounded-full text-sm">Assigned: {c.assignedTo}</span>}
              </div>

              {isAdmin && (
                <div className="mt-6 flex flex-wrap gap-3">
                  <select 
                    value={c.status}
                    onChange={(e) => handleStatusChange(c.id, e.target.value)}
                    className="border rounded-xl px-4 py-2 text-sm"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>

                  <button onClick={() => handleAssign(c.id)} className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm hover:bg-blue-700">
                    Assign Staff
                  </button>

                  <button onClick={() => handleRemarks(c.id)} className="border border-gray-300 px-5 py-2 rounded-xl text-sm hover:bg-gray-50">
                    Add Remarks
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}