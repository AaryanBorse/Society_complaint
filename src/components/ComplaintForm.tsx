import { useState } from 'react'

type ComplaintFormProps = {
  onSubmit: (data: any) => void
}

export default function ComplaintForm({ onSubmit }: ComplaintFormProps) {
  const [form, setForm] = useState({
    title: '',
    type: '',
    description: '',
    priority: 'Medium' as 'Low' | 'Medium' | 'High'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.description || !form.type) {
      alert("Please fill all required fields")
      return
    }
    
    onSubmit(form)
    setForm({ title: '', type: '', description: '', priority: 'Medium' })
    alert("✅ Complaint Submitted Successfully!")
  }

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg">
      <h3 className="text-2xl font-semibold mb-6">Create New Complaint</h3>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Complaint Title *"
          value={form.title}
          onChange={(e) => setForm({...form, title: e.target.value})}
          className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
          required
        />

        <select
          value={form.type}
          onChange={(e) => setForm({...form, type: e.target.value})}
          className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
          required
        >
          <option value="">Select Complaint Type *</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Security">Security</option>
          <option value="Cleanliness">Cleanliness</option>
          <option value="Electricity">Electricity</option>
          <option value="Water">Water Supply</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={form.priority}
          onChange={(e) => setForm({...form, priority: e.target.value as any})}
          className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>

        <textarea
          placeholder="Detailed Description *"
          value={form.description}
          onChange={(e) => setForm({...form, description: e.target.value})}
          className="w-full p-4 border border-gray-300 rounded-3xl focus:outline-none focus:border-blue-500 h-32"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold text-lg transition"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  )
}